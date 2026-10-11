---
title: Week 3 - Coppersmith's Method
contributors: false
---

# Week 3: Coppersmith's Method

Coppersmith 方法。原件为课程发布的英文 PDF；中文版由 LaTeX 重排，源码附在下方。

## PDFs

| | Original | 中文版 |
|---|---|---|
| Exercise | [week3-exercise.pdf](https://blog.bruce12138.com/pdf/infosec/week3-exercise.pdf) | [week3-exercise-zh.pdf](https://blog.bruce12138.com/pdf/infosec/week3-exercise-zh.pdf) |
| Solutions | [week3-solutions.pdf](https://blog.bruce12138.com/pdf/infosec/week3-solutions.pdf) | [week3-solutions-zh.pdf](https://blog.bruce12138.com/pdf/infosec/week3-solutions-zh.pdf) |

## Exercise

`week3-exercise-zh.tex`（XeLaTeX，需要 `ctex`、`mdframed`）

```latex
\documentclass[11pt,a4paper]{article}
\usepackage[UTF8]{ctex}
\usepackage{amsmath,amssymb}
\usepackage[margin=2.5cm]{geometry}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{mdframed}

\newcommand{\Z}{\mathbb{Z}}
\newcommand{\LL}{\mathcal{L}}
\newcommand{\ptv}{\mathsf{poly2vec}}
\newcommand{\vtp}{\mathsf{vec2poly}}
\newcommand{\bv}{\mathbf{v}}
\newcommand{\bb}{\mathbf{b}}

\newcounter{problem}
\newcommand{\problem}[1]{\refstepcounter{problem}\medskip\noindent\textbf{Problem \theproblem\ (#1)。}\ }
\setlist[enumerate,1]{label=(\alph*),leftmargin=2em}
\newenvironment{solution}{\begin{mdframed}[backgroundcolor=gray!15,topline=false,bottomline=true]\textbf{解答。}\ }{\end{mdframed}}

\begin{document}
\sloppy

\noindent
\begin{minipage}[t]{0.5\textwidth}
\textbf{Information Security Lab}\\
2026
\end{minipage}%
\begin{minipage}[t]{0.5\textwidth}
\raggedleft
\textbf{Exercise Set 3}\\
Prof.\ Kenny Paterson\\
K.\ T.\ Truong, S.-P.\ Merz, Y.\ Song
\end{minipage}

\bigskip\hrule\bigskip

在讲课中，你已经见过用于求 $F(x) \equiv 0 \pmod{M}$ 的小根的 Coppersmith 方法：把多项式变成向量，LLL 找到一个短向量，Howgrave-Graham 定理再把它变回一个在整数上以该根为根的多项式。Problem 1 把多项式与向量之间的对应关系精确化。Problem 2 把该方法推广到模 $N$ 的一个未知因子的根，也就是讲课中引入动机的那个例子的情形：模数是未知的 $p$，而只有 $N = pq$ 可用。

\problem{多项式-向量变换}
用 $\Z[x]$ 表示整系数多项式环，并固定一个正整数 $X$。在讲课中，我们定义了一种在 $\Z[x]$ 中次数至多为 $d$ 的多项式与 $\Z^{d+1}$ 中的（行）向量之间相互转换的方式。

考虑如下函数：
\begin{align*}
  \ptv :\quad & \Z[x] \to \Z^{d+1} \\
  & a_0 + a_1 x + a_2 x^2 + \ldots + a_d x^d \mapsto [a_0, a_1 X, a_2 X^2, \ldots, a_d X^d]
\end{align*}

设 $\vtp$ 为如下运算：
\begin{align*}
  \vtp :\quad & \Z^{d+1} \to \Z[x] \\
  & [v_0, v_1, v_2, \ldots, v_d] \mapsto v_0 + \frac{v_1}{X} x + \frac{v_2}{X^2} x^2 + \ldots + \frac{v_d}{X^d} x^d
\end{align*}

\begin{enumerate}
  \item 考虑多项式 $F(x) \in \Z[x]$。证明 $\ptv(F)$ 的结果可以通过取 $F(xX)$（即多项式 $F$ 在 $x \cdot X$ 处求值）的系数向量来计算。
  \item 论证函数 $\vtp$ 是良定义的。即证明：对任何次数至多为 $d$ 的多项式 $F(x)$，有 $\vtp(\ptv(F)) = F$，并且所有运算都是良定义的。
  \item 考虑两个次数至多为 $d$ 的多项式 $F_1(x), F_2(x) \in \Z[x]$，它们有公共根 $x_0$，以及对应的向量 $\bv_i := \ptv(F_i)$，$i \in \{1, 2\}$。证明下列运算是良定义的，并且其结果是同样以 $x_0$ 为根的多项式。
  \begin{itemize}
    \item $\vtp(\ptv(F_1) + \ptv(F_2))$
    \item $\vtp(k \cdot \ptv(F_1))$，其中 $k \in \Z$
  \end{itemize}
  \item 考虑 $\Z_N$，其中 $N$ 是 RSA 模数。假设我们用 Coppersmith 方法求多项式 $F(x) \in \Z_N[x]$ 的一个小根 $x_0$。论证：应用 LLL \emph{之后}的矩阵的各行所编码的多项式，全都以 $x_0$ 为模 $N$ 的根。
\end{enumerate}

\problem{推广 Coppersmith 方法}
在讲课中你已经看到，Coppersmith 方法可以用来求多项式 $F(x)$ 模 $N$ 的小根，即使 $N$ 的分解未知。在本题中，我们说明 Coppersmith 方法也可以用来求多项式 $F(x)$ \emph{模 $N$ 的一个因子}的小根，\emph{即使我们不知道这个因子}。不过，这需要对算法稍作修改。

设 $N$ 是一个分解未知的大整数。\footnote{回忆一下，如果分解已知，就可以把问题拆分成若干子问题，每个因子对应一个。每个子问题是求模素数 $p$ 的根，这是容易的。然后可以用中国剩余定理组合出最终的解。}设 $b$ 是 $N$ 的一个未知因子，满足 $b \geq N^{\beta}$，其中 $0 < \beta \leq 1$ 是某个已知的数。\footnote{注意 $\beta = 1$ 的情形对应于讲课中已经分析过的情形。}设 $F(x) \in \Z[x]$ 是一个次数为 $d$ 的首一多项式，满足对某个 $x_0$ 有 $F(x_0) \equiv 0 \pmod{b}$，其中 $|x_0| < X$，$X \in \Z$。设 $h \geq 2$ 是一个稍后确定的整数。

考虑讲课中“Full Coppersmith 方法”的多项式序列：
\[
  G_{i,j}(x) = N^{h-1-j} F(x)^j x^i, \quad 0 \leq i < d,\ 0 \leq j < h
\]

注意所有的 $G_{i,j}(x_0) \equiv 0 \pmod{b^{h-1}}$，并且 $G_{i,j}$ 的次数为 $dj + i$。设 $\LL$ 是以 $\ptv(G_{i,j})$ 为基向量的格。注意 $\LL$ 的维数为 $dh$。\footnote{任何多项式的最大次数为 $d \cdot (h-1) + (d-1) = dh - 1$，这意味着共有 $dh - 1 + 1 = dh$ 个系数。}

\begin{enumerate}
  \item 考虑 $F(x) = x + a$。假设 $F(x_0) \equiv 0 \pmod{b}$，其中 $b \geq N^{\frac{1}{2}}$（于是 $\beta = 1/2$），且对某个 $X \in \Z$ 有 $|x_0| < X$。证明上述方法不能可证明地找到这个小根 $x_0$，即使 $h$ 取很大的值（例如 $h = 50$）。

  \emph{提示：这要求你证明不存在任何满足 Howgrave-Graham 条件的 $X$ 的取值。}
  \item 设 $t = \lfloor dh(1/\beta - 1) \rfloor$。现在考虑如下额外的多项式：
  \[
    H_i(x) = x^i F(x)^h, \quad 0 \leq i < t
  \]
  再次注意 $H_i(x_0) \equiv 0 \pmod{b^{h-1}}$。证明：对于 $h = 2$，同时包含多项式 $G_{i,j}$ 和 $H_i$，如果 $X < N^{\frac{1}{6}} / 2^{\frac{7}{6}}$，我们就能可证明地找到上述多项式的根 $x_0$。
\end{enumerate}

\end{document}
```

## Solutions

`week3-solutions-zh.tex`（XeLaTeX，需要 `ctex`、`mdframed`）

```latex
\documentclass[11pt,a4paper]{article}
\usepackage[UTF8]{ctex}
\usepackage{amsmath,amssymb}
\usepackage[margin=2.5cm]{geometry}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{mdframed}

\newcommand{\Z}{\mathbb{Z}}
\newcommand{\LL}{\mathcal{L}}
\newcommand{\ptv}{\mathsf{poly2vec}}
\newcommand{\vtp}{\mathsf{vec2poly}}
\newcommand{\bv}{\mathbf{v}}
\newcommand{\bb}{\mathbf{b}}

\newcounter{problem}
\newcommand{\problem}[1]{\refstepcounter{problem}\medskip\noindent\textbf{Problem \theproblem\ (#1)。}\ }
\setlist[enumerate,1]{label=(\alph*),leftmargin=2em}
\newenvironment{solution}{\begin{mdframed}[backgroundcolor=gray!15,topline=false,bottomline=true]\textbf{解答。}\ }{\end{mdframed}}

\begin{document}
\sloppy

\noindent
\begin{minipage}[t]{0.5\textwidth}
\textbf{Information Security Lab}\\
2026
\end{minipage}%
\begin{minipage}[t]{0.5\textwidth}
\raggedleft
\textbf{Exercise Set 3}\\
Prof.\ Kenny Paterson\\
K.\ T.\ Truong, S.-P.\ Merz, Y.\ Song
\end{minipage}

\bigskip\hrule\bigskip

在讲课中，你已经见过用于求 $F(x) \equiv 0 \pmod{M}$ 的小根的 Coppersmith 方法：把多项式变成向量，LLL 找到一个短向量，Howgrave-Graham 定理再把它变回一个在整数上以该根为根的多项式。Problem 1 把多项式与向量之间的对应关系精确化。Problem 2 把该方法推广到模 $N$ 的一个未知因子的根，也就是讲课中引入动机的那个例子的情形：模数是未知的 $p$，而只有 $N = pq$ 可用。

\problem{多项式-向量变换}
用 $\Z[x]$ 表示整系数多项式环，并固定一个正整数 $X$。在讲课中，我们定义了一种在 $\Z[x]$ 中次数至多为 $d$ 的多项式与 $\Z^{d+1}$ 中的（行）向量之间相互转换的方式。

考虑如下函数：
\begin{align*}
  \ptv :\quad & \Z[x] \to \Z^{d+1} \\
  & a_0 + a_1 x + a_2 x^2 + \ldots + a_d x^d \mapsto [a_0, a_1 X, a_2 X^2, \ldots, a_d X^d]
\end{align*}

设 $\vtp$ 为如下运算：
\begin{align*}
  \vtp :\quad & \Z^{d+1} \to \Z[x] \\
  & [v_0, v_1, v_2, \ldots, v_d] \mapsto v_0 + \frac{v_1}{X} x + \frac{v_2}{X^2} x^2 + \ldots + \frac{v_d}{X^d} x^d
\end{align*}

\begin{enumerate}
  \item 考虑多项式 $F(x) \in \Z[x]$。证明 $\ptv(F)$ 的结果可以通过取 $F(xX)$（即多项式 $F$ 在 $x \cdot X$ 处求值）的系数向量来计算。
  \begin{solution}
    设 $F(x) = a_0 + a_1 x + \cdots + a_d x^d$。那么 $F(Xx) = a_0 + a_1 Xx + a_2 (Xx)^2 + \ldots + a_d (Xx)^d$ $= a_0 + a_1 X x + a_2 X^2 x^2 + \ldots + a_d X^d x^d$，其系数向量为 $[a_0, a_1 X, \ldots, a_d X^d] = \ptv(F)$。
  \end{solution}
  \item 论证函数 $\vtp$ 是良定义的。即证明：对任何次数至多为 $d$ 的多项式 $F(x)$，有 $\vtp(\ptv(F)) = F$，并且所有运算都是良定义的。
  \begin{solution}
    由于我们是在一个环中，并非所有除法都一定是良定义的。我们首先必须证明总是可以除以 $X$。这很容易看出，因为 $\ptv$ 的结果是 $[v_0, v_1, \ldots, v_d]$ $= [a_0, a_1 X, \ldots, a_d X^d]$，这意味着 $v_i$ 总是能被 $X^i$ 整除。要证明 $\vtp$ 是 $\ptv$ 的逆运算，只需注意到后者把 $x^i$ 的系数乘以 $X^i$ 并把结果收集成一个向量，而 $\vtp$ 又把第 $i$ 个分量除以 $X^i$，即做的恰好是相反的运算。
  \end{solution}
  \item 考虑两个次数至多为 $d$ 的多项式 $F_1(x), F_2(x) \in \Z[x]$，它们有公共根 $x_0$，以及对应的向量 $\bv_i := \ptv(F_i)$，$i \in \{1, 2\}$。证明下列运算是良定义的，并且其结果是同样以 $x_0$ 为根的多项式。
  \begin{solution}
    我们先定义通用的记号。设 $F_1 = \displaystyle\sum_{i=0}^{d} a_i x^i$，$F_2 = \displaystyle\sum_{i=0}^{d} b_i x^i$。我们约定，如果某个多项式的次数为 $d' < d$，则下标在 $\{d'+1, \ldots, d\}$ 中的所有系数都为 $0$。那么：
    \[
      \ptv(F_1) = [a_0, a_1 X, \ldots, a_d X^d]
    \]
    \[
      \ptv(F_2) = [b_0, b_1 X, \ldots, b_d X^d]
    \]
  \end{solution}
  \begin{itemize}
    \item $\vtp(\ptv(F_1) + \ptv(F_2))$
    \begin{solution}
      \[
        \ptv(F_1) + \ptv(F_2) = [a_0 + b_0, (a_1 + b_1) X, \ldots, (a_d + b_d) X^d]
      \]
      后者对应一个新的多项式 $F_{\mathsf{sum}}(x) = (a_0 + b_0) + (a_1 + b_1) x + \ldots + (a_d + b_d) x^d = (F_1 + F_2)(x)$。因此，这个变换就是把两个多项式相加。我们知道，如果 $F_1$ 和 $F_2$ 有公共根 $x_0$，那么它们的和也以它为根：$F_1(x_0) = 0 \wedge F_2(x_0) = 0 \Rightarrow F_1(x_0) + F_2(x_0) = (F_1 + F_2)(x_0) = 0$。
    \end{solution}
    \item $\vtp(k \cdot \ptv(F_1))$，其中 $k \in \Z$
    \begin{solution}
      \[
        k \cdot \ptv(F_1) = [k \cdot a_0, k \cdot a_1 X, \ldots, k \cdot a_d X^d]
      \]
      \[
        \vtp(k \cdot \ptv(F_1)) = k a_0 + k a_1 x + \ldots + k a_d x^d = k \cdot F_1(x)
      \]
      若 $F_1(x_0) = 0$，则 $k \cdot F_1(x_0) = 0$。
    \end{solution}
  \end{itemize}
  \item 考虑 $\Z_N$，其中 $N$ 是 RSA 模数。假设我们用 Coppersmith 方法求多项式 $F(x) \in \Z_N[x]$ 的一个小根 $x_0$。论证：应用 LLL \emph{之后}的矩阵的各行所编码的多项式，全都以 $x_0$ 为模 $N$ 的根。
  \begin{solution}
    第一步是把 $F(x)$ 看作 $\Z[x]$ 中的多项式，而不是 $\Z_N[x]$ 中的多项式。回忆 $\Z_N$ 的所有元素都是模 $N$ 的等价类。每个等价类是所有模 $N$ 彼此等价的数的集合，例如 $[3] = \{3, 3+N, 3-N, 3+2N, \ldots\} \subset \Z$。把多项式投射到 $\Z[x]$ 的自然方式是把每个系数 $[k] \in \Z_N$ 映到它的最小非负代表元 $k \in \Z$。

    接下来，回忆 Coppersmith 方法首先构造一组全都以 $x_0$ 为模 $N$ 的根的多项式，然后把每个多项式转换成向量。这些向量构成格 $\LL$ 的基矩阵 $B$ 的各行。然后，当对 $B$ 应用 LLL 时，它只会做初等行变换。由上一小题，这些运算产生的向量在转换回 $\Z[x]$ 中的多项式后，保持 $x_0$ 是模 $N$ 的根。只有对足够短的向量，Howgrave-Graham 定理才把它变成整数上的根。
  \end{solution}
\end{enumerate}

\problem{推广 Coppersmith 方法}
在讲课中你已经看到，Coppersmith 方法可以用来求多项式 $F(x)$ 模 $N$ 的小根，即使 $N$ 的分解未知。在本题中，我们说明 Coppersmith 方法也可以用来求多项式 $F(x)$ \emph{模 $N$ 的一个因子}的小根，\emph{即使我们不知道这个因子}。不过，这需要对算法稍作修改。

设 $N$ 是一个分解未知的大整数。\footnote{回忆一下，如果分解已知，就可以把问题拆分成若干子问题，每个因子对应一个。每个子问题是求模素数 $p$ 的根，这是容易的。然后可以用中国剩余定理组合出最终的解。}设 $b$ 是 $N$ 的一个未知因子，满足 $b \geq N^{\beta}$，其中 $0 < \beta \leq 1$ 是某个已知的数。\footnote{注意 $\beta = 1$ 的情形对应于讲课中已经分析过的情形。}设 $F(x) \in \Z[x]$ 是一个次数为 $d$ 的首一多项式，满足对某个 $x_0$ 有 $F(x_0) \equiv 0 \pmod{b}$，其中 $|x_0| < X$，$X \in \Z$。设 $h \geq 2$ 是一个稍后确定的整数。

考虑讲课中“Full Coppersmith 方法”的多项式序列：
\[
  G_{i,j}(x) = N^{h-1-j} F(x)^j x^i, \quad 0 \leq i < d,\ 0 \leq j < h
\]

注意所有的 $G_{i,j}(x_0) \equiv 0 \pmod{b^{h-1}}$，并且 $G_{i,j}$ 的次数为 $dj + i$。设 $\LL$ 是以 $\ptv(G_{i,j})$ 为基向量的格。注意 $\LL$ 的维数为 $dh$。\footnote{任何多项式的最大次数为 $d \cdot (h-1) + (d-1) = dh - 1$，这意味着共有 $dh - 1 + 1 = dh$ 个系数。}

\begin{enumerate}
  \item 考虑 $F(x) = x + a$。假设 $F(x_0) \equiv 0 \pmod{b}$，其中 $b \geq N^{\frac{1}{2}}$（于是 $\beta = 1/2$），且对某个 $X \in \Z$ 有 $|x_0| < X$。证明上述方法不能可证明地找到这个小根 $x_0$，即使 $h$ 取很大的值（例如 $h = 50$）。

  \emph{提示：这要求你证明不存在任何满足 Howgrave-Graham 条件的 $X$ 的取值。}
  \begin{solution}
    我们按上述方式构造矩阵。注意 $F$ 的次数为 $d = 1$。这些多项式都具有如下形式：
    \[
      G_j(x) = N^{h-1-j} (x + a)^j, \quad 0 \leq j < h
    \]
    它们导出如下基矩阵（我们省略对角线以下的所有项）：
    \[
      B = \begin{bmatrix}
        N^{h-1} & 0 & 0 & 0 & \ldots & 0 & 0 \\
        - & N^{h-2} X & 0 & 0 & \ldots & 0 & 0 \\
        - & - & N^{h-3} X^2 & 0 & \ldots & 0 & 0 \\
        \vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
        - & - & - & - & - & N X^{h-2} & 0 \\
        - & - & - & - & - & - & X^{h-1}
      \end{bmatrix}
    \]
    对应的格 $\LL$（维数为 $n = h$）的行列式为 $\det(\LL) = (NX)^{(h-1) + \ldots + 1} = (NX)^{h(h-1)/2}$。由 LLL 的保证，基约化之后，基的第一个向量 $\bb_1$ 的长度至多为：
    \[
      \| \bb_1 \| \leq 2^{(n-1)/4} \det(\LL)^{1/n} = 2^{(h-1)/4} (NX)^{h(h-1)/(2h)} = 2^{(h-1)/4} (NX)^{(h-1)/2}
    \]
    为了有一个有保证的解，我们需要这个向量满足 Howgrave-Graham 条件。因为所有的 $G_{i,j}(x_0) \equiv 0 \pmod{b^{h-1}}$，所以约化基中的向量所对应的任何多项式也在 $x_0$ 处模 $b^{h-1}$ 为零，于是我们需要 $\| \bb_1 \| < b^{h-1} / \sqrt{dh}$。由于 $b$ 未知，我们唯一能用的是 $b \geq N^{\beta}$，所以我们实际能保证的条件是
    \[
      2^{(h-1)/4} (NX)^{(h-1)/2} < \frac{(N^{\beta})^{h-1}}{\sqrt{h}} = \frac{N^{\frac{h-1}{2}}}{\sqrt{h}} \leq \frac{b^{h-1}}{\sqrt{dh}}
    \]
    而这又要求：
    \[
      X < \frac{1}{\sqrt{2} \cdot h^{1/(h-1)}} < 1
    \]
    因为对每个 $h \geq 2$ 都有 $h^{-1/(h-1)} \leq 1$。由于 $X$ 是正整数，这个上界对 $h$ 的每种选取都太小，不允许 $X$ 取任何值。
  \end{solution}
  \item 设 $t = \lfloor dh(1/\beta - 1) \rfloor$。现在考虑如下额外的多项式：
  \[
    H_i(x) = x^i F(x)^h, \quad 0 \leq i < t
  \]
  再次注意 $H_i(x_0) \equiv 0 \pmod{b^{h-1}}$。证明：对于 $h = 2$，同时包含多项式 $G_{i,j}$ 和 $H_i$，如果 $X < N^{\frac{1}{6}} / 2^{\frac{7}{6}}$，我们就能可证明地找到上述多项式的根 $x_0$。
  \begin{solution}
    代入 $d = 1$、$h = 2$ 和 $\beta = 1/2$，得到 $t = 2$。注意第 $i$ 个多项式 $H_i$ 的次数为 $dh + i$。加入这两个多项式给出如下矩阵：
    \[
      B = \left[\begin{array}{cccc}
        N & 0 & 0 & 0 \\
        - & X & 0 & 0 \\ \hline
        - & - & X^2 & 0 \\
        - & - & - & X^3
      \end{array}\right]
    \]
    对应的格 $\LL$ 的维数为 $n = dh + t = 4$，行列式为 $\det(\LL) = N \cdot X^6$。

    同样，由 LLL 的保证，基约化之后，基的第一个向量 $\bb_1$ 的长度至多为：
    \[
      \| \bb_1 \| \leq 2^{(n-1)/4} \det(\LL)^{1/n} = 2^{3/4} N^{1/4} X^{6/4}
    \]
    我们希望这个向量满足模数为 $b^{h-1}$ 的 Howgrave-Graham 条件。利用 $b \geq N^{\beta}$，只需
    \[
      2^{3/4} N^{1/4} X^{6/4} < \frac{(N^{\beta})^{h-1}}{\sqrt{dh + t}} = \frac{N^{\frac{1}{2}}}{\sqrt{4}} = \frac{N^{\frac{1}{2}}}{2} \leq \frac{b^{h-1}}{\sqrt{dh + t}}
    \]
    而这又蕴含：
    \[
      X < \frac{N^{\frac{1}{6}}}{2^{\frac{7}{6}}}
    \]
    具体地，对于 1024 比特的模数 $N$，这使我们能够恢复至多约 169 比特的根。

    抛开具体数字，有两种通用的方法可以改进 Coppersmith 方法的性能（即增大 $X$ 的可能取值）。

    第一种是增大格的维数，这是通过加入更多像上面 $H_i$ 这样的多项式来实现的。这些多项式称为 $x$-shift 多项式，它们增大了格的维数，而没有显著增大行列式。第二种方法是增大 Howgrave-Graham 条件中的模数。这是通过使用 $F(x)$ 的更高次幂来实现的，因为如果 $F(x_0) \equiv 0 \pmod{b}$，那么 $F(x_0)^k \equiv 0 \pmod{b^k}$。这正是原来的多项式 $G_{i,j}$ 所做的事情。
  \end{solution}
\end{enumerate}

\end{document}
```

