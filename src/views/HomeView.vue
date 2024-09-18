<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const bio = ref(
  '你好，我是张三，一名软件开发工程师，擅长前端开发和全栈开发。我正在寻求 Java 后端开发职位，希望能够为贵公司贡献我的技能和经验。'
)
</script>

<template>
  <div class="home">
    <h1>欢迎来到我的个人简历网站</h1>
    <p>{{ bio }}</p>
    <RouterLink to="/about" class="cta-button">了解更多</RouterLink>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  animation: fadeIn 0.5s ease-out;
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

.cta-button {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 30px;
  margin-top: 2rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-3px);
}
</style>
