import { CodeTabs } from "/Users/bruce12138/Projects/blogs/vuepress/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/Users/bruce12138/Projects/blogs/vuepress/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/Users/bruce12138/Projects/blogs/vuepress/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
