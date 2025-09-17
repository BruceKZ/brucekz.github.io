import comp from "/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/test.html.vue"
const data = JSON.parse("{\"path\":\"/ml/test.html\",\"title\":\"LaTeX 示例文档\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"ml/test.md\"}")
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
