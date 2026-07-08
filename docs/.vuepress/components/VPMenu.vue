<script lang="ts" setup>
import VPMenuLink from '@theme/VPMenuLink.vue'
import { ref } from 'vue'

// Override of the theme's VPMenu that renders a non-link item (a group with
// its own `items`) as a hover sub-flyout instead of a flat, inlined group.
// This gives real second-level navbar menus, e.g. Courses ▾ → Archived ▸ → …
defineOptions({ name: 'VPMenu' })

const { items } = defineProps<{
  items?: any[]
}>()

const openIndex = ref(-1)
</script>

<template>
  <div class="vp-menu">
    <div v-if="items" class="items">
      <template v-for="(item, i) in items" :key="item.text ?? item.link">
        <VPMenuLink v-if="'link' in item" :item="item" />
        <div
          v-else
          class="vp-menu-sub"
          @mouseenter="openIndex = i"
          @mouseleave="openIndex = -1"
        >
          <button
            type="button"
            class="vp-menu-sub-button"
            aria-haspopup="true"
            :aria-expanded="openIndex === i"
          >
            <span class="label">{{ item.text }}</span>
            <span class="chevron" />
          </button>
          <div class="vp-menu-sub-flyout" :class="{ open: openIndex === i }">
            <VPMenu :items="item.items" />
          </div>
        </div>
      </template>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.vp-menu {
  min-width: 128px;
  max-height: calc(100vh - var(--vp-nav-height));
  padding: 12px;
  overflow: visible;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  transition: background-color var(--vp-t-color), border var(--vp-t-color);
}

.vp-menu-sub {
  position: relative;
}

.vp-menu-sub-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  border-radius: 6px;
  transition:
    background-color var(--vp-t-color),
    color var(--vp-t-color);
}

.vp-menu-sub-button:hover,
.vp-menu-sub-button[aria-expanded='true'] {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.vp-menu-sub-button .label {
  flex-grow: 1;
  text-align: left;
}

.vp-menu-sub-button .chevron {
  width: 6px;
  height: 6px;
  margin-left: 12px;
  border-top: 1.5px solid currentcolor;
  border-right: 1.5px solid currentcolor;
  transform: rotate(45deg);
  opacity: 0.7;
}

.vp-menu-sub-flyout {
  position: absolute;
  top: -13px;
  right: 100%;
  padding-right: 8px;
  visibility: hidden;
  opacity: 0;
  transform: translateX(4px);
  transition:
    opacity 0.2s,
    visibility 0.2s,
    transform 0.2s;
}

.vp-menu-sub-flyout.open {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}
</style>
