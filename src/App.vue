<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useThemeStore } from './stores/theme'
import { provide, onMounted } from 'vue'

const themeStore = useThemeStore()
provide('themeStore', themeStore)

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="app" :class="{ dark: themeStore.isDark }">
    <AppHeader />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
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
}

main {
  flex: 1;
  padding: 80px 20px 20px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
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
