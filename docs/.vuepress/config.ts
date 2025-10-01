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
            '/ml/loss_functions.md',
        ],
    },
]


let swent_sidebar = [
    {
        text: 'Software Enterprise',
        children: [
            '/swent/README.md',
            '/swent/idea.md',
            '/swent/commit_message.md',
            '/swent/meeting/01102025.md'
        ],
    },
]

let algo2_sidebar = [
    {
        text: 'Algorithm II',
        children: [
            '/algo2/README.md',
            '/algo2/Lecture5.md',
            '/algo2/Lecture6.md',
            '/algo2/Lecture7.md'
        ],
    }
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
            '/algo2/': algo2_sidebar
        },
    }),
    plugins: [
        markdownMathPlugin({
            type: 'katex',
        }),
        mdEnhancePlugin({}),
    ],
    lang: 'en-US',
    title: 'Bruce12138',
    description: '',
    head: [
        ['link', {rel: 'icon', href:'/favicon.ico'}]
    ]
})