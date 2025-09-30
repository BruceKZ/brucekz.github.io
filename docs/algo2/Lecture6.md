# Lecture 6

## 回顾

- [LP 的对偶性](https://blog.daiz.cc/algo2/Lecture5.html#_2-%E7%BA%BF%E6%80%A7%E8%A7%84%E5%88%92%E7%9A%84%E5%AF%B9%E5%81%B6%E6%80%A7-duality)
- [Weak Duality](https://blog.daiz.cc/algo2/Lecture5.html#%E5%AF%B9%E5%81%B6%E6%80%A7%E5%AE%9A%E7%90%86)
- [String Duality](https://blog.daiz.cc/algo2/Lecture5.html#%E5%AF%B9%E5%81%B6%E6%80%A7%E5%AE%9A%E7%90%86)
- [Complementarity slackness](https://blog.daiz.cc/algo2/Lecture5.html#%E4%BA%92%E8%A1%A5%E6%9D%BE%E5%BC%9B)

## 最小费用完美匹配的对偶性与互补松弛性

Duality and Complementarity Slackness of Min-Cost Perfect Matching

### 定义

令 $G=(A\cup B, E)$ 是带有边权 $c: E\to \mathbb{R}$ 的二分图。我们想要找到一个有最小费用 $\sum_{e\in M}c_e$
的完美匹配 $M$。

令 $x_e$ 为表示是否选了边 $e$ 的变量，$x_e=1$ 表示边 $e$ 在匹配中，$x_e=0$ 表示边 $e$ 不在匹配中。
在一个完美匹配中，每一个点恰有一条邻边。于是我们可以写出这个问题的线性规划：

$$
\begin{align*}
\text{Minimize}\quad & \sum_{e\in E} x_ec_e\\
\text{Subject to:}\quad
& \sum_{b\in B:(a,b)\in E} x_{ab} = 1 &&\forall a\in A\\
& \sum_{a\in A:(a,b)\in E} x_{ab} = 1 &&\forall b\in B\\
& x_e \geq 0&& \forall e\in E
\end{align*}
$$

在之前的笔记中，已经证明了这样的线性规划的极点是整数解。所以我们可以通过求解上述线性规划来求解最小费用问题。

### 对偶

为了取得上述 LP 的对偶，我们首先将它写成之前常见的不等式形式。对于每个等式，我们考虑用两个不等式来替换它，这样仍然只有交点（等于的情况）满足条件。于是我们可以得到以下等价的线性规划：

$$
\begin{align*}
\text{Minimize}\quad & \sum_{e\in E} x_ec_e\\
\text{Subject to:}\quad
& \sum_{b\in B:(a,b)\in E} x_{ab} \geq 1 &&\forall a\in A\\
& \sum_{b\in B:(a,b)\in E} x_{ab} \leq 1 &&\forall a\in A\\
& \sum_{a\in A:(a,b)\in E} x_{ab} \geq 1 &&\forall b\in B\\
& \sum_{a\in A:(a,b)\in E} x_{ab} \leq 1 &&\forall b\in B\\
& x_e \geq 0&& \forall e\in E
\end{align*}
$$

适当调整符号得到

$$
\begin{align*}
\text{Minimize}\quad & \sum_{e\in E} x_ec_e\\
\text{Subject to:}\quad
& \sum_{b\in B:(a,b)\in E} x_{ab} \geq 1 &&\forall a\in A\\
& - \sum_{b\in B:(a,b)\in E} x_{ab} \geq -1 &&\forall a\in A\\
& \sum_{b\in B:(a,b)\in E} x_{ab} \geq 1 &&\forall b\in B\\
& - \sum_{a\in A:(a,b)\in E} x_{ab} \geq -1 &&\forall b\in B\\
& x_e \geq 0&& \forall e\in E
\end{align*}
$$

对于每个 $a\in A$，我们将一个变量 $u_a^+$ 关联到 $a$ 的第一个约束 $\big(\sum_{b\in B:(a,b)\in E} x_{ab} \geq 1)$
上，将变量 $u_a^-$ 关联到 $a$ 的第二个约束 $\big(- \sum_{b\in B:(a,b)\in E} x_{ab} \geq -1)$ 上。同样地，我们有 $v_b^+$
和 $v_b^-$。

所以我们现在有了对偶 LP

$$
\begin{align*}
\text{Maximize}\quad
&\sum_{a\in A}(u_a^+ - u_a^-) + \sum_{b\in B}(v_b^+-v_b^-)\\
\text{Subject to:}\quad
&(u_a^+-u_a^-) + (v_b^+-v_b^-) \leq c(e) &&\forall e=(a,b)\in E\\
&u_a^+,u_a^-,v_b^+,v_b^-\geq 0 &&\forall a\in A,b\in B
\end{align*}
$$

**笔者注**：这部分推广得太快了。学习的时候很难理解这个关联(原文为associate)的意思，所以打算更仔细地写一下。



### 互补松弛
Complementarity Slackness 告诉我们如果 $x,(u^+,u^-,v^+,v^-)$ 是可行解，那么当且仅当下面条件成立的时候，它们是最优的。
$$
\begin{align*}
x_e>0     &\;\;\Rightarrow\;\; & (u_a^+-u_a^-) + (v_b^+-v_b^-) & = c(e) && \forall e=(a,b)\in E\\
u_a^+>0   &\;\;\Rightarrow\;\; & \sum_{b\in B:(a,b)\in E} x_{ab} & = 1   && \forall a\in A \\
u_a^->0   &\;\;\Rightarrow\;\; & - \sum_{b\in B:(a,b)\in E} x_{ab} & = -1 && \forall a\in A\\
v_b^+>0   &\;\;\Rightarrow\;\; & \sum_{a\in A:(a,b)\in E} x_{ab} & = 1   && \forall b\in B\\
v_b^->0   &\;\;\Rightarrow\;\; & -\sum_{a\in A:(a,b)\in E} x_{ab} & = -1 && \forall b\in B
\end{align*}
$$

### 简化符号
我们用 $u_a$ 代替 $(u_a^+-u_a^-)$，用 $v_b$ 代替 $(v_b^+-v_b^-)$。

原始线性规划：

$$
\begin{align*}
\text{Minimize}\quad & \sum_{e\in E} x_ec_e\\
\text{Subject to:}\quad
& \sum_{b\in B:(a,b)\in E} x_{ab} = 1 &&\forall a\in A\\
& \sum_{a\in A:(a,b)\in E} x_{ab} = 1 &&\forall b\in B\\
& x_e \geq 0&& \forall e\in E
\end{align*}
$$

对偶线性规划：

$$
\begin{align*}
\text{Maximize}\quad &  \sum_{a\in A} u_a + \sum_{b\in B}v_b\\
\text{Subject to:}\quad
& u_a+v_b \leq c(e) &&\forall e=(a,b)\in E
\end{align*}
$$

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/

/



