<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useThemeStore } from './stores/theme'
import { provide } from 'vue'

const themeStore = useThemeStore()
provide('themeStore', themeStore)
</script>

<template>
  <div class="app" :class="{ dark: themeStore.isDark }">
    <AppHeader />
    <main>
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import './styles/global.css';

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition:
    background-color 0.3s,
    color 0.3s;
  background-color: var(--background-color);
  color: var(--text-color);
}

main {
  flex: 1;
  padding: 80px 20px 20px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  main {
    padding: 70px 10px 10px;
  }
}
</style>
