# Lecture 6

## 回顾
- [LP 的对偶性](https://blog.daiz.cc/algo2/Lecture5.html#_2-%E7%BA%BF%E6%80%A7%E8%A7%84%E5%88%92%E7%9A%84%E5%AF%B9%E5%81%B6%E6%80%A7-duality)
- [Weak Duality](https://blog.daiz.cc/algo2/Lecture5.html#%E5%AF%B9%E5%81%B6%E6%80%A7%E5%AE%9A%E7%90%86)
- [String Duality](https://blog.daiz.cc/algo2/Lecture5.html#%E5%AF%B9%E5%81%B6%E6%80%A7%E5%AE%9A%E7%90%86)
- [Complementarity slackness](https://blog.daiz.cc/algo2/Lecture5.html#%E4%BA%92%E8%A1%A5%E6%9D%BE%E5%BC%9B)

## 最小费用完美匹配的对偶性与互补松弛性
Duality and Complementarity Slackness of Min-Cost Perfect Matching

### 定义

令 $G=(A\cup B, E)$ 是带有边权 $c: E\to \mathbb{R}$ 的二分图。我们想要找到一个有最小费用 $\sum_{e\in M}c_e$ 的完美匹配 $M$。

令 $x_e$ 为表示是否选了边 $e$ 的变量，$x_e=1$ 表示边 $e$ 在匹配中，$x_e=0$ 表示边 $e$ 不在匹配中。 在一个完美匹配中，每一个点恰有一条邻边。于是我们可以写出这个问题的线性规划：

$$
\begin{align*}
\text{Minimize}\quad & \sum_{e\in E} x_ec_e\\
\text{Subject to}\quad
& \sum_{a\in A:(a,b)\in E} x_{ab} = 1 &&\forall a\in A\\
& \sum_{b\in B:(a,b)\in E} x_{ab} = 1 &&\forall b\in B\\
& x_e \geq 0&& \forall e\in E
\end{align*}
$$

在之前的笔记中，已经证明了这样的线性规划的极点是整数解。所以我们可以通过求解上述线性规划来求解最小费用问题。

### 对偶











