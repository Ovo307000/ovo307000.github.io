<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="contact-info">
      <p>电话: 19155126666</p>
      <p>邮箱: solowzl@outlook.com</p>
    </div>
    <p>&copy; {{ currentYear }} 张三. 保留所有权利.</p>
    <div class="social-links">
      <a href="https://github.com/Ovo307000" target="_blank">GitHub</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--header-footer-bg);
  color: #ffffff;
  margin-top: auto;
}

.contact-info {
  margin-bottom: 0.5rem;
}

.contact-info p {
  margin: 0.2rem 0;
}

.social-links {
  margin-top: 0.5rem;
}

.social-links a {
  color: var(--secondary-color);
  margin: 0 0.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #ffffff;
}
</style>
