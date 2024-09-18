<template>
  <div class="gradient-divider"></div>
</template>

<style scoped>
.gradient-divider {
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--secondary-color) 0%,
    var(--primary-color) 50%,
    var(--secondary-color) 100%
  );
  background-size: 200% 100%;
  animation: gradientMove 5s linear infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
