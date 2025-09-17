import comp from "/Users/bruce12138/Projects/blogs/vuepress/docs/.vuepress/.temp/pages/ml/index.html.vue"
const data = JSON.parse("{\"path\":\"/ml/\",\"title\":\"Introduction\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"ml/README.md\"}")
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
