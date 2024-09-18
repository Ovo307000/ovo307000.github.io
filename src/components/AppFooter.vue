<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="glass">
    <div class="footer-content">
      <!-- ... 页脚内容保持不变 -->
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 2rem;
  padding: 1rem 0;
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

/* ... 其他样式保持不变 */
</style>
