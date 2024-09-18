import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const theme = useStorage('theme', 'light')
  const isDark = ref(theme.value === 'dark')

  function toggleTheme() {
    isDark.value = !isDark.value
    updateTheme()
  }

  function updateTheme() {
    theme.value = isDark.value ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', isDark.value)
    setThemeColors()
  }

  function setThemeColors() {
    const colors = isDark.value
      ? {
          background: '#0a192f',
          text: '#8892b0',
          primary: '#64ffda',
          secondary: '#ccd6f6'
        }
      : {
          background: '#f0f4f8',
          text: '#333333',
          primary: '#3a4256',
          secondary: '#4a90e2'
        }

    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value)
    })
  }

  function initTheme() {
    updateTheme()
  }

  return { isDark, toggleTheme, initTheme }
})
