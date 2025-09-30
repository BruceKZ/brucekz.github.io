# Lecture5

## 1. 点覆盖

定义点覆盖问题为，给定一张含点权 $w: V\to \mathbb{R}$ 的图 $G=(V,E)$，找到一个点覆盖 $C (\forall e\in E, e\cap C\neq \emptyset)$ 使得点权和 $w(C)=\sum_{v\in C} w(v)$ 最小。

写出这个问题的线性规划为：

$$
\begin{align*}
\text{Minimize}\quad & \sum_{v\in C} x_v\,w(v)\\
\text{Subject to}\quad
& x_u + x_v \ge 1  && \forall\,\{u,v\}\in E\\
& 0 \le x_v \le 1  && \forall\,v\in V
\end{align*}
$$

断言：
对于二分图，这个点覆盖 LP 的任意极点都是整数。

证明：
//TODO，考虑假设有非整数的极点，然后推反，不一定对，回头学了再补。

## 2. 线性规划的对偶性(duality)

考虑下面的线性规划：

$$
\begin{align*}
\text{Maximize}\quad & 7x_1+3x_2\\
\text{Subject to}\quad
& x_1 + x_2 \geq 2,  && /\cdot y_1\\
& 3x_1 + x_2 \geq 4,  && /\cdot y_2 \\
& x1,x2\geq 0
\end{align*}
$$

得到了

$$
\begin{align*}
\text{Minimize}\quad & 2y_1 + 4y_2 && \text{(lower bound as tight as possible)}\\
\text{Subject to}\quad
& y_1 + 3y_2 \leq 7,  && (\text{coefficient of } x_1)\\
& y_1 + y_2 \leq 3,  && (\text{coefficient of } x_2) \\
& y1,y2\geq 0
\end{align*}
$$

### 一般情况

考虑以下具有 $n$ 个变量 $x_i(i\in[1,n])$ 和 $m$ 个限制的线性规划：

$$
\begin{align*}
\text{Minimize}\quad & \sum_{i=1}^{n} c_ix_i\\
\text{Subject to}\quad
& \sum_{i=1}^{n} A_{ji} x_i \geq b_j \quad \forall j = 1,\dots,m,\\
& x\geq 0.
\end{align*}
$$

那么它的对偶为以下具有 $m$ 个变量 $y_i(i\in[1,m])$ 和 $n$ 个限制的线性规划：

$$
\begin{align*}
\text{max}\quad & \sum_{j=1}^{m} b_jx_j\\
\text{s.t.}\quad
& \sum_{j=1}^{m} A_{ji} y_j \leq c_i \quad \forall i = 1,\dots,n,\\
& y\geq 0.
\end{align*}
$$

注
- 上面展示了如何为最小化问题生成对偶，类似的方法也适用于最大化问题。所有 max 问题都可以转化为 min 问题。我们在约束函数里面将 x 替换成 -x 从而得到了 min 问题。
- 对偶问题的对偶会回到这个LP本身。

### 对偶性定理
在例子中，原问题和对偶问题的最优解是一致的。我们现在提出两个定理以连接原始解和最优解。

**定理-弱对偶性 weak duality**:
如果 $x$ 是原始可行的 primal-feasible (指 $x$ 是原始问题的一个可行解)，且 $y$ 是对偶可行的 dual-feasible，那么
$$
\sum_{i=1}^{n}c_ix_i \geq \sum_{j=1}^{m}b_jy_j
$$

**证明（讲义）**： 

$$
\sum_{j=1}^{m}b_jy_j \leq \sum_{j=1}^{m}\sum_{i=1}^{n}A_{ji}x_iy_j = \sum_{i=1}^{n}\Big(\sum_{j=1}^mA_{ji}y_j\Big)x_i \leq \sum_{i=1}^{n} c_ix_i
$$

这个定理告诉我们，每个对偶可行解都是任何原始解的下界。原始 LP 和对偶 LP 的最优解是重合的，从而得到以下定理。

**笔者补充证明**

在这个定理中，强调了 max 问题的可行解总是不超过 min 问题的可行解。所以在这里我们定义原始 LP 为

