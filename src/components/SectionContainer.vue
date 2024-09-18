<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="section-container glass">
    <h2 class="section-heading">{{ title }}</h2>
    <div class="section-content">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.section-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  animation: fadeIn 0.5s ease-out;
}

.section-heading {
  color: var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.section-content {
  color: var(--text-color);
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
