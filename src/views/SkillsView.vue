<script setup lang="ts">
import { ref } from 'vue'
import SectionContainer from '@/components/SectionContainer.vue'

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
    <SectionContainer v-for="(skillList, category) in skills" :key="category" :title="category">
      <ul>
        <li v-for="skill in skillList" :key="skill">{{ skill }}</li>
      </ul>
    </SectionContainer>
  </div>
</template>

<style scoped>
.skills {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--secondary-color);
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

li {
  background-color: var(--glass-bg);
  color: var(--secondary-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

li:hover {
  background-color: var(--secondary-color);
  color: var(--background-color);
  transform: translateY(-2px);
}
</style>
