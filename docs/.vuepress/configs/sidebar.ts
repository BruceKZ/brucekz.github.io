export const sidebar = {
    '/courses/ml/': [
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
    ],
    '/courses/algo2/': [
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
    ],
    '/courses/gt/': [
        {
            text: 'Graph Theory',
            children: [
                '/courses/gt/README.md',
                '/courses/gt/Lecture1.md',
                '/courses/gt/Lecture2.md',
                '/courses/gt/Lecture3.md',
                '/courses/gt/Lecture4.md',
                '/courses/gt/Lecture5.md',
                '/courses/gt/Lecture6.md',
                '/courses/gt/Lecture7.md',
                '/courses/gt/Lecture8.md',
                '/courses/gt/Lecture9.md',
                '/courses/gt/Lecture10.md',
                '/courses/gt/Lecture11.md',
                '/courses/gt/Lecture12.md',
                '/courses/gt/Lecture13.md',
                '/courses/gt/Lecture14.md',
            ],
        },
    ],
}
