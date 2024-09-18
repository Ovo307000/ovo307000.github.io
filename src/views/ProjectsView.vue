<script setup lang="ts">
import { ref } from 'vue'
import SectionContainer from '@/components/SectionContainer.vue'
import type { Project } from '@/types'

const projects = ref<Project[]>([
  {
    name: 'BigEvent',
    description: '开发了一款在线新闻平台后端，使用 Redis 管理 Token，集成 Minio 实现云存储。',
    responsibilities: '完整负责后端开发，设计数据库和核心功能模块，优化系统性能与安全性。',
    techStack: ['Java', 'Spring Boot', 'Redis', 'MySQL', 'Docker', 'Minio'],
    achievements: [
      '使用 WSL2 部署 Docker，在 Docker 中搭建了 MySQL、Redis 等服务，提升了开发效率。',
      '使用 JWT 进行权限管理。',
      '成功将 Minio 与 CloudFlare 集成，提升了文件存储效率。',
      '优化了系统并发处理，增强了整体性能与线程安全性。'
    ],
    github: 'https://github.com/Ovo307000/bigevent'
  },
  {
    name: '苍穹外卖',
    description:
      '实现了一款在线外卖平台后端，采用 Redis 缓存策略减少数据库访问，使用阿里云 OSS 实现文件上传。',
    responsibilities: '完整负责后端开发，优化原有代码，提升系统性能与用户体验。',
    techStack: ['Java', 'Spring Boot', 'MyBatis', 'Redis', 'MySQL', 'Aliyun OSS'],
    achievements: [
      '采用 Docker 容器化部署，提升了系统稳定性与运维效率。',
      '使用阿里云 OSS 实现了文件上传，提升了系统文件存储效率。',
      '使用 MyBatis Plus 优化了数据库访问，提升了数据查询效率。',
      '使用 AOP 切面编程，实现了对象自动注入，减少了重复代码。',
      '使用 CompletableFuture 实现了异步处理，提升了系统并发处理能力。',
      '采用了 Redis 缓存策略，有效减少了数据库访问次数。',
      '掌握了 ThreadLocal 和 AOP 切面的使用，优化了系统架构。'
    ],
    github: 'https://github.com/Ovo307000/sky-take-out'
  }
])
</script>

<template>
  <div class="projects">
    <h1>项目经验</h1>
    <SectionContainer v-for="project in projects" :key="project.name" :title="project.name">
      <p><strong>描述：</strong>{{ project.description }}</p>
      <p><strong>职责：</strong>{{ project.responsibilities }}</p>
      <p><strong>技术栈：</strong>{{ project.techStack.join(', ') }}</p>
      <h3>成果：</h3>
      <ul>
        <li v-for="achievement in project.achievements" :key="achievement">{{ achievement }}</li>
      </ul>
      <p><a :href="project.github" target="_blank">GitHub 源码</a></p>
    </SectionContainer>
  </div>
</template>

<style scoped>
.projects {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

h3 {
  color: var(--secondary-color);
  margin-top: 1rem;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--primary-color);
}

strong {
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .projects {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  li {
    font-size: 0.9rem;
  }
}
</style>
