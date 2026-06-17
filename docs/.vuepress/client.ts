import { defineClientConfig } from 'vuepress/client'
import './styles/index.scss'
import SemesterProgress from './components/SemesterProgress.vue'

export default defineClientConfig({
    enhance({ app }) {
        app.component('SemesterProgress', SemesterProgress)
    },
})
