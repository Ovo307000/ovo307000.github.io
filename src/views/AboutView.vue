<script setup lang="ts">
import { ref } from 'vue'

const personalInfo = ref({
  name: '张三',
  phone: '19155126666',
  email: 'solowzl@outlook.com',
  github: 'github.com/Ovo307000'
})

const careerObjective = ref(
  '寻求 Java 后端开发职位，具备扎实的编程技能与丰富项目经验。希望通过构建高效、稳定的后端系统，提升企业业务效率，在技术创新中不断成长。'
)

const education = ref([
  { school: '安徽工贸学院', major: '软件技术', period: '2020.10 - 2023.06' },
  { school: '安徽财经大学', major: '计算机科学与技术', period: '2024.03 - 2027.06' }
])
</script>

<template>
  <div class="about">
    <h1>关于我</h1>
    <section>
      <h2>个人信息</h2>
      <ul>
        <li v-for="(value, key) in personalInfo" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </section>
    <section>
      <h2>职业目标</h2>
      <p>{{ careerObjective }}</p>
    </section>
    <section>
      <h2>教育背景</h2>
      <ul>
        <li v-for="(edu, index) in education" :key="index">
          <strong>{{ edu.school }}</strong> - {{ edu.major }} ({{ edu.period }})
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
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

section {
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
}

li {
  margin-bottom: 0.5rem;
}

strong {
  color: var(--primary-color);
}
</style>
