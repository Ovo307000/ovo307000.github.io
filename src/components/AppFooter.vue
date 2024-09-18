<script setup lang="ts">
import GradientDivider from './GradientDivider.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="glass">
    <GradientDivider />
    <div class="footer-content">
      <div class="contact-info">
        <p>电话: 19155126666</p>
        <p>邮箱: solowzl@outlook.com</p>
      </div>
      <p>&copy; {{ currentYear }} 张三. 保留所有权利.</p>
      <div class="social-links">
        <a href="https://github.com/Ovo307000" target="_blank">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 保持原有样式不变 */
</style>
