import { fail, redirect } from '@sveltejs/kit';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()

export const load = async ({cookies}) =>{
    let username = cookies.get("username")
    if(username){
        throw redirect (303, "/home")
    }
}
    

export const actions={
    login: async ({request, cookies}) => {  
        let data = await request.formData()
        let username = data.get("username")?.toString()
        let password = data.get("password")?.toString()

        if (username && password){
            const existingUser = await prisma.user.findFirst({
                where: {name: username}, 
            });

            if(existingUser){
                if (existingUser.password==password){
                    cookies.set("username", username, {secure: false})
                    throw redirect(303, "/home")
                      
                } else{
                    return fail(400, {password: "wrong password"})
                }
            } else {
                await prisma.user.create({
                    data: {
                        name: username,
                        password: password,
                        email: "example@example.com" 
                    }
                });
                cookies.set("username", username, { secure: false });
                throw redirect(306, "/home");
            }
        }else{
            //todo: handle missing username
        }
    },
    logout: async ({request, cookies}) => {
        let username = cookies.get("username")
        if(!username) {
            return fail(400, {username:"no username detected"})
        }

        cookies.delete("username")
    }
}