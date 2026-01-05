import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {markdownMathPlugin} from '@vuepress/plugin-markdown-math'
import {mdEnhancePlugin} from 'vuepress-plugin-md-enhance'
import {tasklist} from "@mdit/plugin-tasklist";

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

let algo2_sidebar = [
    {
        text: 'Algorithm II',
        children: [
            '/algo2/README.md',
            {
                text: 'Notes',
                collapsible: true,
                children: [
                    '/algo2/Lecture5.md',
                    '/algo2/Lecture6.md',
                    '/algo2/Lecture7.md'
                ]
            },
            {
                text: 'PDFs',
                collapsible: true,
                children: [
                    '/algo2/Lecture_Notes.md',
                    '/algo2/Exercises.md',
                    '/algo2/Exams.md'
                ]
            }
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
                text: 'Graph Theory',
                link: '/gt/',
            },
            {
                text: 'Algorithm II',
                link: '/algo2/',
            },
            {
                text: 'CV',
                link: '/cv/',
            }
        ],
        sidebar: {
            '/ml/': ml_sidebar,
            '/algo2/': algo2_sidebar
        },
    }),
    plugins: [
        markdownMathPlugin({
            type: 'katex',
        }),
        mdEnhancePlugin({
            attrs: true,
        }),
    ],
    lang: 'en-US',
    title: 'Bruce12138',
    description: '',
    head: [
        ['link', {rel: 'icon', href:'/favicon.ico'}]
    ],
    extendsMarkdown: (md) => {
        md.use(tasklist)
    }
})