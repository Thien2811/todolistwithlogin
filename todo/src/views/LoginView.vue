<template>
<h1>ToDo-Liste</h1>

<div class="container">
    
    <label class="username" style="margin-bottom: 10px;">Benutzername :</label>
    
    <input id="loginname" class="form-control" style="margin-bottom: 10px;" type="text" placeholder="Benutzername">
    <div style="padding-top: 10px;">
    <button style="margin-right: 10px" class="btn" @click="login">Login</button>
    <button  class="btn" @click="register">Registrieren</button>
    </div>
    <div v-if="wrongname">
        <label  style="color: red; padding-top: 10px;" >Username ist falsch. Versuchen Sie es erneut.</label>
        
    </div>
</div>


</template>

<script setup>
import router from '@/router';
import {ref} from 'vue'

let wrongname = ref(false)


function login() {
    let username = document.getElementById("loginname").value
    

    console.log(username)
    if(username === 'Thien'){
        router.push('/todo');
    } else {
        wrongname.value = true;
    }

}

function register(){
    router.push('/register')
}


</script>

<style>

.container{
    background-color: black;
    border: 2px solid white;
    padding: 10px;
    border-radius: 7px;
    margin-top: 50px;
}

.btn{
    background-color: white;
}

h1{
    margin-top: 50px;
    text-align:center;
    color: white;
}

.username{
    color: white;
    font-size: 150%;
    font-weight: bold;
}

</style>