import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { tasklist } from "@mdit/plugin-tasklist";
import { navbar, sidebar } from './configs'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        navbar: navbar,
        sidebar: sidebar,
    }),
    plugins: [
        markdownMathPlugin({
            type: 'katex',
        }),
        mdEnhancePlugin({
        }),
    ],
    lang: 'en-US',
    title: 'Bruce12138',
    description: '',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    extendsMarkdown: (md) => {
        md.use(tasklist)
    }
})