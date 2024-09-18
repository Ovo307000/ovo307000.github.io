<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <h1 class="name">张三</h1>
    <nav>
      <RouterLink to="/">主页</RouterLink>
      <RouterLink to="/about">关于我</RouterLink>
      <RouterLink to="/skills">技能</RouterLink>
      <RouterLink to="/projects">项目经验</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--header-footer-bg);
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.name {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  color: var(--secondary-color);
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a:hover,
nav a.router-link-active {
  color: var(--secondary-color);
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