$$
\begin{align*}
\text{min}\quad & \sum_{i=1}^{n} c_ix_i\\
\text{s.t.}\quad
& \sum_{i=1}^{n} A_{ji} x_i \geq b_j \quad \forall j = 1,\dots,m,\\
& x\geq 0.
\end{align*}
$$
由该定义，得到对偶 LP 为
$$
\begin{align*}
\text{max}\quad & \sum_{j=1}^{m} b_jy_j\\
\text{s.t.}\quad
& \sum_{j=1}^{m} A_{ji} y_j \leq c_i \quad \forall i = 1,\dots,n,\\
& y\geq 0.
\end{align*}
$$
那么 ，我们可以由式子的右侧开始
$$
\begin{align*}
因为 &\sum_{i=1}^{n} A_{ji} x_i \geq b_j \qquad\text{(来自于原始LP的限制)}\\
所以 &\sum_{j=1}^{m} b_j y_j \leq \sum_{j=1}^{m} \sum_{i=1}^{n} A_{ji} x_i y_j \quad\text{(带入)}
\end{align*}
$$
然后再交换 求和的顺序得到
$$
\sum_{j=1}^{m}\sum_{i=1}^{n}A_{ji}x_iy_j = \sum_{i=1}^{n}\Big(\sum_{j=1}^mA_{ji}y_j\Big)x_i
$$
再由对偶 LP 的限制就可以推出
$$
\sum_{i=1}^{n}\Big(\sum_{j=1}^mA_{ji}y_j\Big)x_i \leq \sum_{i=1}^{n} c_ix_i
$$
证毕。也就是用两个LP的限制互相带入得到了这么一个不等式。

**定理-强对偶性 strong duality**:
如果 $x$ 是一个原始最优解， $y$ 是一个对偶最优解，那么
$$
\sum_{i=1}^{n}c_ix_i = \sum_{j=1}^{m}b_jy_j
$$

证明略。

此外，如果原始问题无界，那么对偶问题是不可行的。同样的，如果对偶问题无界，那么原始问题不可行。

### 二分图上的最大基数匹配和顶点覆盖

设 $G=(A\cup B, E)$ 是一个二分图且 $M$ 是图的一个匹配。令 $x_e$ 为表示是否选取边 $e\in E$ 的变量。我们想要在确保每个顶点最多只有一条邻边属于 $M$ 的情况下，最大化 $M$ 的基数 (cardinality of M)。将这些条件写成线性规划为

$$
\begin{align*}
\text{Maximize}\quad & \sum_{e\in E} x_e\\
\text{Subject to}\quad
& \sum_{e=(a,b)\in E} x_e\leq 1 & \forall a\in A,\\
& \sum_{e=(a,b)\in E} x_e\leq 1 & \forall b\in B,\\
& x_e\geq 0.
\end{align*}
$$

因此对偶LP为

$$
\begin{align*}
\text{Minimize}\quad & \sum_{v\in A\cup B} y_v\\
\text{Subject to}\quad
& y_a+y_b \geq 1 \quad\text{for } (a,b)\in E\\
& y_v\geq 0.
\end{align*}
$$

容易发现这个对偶 LP 就是点覆盖问题的松弛 (relaxation，原问题是整数规划，这里将原问题的约束放松到实数解以构造线性规划)。基于弱对偶性，我们对于任意匹配 $M$ 和任意点覆盖 $C$ 有 $|M|\leq |C|$。此外，由于原问题和对偶问题在二分图中都是整数解（见上文断言），所以强对偶性证明了 König 定理。

**定理-König 1931**:
设 $M^\star$ 为一个最大基数匹配， $C^\star$ 为一个二分图最小点覆盖，那么

$$
|M^\star| = |C^\star|
$$

另一个众所周知的对偶性，也是线性规划对偶性的一个特例，是最大流最小割定理 (max-flow=min-cost theorem)。


### 互补松弛 

互补松弛：Complementarity Slackness. 强对偶性在原问题和对偶问题的最优解之间提供了一个重要的关系。

**定理**： 设 $x\in \mathbb{R}^n$ 是原问题的一个可行解，$y\in \mathbb{R}^m$ 是对偶问题的一个可行解，那么

$$
x, y \text{ 都是最优解}
\iff
\begin{cases}
x_i > 0 \;\Rightarrow\; c_i = \sum_{j=1}^m A_{ji} y_j, & \forall i=1,\dots,n, \\[1em]
y_j > 0 \;\Rightarrow\; b_j = \sum_{i=1}^n A_{ji} x_i, & \forall j=1,\dots,m.
\end{cases}
$$
两个问题的可行解 $x,y$ 同时是最优解的充要条件为：

原始变量 $x_i$ 和它对应的对偶约束 $(A^\top y)_i\geq c_i$ 至少有一侧是取等号的。要么 $x_i=0$ 要么 $c_i = \sum_{j=1}^m A_{ji} y_j$。对于对偶问题那一侧也同理。
**证明**：// TODO, 考虑由最优解推出互补松弛，再由互补松弛+可行解推出这是最优解。

