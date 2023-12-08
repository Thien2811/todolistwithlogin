<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Tasks</a>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="#">Deine Tasks</a>
      <a class="nav-item nav-link" href="#">Neue Tasks</a>
      <a class="nav-item nav-link" href="#">Abgeschlossene Tasks</a> 
    </div>
  </div>
  <a><button class="btn" @click="logout">Logout</button></a>
</nav>
  <RouterView
  />
</template>

<script setup>
import router from './router';


function logout(){
  router.push('/')
}

</script>

<style scoped>
 
</style>

