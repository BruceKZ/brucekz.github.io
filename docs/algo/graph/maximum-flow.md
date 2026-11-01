# Maximum Flow

## Dinic's Algorithm

### Luogu P3376

[Problem](https://www.luogu.com.cn/problem/P3376) · [Submission](https://www.luogu.com.cn/record/307524845)

Given a directed network $G = (V, E)$ with $|V| = n$ and $|E| = m$, a capacity $w(e)$ for every arc $e \in E$, a source $s$ and a sink $t$, find the value of a maximum flow from $s$ to $t$. Multiple arcs are allowed.

Constraints: $1 \le n \le 200$, $1 \le m \le 5000$, $0 \le w(e) < 2^{31}$.

```cpp
constexpr ll INF = LLONG_MAX;

void solve() {
    int n, m, s, t;
    cin >> n >> m >> s >> t;

    struct Edge {
        int to;
        ll cap;
    };
    vector<Edge> edges;
    vector<vector<int> > adj(n + 1);

    auto addEdge = [&](int u, int v, ll c) {
        adj[u].push_back(edges.size());
        edges.push_back({v, c});

        adj[v].push_back(edges.size());
        edges.push_back({u, 0});
    };

    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        if (u == t or v == s) continue;
        addEdge(u, v, w);
    }

    vector<int> level(n + 1);

    auto bfs = [&]() -> bool {
        level.assign(n + 1, -1);
        queue<int> q;
        q.push(s);
        level[s] = 0;

        while (!q.empty()) {
            int u = q.front();
            q.pop();
            for (auto eid: adj[u]) {
                auto [v,c] = edges[eid];
                if (c > 0 and level[v] == -1) {
                    level[v] = level[u] + 1;
                    q.push(v);
                }
            }
        }
        return level[t] != -1;
    };

    vector<int> nxt(n + 1);
    // Find a augmenting path in the residual network
    auto dfs = [&](auto self, int u, ll limit) -> ll {
        if (u == t) {
            return limit;
        }
        ll used = 0;
        while (nxt[u] < adj[u].size()) {
            int eid = adj[u][nxt[u]];
            auto [v,c] = edges[eid];
            if (c > 0 and level[v] == level[u] + 1) {
                ll pushed = self(self, v, min(c, limit - used));
                if (pushed > 0) {
                    edges[eid].cap -= pushed;
                    edges[eid ^ 1].cap += pushed;
                    used += pushed;
                    if (used == limit) {
                        return used;
                    }
                }
            }
            nxt[u]++;
        }
        return used;
    };


    ll flow = 0;
    while (bfs()) {
        nxt.assign(n + 1, 0);
        while (ll res = dfs(dfs, s, INF)) {
            flow += res;
        }
    }

    cout << flow << "\n";
}
```
