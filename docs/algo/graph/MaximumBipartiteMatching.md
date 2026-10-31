# Maximum Bipartite Matching

## Kuhn's Algorithm

### Luogu P3386

[Problem](https://www.luogu.com.cn/problem/P3386) · [Submission](https://www.luogu.com.cn/record/307056269)

```cpp
void solve() {
    int n, m, e;
    cin >> n >> m >> e;
    vector<vector<int> > adj(n + 1);
    for (int i = 0; i < e; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }
    
    vector<int> match(m + 1);
    vector<bool> vis(m + 1);
    auto dfs = [&](auto self, int u) -> bool {
        for (auto v: adj[u]) {
            if (vis[v]) continue;
            vis[v] = true;
            if (match[v] == 0 or self(self, match[v])) {
                match[v] = u;
                return true;
            }
        }
        return false;
    };

    int ans = 0;
    for (int u = 1; u <= n; u++) {
        vis.assign(m + 1, false);
        if (dfs(dfs, u)) {
            ans++;
        }
    }

    cout << ans << "\n";
}
```

### Codeforces 387D

[Problem](https://codeforces.com/contest/387/problem/D) · [Submission](https://codeforces.com/contest/387/submission/396751226)

```cpp
void solve() {
    int n, m;
    cin >> n >> m;
    vector<pair<int, int> > arc(m);
    for (int i = 0; i < m; i++) {
        cin >> arc[i].first >> arc[i].second;
    }

    int final_answer = 1e6;

    for (int i = 1; i <= n; i++) {
        int cnt1 = 2 * n - 1, cnt2 = 0;
        vector<vector<int> > adj(n + 1);
        for (auto [u,v]: arc) {
            if (u == i or v == i) {
                cnt1--;
            } else {
                cnt2++;
                adj[u].push_back(v);
            }
        }

        vector<bool> vis(n + 1);
        vector<int> match(n + 1);
        auto dfs = [&](auto self, int u)-> bool {
            for (auto v: adj[u]) {
                if (vis[v]) continue;
                vis[v] = true;
                if (match[v] == 0 or self(self, match[v])) {
                    match[v] = u;
                    return true;
                }
            }
            return false;
        };

        int ans = 0;
        for (int u = 1; u <= n; u++) {
            vis.assign(n + 1, false);
            if (dfs(dfs, u)) {
                ans++;
            }
        }

        ans = n - 1 - ans + cnt2 - ans + cnt1;
        final_answer = min(final_answer, ans);
    }

    cout << final_answer << "\n";
}
```

### Luogu P2764

[Problem](https://www.luogu.com.cn/problem/P2764) · [Submission](https://www.luogu.com.cn/record/307080443)

```cpp
void solve() {
    int n, m;
    cin >> n >> m;

    vector<vector<int> > adj(n + 1);
    for (int i = 1; i <= m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }

    vector<int> vis(n + 1);
    vector<int> match(n + 1);

    auto dfs = [&](auto self, int u)-> bool {
        for (auto v: adj[u]) {
            if (vis[v]) continue;
            vis[v] = 1;
            if (match[v] == 0 or self(self, match[v])) {
                match[v] = u;
                return true;
            }
        }
        return false;
    };

    int ans = 0;
    for (int u = 1; u <= n; u++) {
        vis.assign(n + 1, 0);
        if (dfs(dfs, u)) {
            ans++;
        }
    }

    vector<int> inv_match(n + 1);
    for (int i = 1; i <= n; i++) {
        if (match[i] != 0) {
            inv_match[match[i]] = i;
        }
    }

    int path_cnt = 0;
    for (int u = 1; u <= n; u++) {
        if (match[u] == 0) {
            cout << u << " ";
            int cur = inv_match[u];
            while (cur != 0) {
                cout << cur << " ";
                cur = inv_match[cur];
            }
            cout << "\n";
            path_cnt++;
        }
    }

    cout << path_cnt << "\n";
}
```