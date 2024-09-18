<script setup lang="ts">
import { ref } from 'vue'
import SectionContainer from '@/components/SectionContainer.vue'
import type { Skill } from '@/types'

const skills = ref<Skill[]>([
  {
    category: '编程语言',
    items: ['Java', 'Python', 'C#', 'Kotlin', 'C', 'JavaScript', 'TypeScript']
  },
  { category: '数据库', items: ['MySQL', 'Redis'] },
  { category: '后端开发', items: ['Spring Boot', 'MyBatis Plus', 'Maven', 'Gradle'] },
  { category: '前端开发', items: ['Vue 3', 'HTML', 'CSS'] },
  { category: '版本控制与容器化', items: ['Git', 'Docker'] },
  { category: 'AI 工具', items: ['GitHub Copilot', 'GPT', 'ComfyUI'] },
  { category: '开发工具', items: ['IntelliJ IDEA', 'VS Code', 'Linux'] }
])
</script>

<template>
  <div class="skills">
    <h1>技能</h1>
    <SectionContainer v-for="skill in skills" :key="skill.category" :title="skill.category">
      <ul>
        <li v-for="item in skill.items" :key="item">{{ item }}</li>
      </ul>
    </SectionContainer>
  </div>
</template>

<style scoped>
.skills {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
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

@media (max-width: 768px) {
  .skills {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.8rem;
  }

  li {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
