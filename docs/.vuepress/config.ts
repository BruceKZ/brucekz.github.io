import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { tasklist } from "@mdit/plugin-tasklist";
import { plumeTheme } from 'vuepress-theme-plume'
import { navbar, sidebar } from './configs'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
    bundler: viteBundler(),
    alias: {
        // Render nested navbar dropdown items (e.g. "Archived") as hover
        // sub-flyouts instead of flattened inline groups.
        '@theme/VPMenu.vue': path.resolve(__dirname, './components/VPMenu.vue'),
    },
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
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        // Keep the site out of search engines for now.
        ['meta', { name: 'robots', content: 'noindex, nofollow, noarchive' }],
    ],
    extendsMarkdown: (md) => {
        md.use(tasklist)
    }
})
