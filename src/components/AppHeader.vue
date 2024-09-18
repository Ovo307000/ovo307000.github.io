<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="glass">
    <nav>
      <div class="menu-icon" @click="toggleMenu" :class="{ open: isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="nav-links" :class="{ open: isMenuOpen }">
        <RouterLink to="/" :class="{ active: route.path === '/' }">主页</RouterLink>
        <RouterLink to="/about" :class="{ active: route.path === '/about' }">关于我</RouterLink>
        <RouterLink to="/skills" :class="{ active: route.path === '/skills' }">技能</RouterLink>
        <RouterLink to="/projects" :class="{ active: route.path === '/projects' }"
          >项目经验</RouterLink
        >
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 20px;
  height: 70px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
  position: relative;
}

nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: var(--secondary-color);
  transition: width 0.3s ease;
}

nav a:hover::after,
nav a.active::after {
  width: 100%;
}

nav a:hover,
nav a.active {
  color: var(--secondary-color);
}

.menu-icon {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 25px;
  height: 20px;
  cursor: pointer;
}

.menu-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .menu-icon {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--glass-bg);
    backdrop-filter: blur(10px);
    padding: 20px;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
  }

  .menu-icon.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .menu-icon.open span:nth-child(2) {
    opacity: 0;
  }

  .menu-icon.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}
</style>
