export const navbar = [
    {
        text: 'Modern NLP',
        link: '/courses/nlp/',
    },
    {
        text: 'Data Visualization',
        link: '/courses/dataviz/',
    },
    {
        text: 'Large-Scale Data Science',
        link: '/courses/bigdata/',
    },
    {
        text: 'Theory of Computation',
        link: '/courses/toc/',
    },
    {
        text: 'Courses',
        children: [
            {
                text: 'Modern NLP',
                link: '/courses/nlp/',
            },
            {
                text: 'Data Visualization',
                link: '/courses/dataviz/',
            },
            {
                text: 'Large-Scale Data Science',
                link: '/courses/bigdata/',
            },
            {
                text: 'Theory of Computation',
                link: '/courses/toc/',
            },
            {
                text: 'Archived',
                children: [
                    {
                        text: 'Machine Learning',
                        link: '/courses/archive/ml/',
                    },
                    {
                        text: 'Algorithm II',
                        link: '/courses/archive/algo2/',
                    },
                    {
                        text: 'Graph Theory',
                        link: '/courses/archive/gt/',
                    },
                ]
            }
        ]
    },
    {
        text: 'Tech Notes',
        link: '/tech/',
    },
]
