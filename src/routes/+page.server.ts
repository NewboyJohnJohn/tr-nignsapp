import { redirect } from '@sveltejs/kit';



export const load = async ({cookies}) =>{
    let username = cookies.get("username")
    if(username){
        throw redirect (303, "/home")
    }
    else{
        throw redirect (303, "/login")
    }
}