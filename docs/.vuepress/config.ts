import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {markdownMathPlugin} from '@vuepress/plugin-markdown-math'
import {mdEnhancePlugin} from 'vuepress-plugin-md-enhance'

let ml_sidebar = [
    {
        text: 'Machine Learning',
        children: [
            '/ml/README.md',
            '/ml/regression.md',
            '/ml/linear_regression.md',
        ],
    },
]


let swent_sidebar = [
    {
        text: 'Software Enterprise',
        children: [
            '/swent/README.md',
            '/swent/Dog Community App Ideabook.md',
        ],
    },
]

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        navbar: [
            {
                text: 'Machine Learning',
                link: '/ml/',
            },
            {
                text: 'Software Enterprise',
                link: '/swent/',
            },
            {
                text: 'Graph Theory',
                link: '/gt/',
            },
            {
                text: 'Algorithm II',
                link: '/algo2/',
            }
        ],
        sidebar: {
            '/ml/': ml_sidebar,
            '/swent/': swent_sidebar,
        },
    }),
    plugins: [
        markdownMathPlugin({
            type: 'katex',
        }),
        mdEnhancePlugin({}),
    ],
    lang: 'en-US',
    title: 'Bruce12138\'s BLOG',
    description: 'The blogs for CS',
})