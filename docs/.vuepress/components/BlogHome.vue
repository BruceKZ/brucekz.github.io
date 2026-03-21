<template>
  <div class="blog-home-container">
    <p class="slogan">Never regret the choices you make.</p>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:ital@1&display=swap');

.blog-home-container {
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;
}

.slogan {
  margin: 0;
  text-align: center;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  line-height: 1.7;
  color: var(--vp-c-text-2);
  font-style: italic;
  font-family: 'JetBrains Mono', monospace;
}

@media (max-width: 768px) {
  .blog-home-container {
    padding: 0 1rem;
  }
}
</style>
