<script setup lang="ts">
import { ref } from 'vue'
import SectionContainer from '@/components/SectionContainer.vue'

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
    <SectionContainer title="个人信息">
      <ul>
        <li v-for="(value, key) in personalInfo" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </SectionContainer>
    <SectionContainer title="职业目标">
      <p>{{ careerObjective }}</p>
    </SectionContainer>
    <SectionContainer title="教育背景">
      <ul>
        <li v-for="(edu, index) in education" :key="index">
          <strong>{{ edu.school }}</strong> - {{ edu.major }} ({{ edu.period }})
        </li>
      </ul>
    </SectionContainer>
  </div>
</template>

<style scoped>
.about {
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
}

li {
  margin-bottom: 0.5rem;
}

strong {
  color: var(--secondary-color);
}
</style>
