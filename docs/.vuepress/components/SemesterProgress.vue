<script setup lang="ts">
import { computed } from 'vue'

// CS-251 Theory of Computation — Spring 2026 semester plan (from Moodle).
// Each entry is one teaching week. `start` is the Monday of that week.
interface Week {
  start: string // ISO date, Monday of the week
  label: string // human date range
  part?: string // part heading shown above the topic
  topic: string
  detail?: string
}

const weeks: Week[] = [
  { start: '2026-02-16', label: '16 – 22 Feb', part: 'Part I · Finite Automata', topic: 'Lecture 1: Introduction and Finite Automata', detail: 'Sipser ch. 0, 1.1' },
  { start: '2026-02-23', label: '23 Feb – 1 Mar', topic: 'Lecture 2: Non-Determinism and Closure Properties', detail: 'Sipser ch. 1.2' },
  { start: '2026-03-02', label: '2 – 8 Mar', topic: 'Lecture 3: Non-Regular Languages', detail: 'Sipser ch. 1.4 · HW1' },
  { start: '2026-03-09', label: '9 – 15 Mar', part: 'Part II · Computability', topic: 'Lecture 4: Turing Machines and variants, Decidability', detail: 'Sipser ch. 3.1, 3.2, 4.1' },
  { start: '2026-03-16', label: '16 – 22 Mar', topic: 'Lecture 5: Decidability and Undecidability', detail: 'Sipser ch. 4.1, 4.2' },
  { start: '2026-03-23', label: '23 – 29 Mar', topic: 'Lecture 6: Undecidability and Reducibility', detail: 'Sipser ch. 4.2, 5.1, 5.3' },
  { start: '2026-03-30', label: '30 Mar – 5 Apr', topic: 'Recap of Part II', detail: 'Midterm II 2019 walkthrough · HW2' },
  { start: '2026-04-06', label: '6 – 12 Apr', topic: 'Easter break', detail: 'No lecture' },
  { start: '2026-04-13', label: '13 – 19 Apr', part: 'Part III · Complexity', topic: 'Lecture 7: Time complexity, Class P', detail: 'Sipser ch. 7.1, 7.2' },
  { start: '2026-04-20', label: '20 – 26 Apr', topic: 'Lecture 8: NP, NP-completeness', detail: 'Sipser ch. 7.3, 7.4' },
  { start: '2026-04-27', label: '27 Apr – 3 May', topic: 'Lecture 9: NP-completeness', detail: 'Sipser ch. 7.4, 7.5 · HW3' },
  { start: '2026-05-04', label: '4 – 10 May', topic: 'Lecture 10: More NP-completeness (3-matching, subset sum)', detail: 'Sipser ch. 7.5' },
  { start: '2026-05-11', label: '11 – 17 May', topic: 'Lecture 11: The Cook-Levin Theorem', detail: 'Sipser ch. 9.3' },
  { start: '2026-05-18', label: '18 – 24 May', topic: 'Lecture 12: Gödel’s Incompleteness Theorems', detail: 'Final lecture' },
]

const semesterStart = new Date(weeks[0].start + 'T00:00:00')
// Course ends one week after the last teaching week starts.
const semesterEnd = new Date('2026-05-25T00:00:00')

const now = new Date()

const progress = computed(() => {
  const total = semesterEnd.getTime() - semesterStart.getTime()
  const done = now.getTime() - semesterStart.getTime()
  const pct = Math.max(0, Math.min(100, (done / total) * 100))
  return Math.round(pct)
})

function weekState(i: number): 'done' | 'current' | 'upcoming' {
  const start = new Date(weeks[i].start + 'T00:00:00')
  const end = i + 1 < weeks.length
    ? new Date(weeks[i + 1].start + 'T00:00:00')
    : semesterEnd
  if (now >= end) return 'done'
  if (now >= start) return 'current'
  return 'upcoming'
}

const phase = computed(() => {
  if (now < semesterStart) return 'Not started yet'
  if (now >= semesterEnd) return 'Teaching complete — exam prep'
  return 'In progress'
})
</script>

<template>
  <div class="sem-progress">
    <div class="sem-head">
      <span class="sem-phase">{{ phase }}</span>
      <span class="sem-pct">{{ progress }}%</span>
    </div>
    <div class="sem-bar">
      <div class="sem-fill" :style="{ width: progress + '%' }"></div>
    </div>

    <ol class="sem-timeline">
      <li v-for="(w, i) in weeks" :key="w.start" :class="['sem-week', weekState(i)]">
        <div class="sem-dot"></div>
        <div class="sem-content">
          <div v-if="w.part" class="sem-part">{{ w.part }}</div>
          <div class="sem-topic">{{ w.topic }}</div>
          <div class="sem-meta">
            <span class="sem-date">{{ w.label }}</span>
            <span v-if="w.detail" class="sem-detail">· {{ w.detail }}</span>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.sem-progress {
  margin: 1.5rem 0;
}
.sem-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.sem-phase {
  color: var(--vp-c-text-2);
}
.sem-pct {
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.sem-bar {
  height: 10px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft, rgba(125, 125, 125, 0.18));
  overflow: hidden;
}
.sem-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--vp-c-brand-2, #3b82f6), var(--vp-c-brand-1, #2563eb));
  transition: width 0.4s ease;
}

.sem-timeline {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  position: relative;
}
.sem-timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--vp-c-divider, rgba(125, 125, 125, 0.24));
}
.sem-week {
  position: relative;
  padding: 0 0 1.1rem 1.75rem;
}
.sem-dot {
  position: absolute;
  left: 0;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-bg, #fff);
  border: 2px solid var(--vp-c-divider, #bbb);
  z-index: 1;
}
.sem-week.done .sem-dot {
  background: var(--vp-c-brand-1, #2563eb);
  border-color: var(--vp-c-brand-1, #2563eb);
}
.sem-week.current .sem-dot {
  border-color: var(--vp-c-brand-1, #2563eb);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1, #2563eb) 25%, transparent);
}
.sem-part {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1, #2563eb);
  margin-bottom: 0.15rem;
}
.sem-topic {
  font-weight: 600;
}
.sem-week.upcoming .sem-topic {
  color: var(--vp-c-text-2);
}
.sem-meta {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-top: 0.1rem;
}
.sem-week.current .sem-topic::after {
  content: ' ← current';
  font-size: 0.75rem;
  color: var(--vp-c-brand-1, #2563eb);
  font-weight: 600;
}
</style>
