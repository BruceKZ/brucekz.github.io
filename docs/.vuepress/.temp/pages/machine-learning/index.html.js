import comp from "/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/machine-learning/index.html.vue"
const data = JSON.parse("{\"path\":\"/machine-learning/\",\"title\":\"Machine Learning\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"machine-learning/README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
