import { defineClientConfig } from 'vuepress/client'
import BlogHome from './components/BlogHome.vue'
import './styles/index.scss'

export default defineClientConfig({
  enhance({ app }) {
    app.component('BlogHome', BlogHome)
  }
})
