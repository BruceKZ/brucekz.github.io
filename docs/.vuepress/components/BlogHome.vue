<template>
  <div class="blog-home-container">
    <!-- Animated floating background orbs -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    
    <div class="hero-content">
      <h1 class="main-title">Bruce's Space</h1>
      <p class="slogan">Never regret the choices you make.</p>
    </div>

    <div class="categories-grid">
      <!-- Courses Card -->
      <a href="/courses/" class="category-card">
        <div class="card-icon">📚</div>
        <div class="card-info">
          <h2>Courses</h2>
          <p>Machine Learning, Algorithm II, Graph Theory & more...</p>
        </div>
      </a>
      
      <!-- Tech Notes Card -->
      <a href="/tech/" class="category-card">
        <div class="card-icon">💻</div>
        <div class="card-info">
          <h2>Tech Notes</h2>
          <p>Records of my technical journey, notes, bugs, and solutions.</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:ital@1&display=swap');

.blog-home-container {
  position: relative;
  /* strictly fit exactly the remaining height */
  height: calc(100vh - var(--navbar-height, 3.6rem));
  height: calc(100dvh - var(--navbar-height, 3.6rem));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 2rem;
  font-family: 'Inter', sans-serif;
}

/* Background Animated Orbs */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: -1;
  animation: float 20s infinite ease-in-out alternate;
}
.orb-1 {
  width: 50vw;
  max-width: 500px;
  height: 50vw;
  max-height: 500px;
  background: rgba(100, 149, 237, 0.4); /* Cornflower blue */
  top: 5%;
  left: 10%;
}
.orb-2 {
  width: 40vw;
  max-width: 400px;
  height: 40vw;
  max-height: 400px;
  background: rgba(199, 21, 133, 0.3); /* MediumVioletRed */
  bottom: 5%;
  right: 10%;
  animation-delay: -5s;
}

/* Dark mode overrides for background elements */
html.dark .orb-1 { background: rgba(100, 149, 237, 0.15); }
html.dark .orb-2 { background: rgba(199, 21, 133, 0.15); }

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(50px, 80px) scale(1.1); }
  100% { transform: translate(-30px, 120px) scale(0.9); }
}

.hero-content {
  text-align: center;
  margin-bottom: min(4rem, 6vh);
  animation: fadeInDown 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.main-title {
  font-size: clamp(2rem, min(8vw, 8vh), 5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: min(1rem, 2vh);
  background: linear-gradient(135deg, var(--c-text), var(--c-text-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* Fallback */
}

.slogan {
  font-size: clamp(1rem, min(3vw, 4vh), 1.8rem);
  color: var(--c-text-light);
  font-style: italic;
  font-family: 'JetBrains Mono', monospace;
  margin-top: min(1rem, 2vh);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: min(2rem, 4vh);
  width: 100%;
  max-width: 1000px;
  animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both;
}

.category-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: min(2.5rem, 4vh) min(2rem, 3vw);
  text-decoration: none !important;
  color: var(--c-text);
  display: flex;
  align-items: center;
  gap: min(1.5rem, 3vh);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  min-width: 0;
}

/* Dark mode for cards */
html.dark .category-card {
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.category-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);
}
html.dark .category-card:hover {
  background: rgba(50, 50, 50, 0.8);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-icon {
  font-size: min(3.5rem, 8vh);
  line-height: 1;
  padding: min(1rem, 2vh);
  background: rgba(100, 149, 237, 0.1);
  border-radius: 20px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}
html.dark .card-icon {
  background: rgba(100, 149, 237, 0.2);
}

.category-card:hover .card-icon {
  transform: scale(1.1) rotate(-5deg);
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.card-info h2 {
  margin: 0 0 min(0.5rem, 1vh) 0;
  font-size: min(1.8rem, 4vh);
  font-weight: 600;
  border-bottom: none;
}
.card-info p {
  margin: 0;
  color: var(--c-text-light);
  line-height: 1.4;
  font-size: min(1.05rem, 2.5vh);
  /* Truncate text if it gets too small/overflows */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile responsive layout */
@media (max-width: 768px) {
  .blog-home-container {
    padding: 0 1rem;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: min(1.5rem, 3vh);
    max-width: 400px;
  }
  
  .category-card {
    padding: min(1.5rem, 3vh) min(1.5rem, 4vw);
    gap: min(1rem, 2vh);
  }

  .card-icon {
    font-size: min(3rem, 7vh);
    padding: min(0.8rem, 1.5vh);
  }

  .card-info h2 {
    font-size: min(1.5rem, 3.5vh);
  }

  .card-info p {
    font-size: min(0.95rem, 2vh);
  }
}
</style>
