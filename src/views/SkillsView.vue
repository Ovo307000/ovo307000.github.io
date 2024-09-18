<script setup lang="ts">
import { ref } from 'vue'

const skills = ref({
  编程语言: ['Java', 'Python', 'C#', 'Kotlin', 'C', 'JavaScript', 'TypeScript'],
  数据库: ['MySQL', 'Redis'],
  后端开发: ['Spring Boot', 'MyBatis Plus', 'Maven', 'Gradle'],
  前端开发: ['Vue 3', 'HTML', 'CSS'],
  版本控制与容器化: ['Git', 'Docker'],
  'AI 工具': ['GitHub Copilot', 'GPT', 'ComfyUI'],
  开发工具: ['IntelliJ IDEA', 'VS Code', 'Linux']
})
</script>

<template>
  <div class="skills">
    <h1>技能</h1>
    <div v-for="(skillList, category) in skills" :key="category" class="skill-category">
      <h2>{{ category }}</h2>
      <ul>
        <li v-for="skill in skillList" :key="skill">{{ skill }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.skills {
  max-width: 800px;
  margin: 0 auto;
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

.skill-category {
  margin-bottom: 2rem;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--primary-color);
  border-bottom: 2px solid var(--secondary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

li {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

li:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}
</style>
