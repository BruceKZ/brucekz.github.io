export const sidebar = {
    '/courses/archive/ml/': [
        {
            text: 'Machine Learning',
            children: [
                '/courses/archive/ml/README.md',
                '/courses/archive/ml/regression.md',
                '/courses/archive/ml/linear_regression.md',
                '/courses/archive/ml/loss_functions.md',
                '/courses/archive/ml/Exams.md',
            ],
        },
    ],
    '/courses/archive/algo2/': [
        {
            text: 'Algorithm II',
            children: [
                '/courses/archive/algo2/README.md',
                {
                    text: 'Notes',
                    collapsible: true,
                    children: [
                        '/courses/archive/algo2/Lecture5.md',
                        '/courses/archive/algo2/Lecture6.md',
                        '/courses/archive/algo2/Lecture7.md'
                    ]
                },
                {
                    text: 'PDFs',
                    collapsible: true,
                    children: [
                        '/courses/archive/algo2/Lecture_Notes.md',
                        '/courses/archive/algo2/Exercises.md',
                        '/courses/archive/algo2/Exams.md'
                    ]
                }
            ],
        }
    ],
    '/courses/archive/gt/': [
        {
            text: 'Graph Theory',
            children: [
                '/courses/archive/gt/README.md',
                '/courses/archive/gt/Lecture1.md',
                '/courses/archive/gt/Lecture2.md',
                '/courses/archive/gt/Lecture3.md',
                '/courses/archive/gt/Lecture4.md',
                '/courses/archive/gt/Lecture5.md',
                '/courses/archive/gt/Lecture6.md',
                '/courses/archive/gt/Lecture7.md',
                '/courses/archive/gt/Lecture8.md',
                '/courses/archive/gt/Lecture9.md',
                '/courses/archive/gt/Lecture10.md',
                '/courses/archive/gt/Lecture11.md',
                '/courses/archive/gt/Lecture12.md',
                '/courses/archive/gt/Lecture13.md',
                '/courses/archive/gt/Lecture14.md',
            ],
        },
    ],
    '/tech/': [
        {
            text: 'Tech Notes',
            children: [
                '/tech/README.md',
                '/tech/hpc.md',
            ],
        },
    ],
    '/courses/nlp/': [
        {
            text: 'Modern NLP',
            children: [
                '/courses/nlp/course-homepage.md',
            ],
        },
    ],
    '/courses/dataviz/': [
        {
            text: 'Data Visualization',
            children: [
                '/courses/dataviz/README.md',
            ],
        },
    ],
    '/courses/bigdata/': [
        {
            text: 'Large-Scale Data Science',
            children: [
                '/courses/bigdata/README.md',
            ],
        },
    ],
    '/courses/toc/': [
        {
            text: 'Theory of Computation',
            children: [
                '/courses/toc/README.md',
            ],
        },
    ],
}
