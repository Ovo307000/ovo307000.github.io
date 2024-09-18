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
      <p class="copyright">&copy; {{ currentYear }} 张三. 保留所有权利.</p>
      <div class="social-links">
        <a href="https://github.com/Ovo307000" target="_blank"> GitHub </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 2rem;
  padding: 1rem 0;
  background-color: var(--header-footer-bg);
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 20px;
}

/* 保持原有样式不变 */
</style>
