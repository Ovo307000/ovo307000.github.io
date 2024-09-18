<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const bio = ref(
  '你好，我是张三，一名软件开发工程师，擅长前端开发和全栈开发。我正在寻求 Java 后端开发职位，希望能够为贵公司贡献我的技能和经验。'
)
</script>

<template>
  <div class="home glass">
    <h1>欢迎来到我的个人简历网站</h1>
    <p>{{ bio }}</p>
    <RouterLink to="/about" class="cta-button">了解更多</RouterLink>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 3rem 2rem;
  margin-top: 2rem;
  animation: fadeIn 0.5s ease-out;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.cta-button {
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--background-color);
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: var(--text-color);
  transform: translateY(-3px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
