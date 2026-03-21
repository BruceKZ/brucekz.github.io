import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { tasklist } from "@mdit/plugin-tasklist";
import { plumeTheme } from 'vuepress-theme-plume'
import { navbar, sidebar } from './configs'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: plumeTheme({
        navbar: navbar,
        sidebar: sidebar,
        appearance: true,
        readingTime: false,
        footer: false,
        markdownMath: {
            type: 'katex',
        },
    }),
    plugins: [
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
