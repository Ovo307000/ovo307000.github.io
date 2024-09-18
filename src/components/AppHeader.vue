<script setup lang="ts">
import { ref, inject } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NAV_ITEMS } from '@/constants/navItems'
import GradientDivider from './GradientDivider.vue'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const isMenuOpen = ref(false)
const themeStore = inject('themeStore') as ReturnType<typeof useThemeStore>

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
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.path"
          :to="item.path"
          :class="{ active: route.path === item.path }"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </RouterLink>
      </div>
      <div class="theme-switch">
        <input
          type="checkbox"
          id="theme-toggle"
          :checked="themeStore.isDark"
          @change="themeStore.toggleTheme"
        />
        <label for="theme-toggle" class="switch">
          <svg class="sun" viewBox="0 0 24 24">
            <path
              d="M12 15.5q1.45 0 2.475-1.025Q15.5 13.45 15.5 12q0-1.45-1.025-2.475Q13.45 8.5 12 8.5q-1.45 0-2.475 1.025Q8.5 10.55 8.5 12q0 1.45 1.025 2.475Q10.55 15.5 12 15.5Zm0 1.5q-2.075 0-3.537-1.463T7 12q0-2.075 1.463-3.537T12 7q2.075 0 3.537 1.463T17 12q0 2.075-1.463 3.537T12 17ZM1.75 12.75q-.325 0-.538-.213Q1 12.325 1 12q0-.325.212-.537Q1.425 11.25 1.75 11.25h2.5q.325 0 .537.213Q5 11.675 5 12q0 .325-.213.537-.213.213-.537.213Zm18 0q-.325 0-.538-.213Q19 12.325 19 12q0-.325.212-.537.212-.213.538-.213h2.5q.325 0 .538.213Q23 11.675 23 12q0 .325-.212.537-.212.213-.538.213ZM12 5q-.325 0-.537-.213Q11.25 4.575 11.25 4.25v-2.5q0-.325.213-.538Q11.675 1 12 1q.325 0 .537.212.213.212.213.538v2.5q0 .325-.213.537Q12.325 5 12 5Zm0 18q-.325 0-.537-.212-.213-.212-.213-.538v-2.5q0-.325.213-.538Q11.675 19 12 19q.325 0 .537.212.213.212.213.538v2.5q0 .325-.213.538Q12.325 23 12 23ZM6 7.05l-1.425-1.4q-.225-.225-.213-.537.013-.312.213-.537.225-.225.537-.225t.537.225L7.05 6q.2.225.2.525 0 .3-.2.5-.2.225-.513.225-.312 0-.537-.2Zm12.35 12.375L16.95 18q-.2-.225-.2-.538t.225-.512q.2-.225.5-.225t.525.225l1.425 1.4q.225.225.212.538-.012.313-.212.538-.225.225-.538.225t-.538-.225ZM16.95 7.05q-.225-.225-.225-.525 0-.3.225-.525l1.4-1.425q.225-.225.538-.213.313.013.538.213.225.225.225.537t-.225.537L18 7.05q-.2.2-.512.2-.312 0-.538-.2ZM4.575 19.425q-.225-.225-.225-.538t.225-.538L6 16.95q.225-.225.525-.225.3 0 .525.225.225.225.225.525 0 .3-.225.525l-1.4 1.425q-.225.225-.537.212-.312-.012-.537-.212Z"
            />
          </svg>
          <svg class="moon" viewBox="0 0 24 24">
            <path
              d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025.337.025.662.075-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613 1.15-.612 1.875-1.637.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Zm0-1.5q2.725 0 4.75-1.687t2.525-3.963q-.625.275-1.337.412Q17.225 14.4 16.5 14.4q-2.875 0-4.887-2.013T9.6 7.5q0-.725.137-1.438.138-.713.413-1.337-2.275.5-3.963 2.525Q4.5 9.275 4.5 12q0 3.125 2.188 5.313T12 19.5Zm-.1-7.75Z"
            />
          </svg>
        </label>
      </div>
    </nav>
    <GradientDivider />
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
  background-color: var(--header-footer-bg);
}

nav {
  display: flex;
  justify-content: space-between;
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
  padding: 5px 0;
}

nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
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

.theme-switch {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: var(--background-color);
  border-radius: 34px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

input[type='checkbox'] {
  display: none;
}

.switch::before {
  content: '';
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  top: 4px;
  left: 4px;
  background-color: var(--secondary-color);
  transition: transform 0.3s ease;
}

input:checked + .switch::before {
  transform: translateX(26px);
}

.sun,
.moon {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 7px;
  transition: opacity 0.3s ease;
}

.sun {
  left: 7px;
  opacity: 1;
  fill: #f39c12;
}

.moon {
  right: 7px;
  opacity: 0;
  fill: #f1c40f;
}

input:checked + .switch .sun {
  opacity: 0;
}

input:checked + .switch .moon {
  opacity: 1;
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
    background-color: var(--header-footer-bg);
    padding: 20px;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
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
