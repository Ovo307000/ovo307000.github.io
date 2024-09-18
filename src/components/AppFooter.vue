<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="glass">
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

.contact-info p {
  margin: 0.2rem 0;
}

.social-links a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--text-color);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .contact-info,
  .social-links {
    margin: 0.5rem 0;
  }
}
</style>
