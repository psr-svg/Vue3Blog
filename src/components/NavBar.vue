<template>
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/add-blog" class="nav-item">Add Blog</router-link>
      </div>
    </nav>
  </template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style>
.navbar {
  background-color: #007bff;
  padding: 1rem;
  display: flex;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-weight: bold;
}

.nav-item:hover {
  text-decoration: underline;
}
</style>