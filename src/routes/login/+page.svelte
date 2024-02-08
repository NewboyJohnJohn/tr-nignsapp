<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import{enhance} from '$app/forms';


    export let data; 
    export let form: ActionData




</script>

<form method="post" action="?/login" use:enhance>

<lable for="name">namn</lable>
<input type="text" name="username">
<lable for="Password">Password</lable>
<input type="text" name="password">
<button>login</button>

{#if form?.username}
<span style="collor: red">{form.username}</span>
{/if}
{#if form?.password}
<span style="collor: red">{form.password}</span>
{/if}
</form>