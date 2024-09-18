<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const bio = ref(
  '你好，我是张三，一名软件开发工程师，擅长前端开发和全栈开发。我正在寻求 Java 后端开发职位，希望能够为贵公司贡献我的技能和经验。'
)
</script>

<template>
  <div class="home">
    <div class="content glass">
      <h1>欢迎来到我的个人简历网站</h1>
      <div class="bio">
        <p>{{ bio }}</p>
      </div>
      <RouterLink to="/about" class="cta-button">了解更多</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 1rem;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 800px;
  text-align: center;
  padding: 3rem;
  border-radius: 10px;
  animation: fadeIn 1s ease-out;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

.bio {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--background-color);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: var(--text-color);
  color: var(--secondary-color);
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(100, 255, 218, 0.2);
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

@media (max-width: 768px) {
  .home {
    padding: 0.5rem;
  }

  .content {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .bio {
    font-size: 1rem;
  }
}
</style>
