export const sidebar = {
    '/courses/': [
        {
            text: 'Courses',
            items: [
                '/courses/README.md',
            ],
        },
    ],
    '/courses/archive/ml/': [
        {
            text: 'Machine Learning',
            items: [
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
            items: [
                '/courses/archive/algo2/README.md',
                {
                    text: 'Notes',
                    collapsed: true,
                    items: [
                        '/courses/archive/algo2/Lecture5.md',
                        '/courses/archive/algo2/Lecture6.md',
                        '/courses/archive/algo2/Lecture7.md'
                    ]
                },
                {
                    text: 'PDFs',
                    collapsed: true,
                    items: [
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
            items: [
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
            items: [
                '/tech/README.md',
                {
                    text: 'LaTeX',
                    collapsed: false,
                    items: [
                        '/tech/local_latex.md',
                        '/tech/epfl_homework_template.md',
                    ],
                },
                {
                    text: 'Competitive Programming',
                    collapsed: false,
                    items: [
                        '/tech/icpc_cpp_workflow.md',
                    ],
                },
                {
                    text: 'HPC',
                    collapsed: false,
                    items: [
                        '/tech/hpc.md',
                    ],
                },
            ],
        },
    ],
    '/courses/nlp/': [
        {
            text: 'Overview',
            items: [
                {
                    text: 'Home',
                    link: '/courses/nlp/README.md',
                },
                {
                    text: 'Course Homepage',
                    link: '/courses/nlp/course-homepage.md',
                },
            ],
        },
        {
            text: 'Resources',
            items: [
                {
                    text: 'Slides',
                    link: '/courses/nlp/resources/slides.md',
                },
                {
                    text: 'Exams',
                    link: '/courses/nlp/resources/exams.md',
                },
            ],
        },
        {
            text: 'Notes',
            items: [
                {
                    text: 'Notes Index',
                    link: '/courses/nlp/notes/README.md',
                },
                {
                    text: 'Foundations',
                    collapsed: true,
                    items: [
                        {
                            text: 'Basics',
                            link: '/courses/nlp/notes/01-neural-text-classification.md',
                        },
                        {
                            text: 'Embeddings',
                            link: '/courses/nlp/notes/02-word-embeddings.md',
                        },
                        {
                            text: 'Count-Based LMs',
                            link: '/courses/nlp/notes/03-count-based-language-models.md',
                        },
                    ],
                },
                {
                    text: 'Sequence Models',
                    collapsed: true,
                    items: [
                        {
                            text: 'Neural LMs and RNNs',
                            link: '/courses/nlp/notes/04-neural-language-models-and-rnns.md',
                        },
                        {
                            text: 'LSTMs and GRUs',
                            link: '/courses/nlp/notes/05-lstms-grus-and-training-issues.md',
                        },
                        {
                            text: 'Seq2Seq and Attention',
                            link: '/courses/nlp/notes/06-seq2seq-and-attention.md',
                        },
                        {
                            text: 'Transformers',
                            link: '/courses/nlp/notes/07-transformers.md',
                        },
                        {
                            text: 'Tokenization',
                            link: '/courses/nlp/notes/08-tokenization.md',
                        },
                    ],
                },
                {
                    text: 'Modern Pretraining',
                    collapsed: true,
                    items: [
                        {
                            text: 'Pretraining and Transfer',
                            link: '/courses/nlp/notes/09-pretraining-and-transfer-learning.md',
                        },
                        {
                            text: 'Text Generation',
                            link: '/courses/nlp/notes/12-text-generation.md',
                        },
                        {
                            text: 'In-Context and Post-Training',
                            link: '/courses/nlp/notes/13-in-context-learning-and-post-training.md',
                        },
                    ],
                },
                {
                    text: 'Data and Evaluation',
                    collapsed: true,
                    items: [
                        {
                            text: 'Annotation and Bias',
                            link: '/courses/nlp/notes/10-data-annotation-and-bias.md',
                        },
                        {
                            text: 'AI Evaluation',
                            link: '/courses/nlp/notes/11-evaluation-of-ai-systems.md',
                        },
                    ],
                },
            ],
        },
    ],
    '/courses/dataviz/': [
        {
            text: 'Data Visualization',
            items: [
                '/courses/archive/dataviz/README.md',
            ],
        },
    ],
    '/courses/archive/dataviz/': [
        {
            text: 'Data Visualization',
            items: [
                '/courses/archive/dataviz/README.md',
            ],
        },
    ],
    '/courses/bigdata/': [
        {
            text: 'Large-Scale Data Science',
            items: [
                '/courses/bigdata/README.md',
            ],
        },
    ],
    '/courses/toc/': [
        {
            text: 'Theory of Computation',
            items: [
                '/courses/toc/README.md',
                '/courses/toc/Lecture1.md',
                '/courses/toc/Lecture2.md',
                '/courses/toc/Lecture3.md',
                '/courses/toc/Lecture4.md',
                '/courses/toc/Lecture5.md',
                '/courses/toc/Lecture6.md',
            ],
        },
    ],
}
