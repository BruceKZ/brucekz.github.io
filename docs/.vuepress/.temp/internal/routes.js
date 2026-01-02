export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/algo2/Exams.html", { loader: () => import(/* webpackChunkName: "algo2_Exams.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/Exams.html.js"), meta: {"title":"Exams"} }],
  ["/algo2/Exercises.html", { loader: () => import(/* webpackChunkName: "algo2_Exercises.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/Exercises.html.js"), meta: {"title":"Exercises"} }],
  ["/algo2/Lecture5.html", { loader: () => import(/* webpackChunkName: "algo2_Lecture5.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/Lecture5.html.js"), meta: {"title":"Lecture 5"} }],
  ["/algo2/Lecture6.html", { loader: () => import(/* webpackChunkName: "algo2_Lecture6.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/Lecture6.html.js"), meta: {"title":"Lecture 6"} }],
  ["/algo2/Lecture7.html", { loader: () => import(/* webpackChunkName: "algo2_Lecture7.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/Lecture7.html.js"), meta: {"title":"Lecture 7"} }],
  ["/algo2/Lecture_Notes.html", { loader: () => import(/* webpackChunkName: "algo2_Lecture_Notes.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/Lecture_Notes.html.js"), meta: {"title":"Lecture Notes"} }],
  ["/algo2/", { loader: () => import(/* webpackChunkName: "algo2_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/index.html.js"), meta: {"title":"Algorithm II"} }],
  ["/gt/", { loader: () => import(/* webpackChunkName: "gt_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/gt/index.html.js"), meta: {"title":"Graph Theory"} }],
  ["/ml/", { loader: () => import(/* webpackChunkName: "ml_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/index.html.js"), meta: {"title":"Introduction"} }],
  ["/ml/linear_regression.html", { loader: () => import(/* webpackChunkName: "ml_linear_regression.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/linear_regression.html.js"), meta: {"title":"Linear Regression 线性回归"} }],
  ["/ml/loss_functions.html", { loader: () => import(/* webpackChunkName: "ml_loss_functions.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/loss_functions.html.js"), meta: {"title":"Loss functions 损失函数"} }],
  ["/ml/regression.html", { loader: () => import(/* webpackChunkName: "ml_regression.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/regression.html.js"), meta: {"title":"Regression"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
