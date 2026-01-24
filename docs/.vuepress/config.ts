import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { tasklist } from "@mdit/plugin-tasklist";

let ml_sidebar = [
    {
        text: 'Machine Learning',
        children: [
            '/courses/ml/README.md',
            '/courses/ml/regression.md',
            '/courses/ml/linear_regression.md',
            '/courses/ml/loss_functions.md',
            '/courses/ml/Exams.md',
        ],
    },
]

let algo2_sidebar = [
    {
        text: 'Algorithm II',
        children: [
            '/courses/algo2/README.md',
            {
                text: 'Notes',
                collapsible: true,
                children: [
                    '/courses/algo2/Lecture5.md',
                    '/courses/algo2/Lecture6.md',
                    '/courses/algo2/Lecture7.md'
                ]
            },
            {
                text: 'PDFs',
                collapsible: true,
                children: [
                    '/courses/algo2/Lecture_Notes.md',
                    '/courses/algo2/Exercises.md',
                    '/courses/algo2/Exams.md'
                ]
            }
        ],
    }
]

let gt_sidebar = [
    {
        text: 'Graph Theory',
        children: [
            '/gt/README.md',
        ],
    },
]

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        navbar: [
            {
                text: 'Courses',
                children: [
                    {
                        text: 'Machine Learning',
                        link: '/courses/ml/',
                    },
                    {
                        text: 'Algorithm II',
                        link: '/courses/algo2/',
                    },
                ]
            },
            {
                text: 'Graph Theory',
                link: '/gt/',
            },
        ],
        sidebar: {
            '/courses/ml/': ml_sidebar,
            '/courses/algo2/': algo2_sidebar,
            '/gt/': gt_sidebar,
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
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    extendsMarkdown: (md) => {
        md.use(tasklist)
    }
})