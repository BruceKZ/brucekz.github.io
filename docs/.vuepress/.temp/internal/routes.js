export const redirects = JSON.parse("{\"/swent/Dog%20Community%20App%20Ideabook.html\":\"swent-idea/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Never regret the choices you make."} }],
  ["swent-idea/", { loader: () => import(/* webpackChunkName: "swent-idea_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/swent-idea/index.html.js"), meta: {"title":"Dog Community App Ideabook"} }],
  ["/swent/", { loader: () => import(/* webpackChunkName: "swent_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/swent/index.html.js"), meta: {"title":""} }],
  ["/ml/", { loader: () => import(/* webpackChunkName: "ml_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/index.html.js"), meta: {"title":"Introduction"} }],
  ["/ml/regression.html", { loader: () => import(/* webpackChunkName: "ml_regression.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/regression.html.js"), meta: {"title":"Regression"} }],
  ["/test/test.html", { loader: () => import(/* webpackChunkName: "test_test.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/test/test.html.js"), meta: {"title":"LaTeX 示例文档"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/gt/", { loader: () => import(/* webpackChunkName: "gt_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/gt/index.html.js"), meta: {"title":""} }],
  ["/algo2/", { loader: () => import(/* webpackChunkName: "algo2_index.html" */"/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/algo2/index.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
