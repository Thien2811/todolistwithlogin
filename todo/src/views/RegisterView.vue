<template>
    <h1>Registrieren</h1>
    <div class="container">
        <label>Benutzername</label>
        <input class="form-control">
        <label>e-Mail</label>
        <input class="form-control">
        <label>Passwort</label>
        <input class="form-control">
        <label>Passwort wiederholen</label>
        <input class="form-control">
        <button class="btn" style="margin-top: 10px;" @click="login">Registrieren abschließen</button>
    </div>
</template>

<script setup>
import router from '@/router';

function login(){
    router.push('/')
}
</script>

<style scoped>
h1{
    color:white;
}

.container{
    border: 2px solid white;
}

label{
    color:white;
}
</style>