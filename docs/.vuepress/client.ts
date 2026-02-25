import { defineClientConfig } from 'vuepress/client'
import BlogHome from './components/BlogHome.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('BlogHome', BlogHome)
  }
})
