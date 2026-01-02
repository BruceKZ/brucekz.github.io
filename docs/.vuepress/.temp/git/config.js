import { GitContributors } from "/Users/bruce12138/Projects/blogs/vuepress/.yarn/__virtual__/@vuepress-plugin-git-virtual-6a130cefe7/4/.yarn/berry/cache/@vuepress-plugin-git-npm-2.0.0-rc.112-2a3ed949da-10c0.zip/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "/Users/bruce12138/Projects/blogs/vuepress/.yarn/__virtual__/@vuepress-plugin-git-virtual-6a130cefe7/4/.yarn/berry/cache/@vuepress-plugin-git-npm-2.0.0-rc.112-2a3ed949da-10c0.zip/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
