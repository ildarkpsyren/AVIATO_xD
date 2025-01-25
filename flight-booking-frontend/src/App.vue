<template>
  <div id="app">
    <nav>
      <router-link to="/create" exact class="nav-button">Create Ticket</router-link>
      <img src="/Aviato_Detail.webp" alt="Aviato Logo" class="logo" />
      <router-link to="/search" exact class="nav-button">Search Ticket</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  background-image: url('../public/planebg.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

#app {
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
  background: linear-gradient(90deg, #007BFF, #0056D2);
  padding: 15px 20px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

nav a:hover {
  background: linear-gradient(90deg, #0056D2, #003A8C);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 150px;
  height: auto;
  margin: 0 20px;
}
</style>