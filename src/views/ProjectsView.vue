<script setup lang="ts">
import { ref } from 'vue'

const projects = ref([
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
    <div v-for="project in projects" :key="project.name" class="project">
      <h2>{{ project.name }}</h2>
      <p><strong>描述：</strong>{{ project.description }}</p>
      <p><strong>职责：</strong>{{ project.responsibilities }}</p>
      <p><strong>技术栈：</strong>{{ project.techStack.join(', ') }}</p>
      <h3>成果：</h3>
      <ul>
        <li v-for="achievement in project.achievements" :key="achievement">{{ achievement }}</li>
      </ul>
      <p><a :href="project.github" target="_blank">GitHub 源码</a></p>
    </div>
  </div>
</template>

<style scoped>
.projects {
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

.project {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project:hover {
  transform: translateY(-5px);
}

h2,
h3 {
  color: var(--primary-color);
}

h2 {
  border-bottom: 2px solid var(--secondary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--secondary-color);
}

strong {
  color: var(--primary-color);
}
</style>
