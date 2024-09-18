import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const theme = useStorage('theme', 'light')

  const isDark = ref(theme.value === 'dark')

  watch(isDark, (val) => {
    theme.value = val ? 'dark' : 'light'
    updateTheme(val)
  })

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function updateTheme(dark: boolean) {
    document.documentElement.classList.toggle('dark', dark)
    // 更新CSS变量
    if (dark) {
      document.documentElement.style.setProperty('--background-color', '#0a192f')
      document.documentElement.style.setProperty('--text-color', '#8892b0')
      document.documentElement.style.setProperty('--primary-color', '#64ffda')
      document.documentElement.style.setProperty('--secondary-color', '#ccd6f6')
    } else {
      document.documentElement.style.setProperty('--background-color', '#f0f4f8')
      document.documentElement.style.setProperty('--text-color', '#333333')
      document.documentElement.style.setProperty('--primary-color', '#3a4256')
      document.documentElement.style.setProperty('--secondary-color', '#4a90e2')
    }
  }

  // 初始化主题
  updateTheme(isDark.value)

  return { isDark, toggleTheme }
})
