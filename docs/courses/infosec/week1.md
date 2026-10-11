---
title: Week 1 - DLP, Pairings and the MOV Attack
contributors: false
---

# Week 1: DLP, Pairings and the MOV Attack

群的选择、配对与 MOV 攻击。原件为课程发布的英文 PDF；中文版由 LaTeX 重排，源码附在下方。

## PDFs

| | Original | 中文版 |
|---|---|---|
| Exercise | [week1-exercise.pdf](https://blog.bruce12138.com/pdf/infosec/week1-exercise.pdf) | [week1-exercise-zh.pdf](https://blog.bruce12138.com/pdf/infosec/week1-exercise-zh.pdf) |
| Solutions | [week1-solutions.pdf](https://blog.bruce12138.com/pdf/infosec/week1-solutions.pdf) | [week1-solutions-zh.pdf](https://blog.bruce12138.com/pdf/infosec/week1-solutions-zh.pdf) |

## Exercise

`week1-exercise-zh.tex`（XeLaTeX，需要 `ctex`、`mdframed`）

```latex
\documentclass[11pt,a4paper]{article}
\usepackage[UTF8]{ctex}
\usepackage{amsmath,amssymb}
\usepackage[margin=2.5cm]{geometry}
\usepackage{enumitem}
\usepackage{mdframed}

\newcommand{\F}{\mathbb{F}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\G}{\mathbb{G}}
\newcommand{\Fbar}{\overline{\F}_p}
\newcommand{\OO}{\mathcal{O}}
\newcommand{\pk}{\mathsf{pk}}

\newcounter{problem}
\newcommand{\problem}[1]{\refstepcounter{problem}\medskip\noindent\textbf{Problem \theproblem.}\ (#1)\par\nopagebreak}
\setlist[enumerate,1]{label=(\alph*),leftmargin=2em}
\setlist[description]{leftmargin=6.5em,style=sameline,font=\bfseries}

\begin{document}

\noindent
\begin{minipage}[t]{0.5\textwidth}
\textbf{Information Security Lab}\\
2026
\end{minipage}%
\begin{minipage}[t]{0.5\textwidth}
\raggedleft
\textbf{Exercise Set 1}\\
Prof.\ Kenny Paterson\\
K.\ T.\ Truong, S.-P.\ Merz, Y.\ Song
\end{minipage}

\bigskip\hrule\bigskip

\noindent\textbf{群的选择很重要。}
在讲课中，离散对数问题（DLP）是在一个由元素 $g$ 生成的、素数阶 $q$ 的任意循环群 $\G$ 中考虑的；我们用 $\G = \langle g \rangle$ 表示由 $g$ 生成的群。在那里，最好的通用（generic）算法需要 $O(\sqrt{q})$ 次群运算。在本习题集中，我们考察一些具体的群，其中 DLP 要容易得多，因为这些群具有通用算法没有利用到的额外结构。主要工具是\emph{配对}（pairing），它也是现代密码学中若干构造的基础。标有 $\star$ 的部分是留作课后完成的习题。

\begin{mdframed}
\textbf{双线性配对（Bilinear pairings）：} 设 $\G_1 = \langle P \rangle$、$\G_2 = \langle Q \rangle$ 和 $\G_T$ 是具有相同素数阶 $q$ 的循环群，前两个写成加法群，$\G_T$ 写成乘法群。一个\emph{（双线性）配对}是一个映射
\[
  e : \G_1 \times \G_2 \longrightarrow \G_T
\]
满足以下三条性质。
\begin{description}
  \item[双线性] 对所有 $P' \in \G_1$、$Q' \in \G_2$ 以及 $a, b \in \Z$，有 $e([a]P', [b]Q') = e(P', Q')^{ab}$。
  \item[非退化性] $e(P, Q) \neq 1$。
  \item[高效性] $e$ 可以在多项式时间内计算。
\end{description}
若 $\G_1 = \G_2$，则称该配对是\emph{对称的}，此时把 $\G_1 = \G_2$ 记作 $\G$。
\end{mdframed}

\medskip
对于 Problem 1 和 Problem 2，不需要了解配对是如何构造的。Problem 3 使用一个具体的配对——Weil 配对，它将在那里引入。

\problem{通用困难性 vs.\ 困难性}
\begin{enumerate}
  \item 考虑群 $(\Z_N, +)$。固定 $g \in \Z_N$ 满足 $\gcd(g, N) = 1$，并令 $h = x \cdot g \bmod N$。给出一个恢复 $x$ 的算法，并说明其代价。
  \item 每个 $N$ 阶循环群都同构于 $(\Z_N, +)$。为什么 (a) 部分并不能攻破每个 $N$ 阶循环群中的 DLP？
\end{enumerate}

\medskip
\noindent 其余的题目展示了这样一些椭圆曲线：它们的表示可以用不那么显然的方式加以利用，例如借助配对。

\problem{把配对当作黑盒}
\begin{enumerate}
  \item 设 $e : \G \times \G \to \G_T$ 是如上定义的对称配对，其中 $\G = \langle P \rangle$。给定输入 $(P, [a]P, [b]P, [c]P)$，给出 DDH 问题的一个高效判定方法，即判定是否有 $c \equiv ab \pmod{q}$。
  \item 现在设 $e : \G_1 \times \G_2 \to \G_T$ 是如上定义的一般配对（不一定对称），其中 $\G_1 = \langle P \rangle$、$\G_2 = \langle Q \rangle$。设 $R = [x]P \in \G_1$，其中 $x$ 未知。在多项式时间内构造 $\G_T$ 中 DLP 的一个实例，使其解为 $x$。这说明 $\G_1$ 中的 DLP 与 $\G_T$ 中的 DLP 在困难性上有什么关系？
  \item $\star$ 给定一个带有对称配对的群 $\G = \langle P \rangle$，设计一个一轮的三方密钥交换。也就是说，如果 Alice、Bob 和 Charlie 分别持有秘密 $a, b, c$，且每人只能广播一条消息，他们如何协商出一个共享密钥？
  \item $\star$ 设 $H : \{0,1\}^* \to \G_1$ 是一个映到 $\G_1$ 上的哈希函数。私钥为 $x$，公钥为 $\pk = [x]Q \in \G_2$，消息 $m$ 的签名为 $\sigma = [x]H(m) \in \G_1$。给出验证等式并证明其正确性。
  \item 在我们已知如何构造的所有配对中，$\G_1$ 是某个椭圆曲线群 $E(\F_p)$ 的子群，而 $\G_T$ 是 $\F_{p^k}^*$ 的子群，其中 $k \geq 1$。$\G_1$ 中 DLP 的已知最好算法是 Pollard rho 方法，需要 $O(\sqrt{q})$ 次群运算；而 $\F_{p^k}^*$ 中的 DLP 可以用数域筛法（Number Field Sieve）在亚指数时间 $L_{p^k}(1/3)$ 内求解。这里 $\F_{p^k}^*$ 是含 $p^k$ 个元素的有限域的乘法群，$k$ 称为\emph{嵌入次数}（embedding degree，定义见 Problem 3 之前），而
  \[
    L_{p^k}(1/3) = \exp\!\Bigl( c\,(\ln p^k)^{1/3} (\ln\ln p^k)^{2/3} \Bigr)
  \]
  其中 $c$ 为常数，这是一个增长慢于任何关于 $\log p^k$ 的指数函数的函数。结合 (b) 部分，如果我们想使用配对，这对参数的选择意味着什么？
\end{enumerate}

\begin{mdframed}
\textbf{Problem 3 的背景。} 设 $E$ 是 $\F_p$ 上的椭圆曲线，$q \neq p$ 为素数。$\#E(\F_p)$ 表示 $E$ 上坐标在 $\F_p$ 中的点的个数（包括 $\OO$），$\Fbar$ 表示 $\F_p$ 的代数闭包，即所有有限扩域 $\F_{p^j}$ 的并；$E(\Fbar)$ 中的点的坐标落在某个 $\F_{p^j}$ 中。以下事实可以不加证明地使用。
\begin{description}
  \item[计数] $\#E(\F_p)$ 可以在多项式时间内计算（例如 SEA 算法），并且 $\#E(\F_p)$ 通过一个闭式公式决定了每个 $k$ 对应的 $\#E(\F_{p^k})$。$E(\F_{p^k})$ 中的随机点可以高效采样。
  \item[扩域] 对每个 $k \geq 1$ 有 $E(\F_p) \subseteq E(\F_{p^k})$，加法公式相同。$\F_{p^k}^*$ 是 $p^k - 1$ 阶循环群；一个 $M$ 阶循环群有 $q$ 阶子群当且仅当 $q \mid M$。
  \item[挠点] $q$-挠（$q$-torsion）$E[q] := \{ S \in E(\Fbar) : [q]S = \OO \}$ 是一个同构于 $\Z_q \times \Z_q$ 的群，共有 $q^2$ 个点；一个 $q$ 阶点 $P \in E(\F_p)$ 只生成它的 $q+1$ 个 $q$ 阶子群中的一个。\emph{嵌入次数} $k$ 是满足 $q \mid p^k - 1$ 的最小整数。若 $q \nmid p - 1$，则 $E[q] \subseteq E(\F_{p^k})$。
  \item[Weil 配对] 存在一个映射 $e_q : E[q] \times E[q] \to \mu_q := \{ \zeta \in \Fbar : \zeta^q = 1 \}$，它是双线性的、交错的（对所有 $S$ 有 $e_q(S, S) = 1$）、非退化的，并且可以用 Miller 算法在关于 $\log p^k$ 的多项式时间内计算。
\end{description}
\end{mdframed}

\problem{MOV 攻击}
现在我们应用 Problem 2(b) 来构造针对某些椭圆曲线上 DLP 的攻击。这一攻击由 Menezes、Okamoto 和 Vanstone 提出（1991）。

设 $P \in E(\F_p)$ 是一个素数阶 $q \neq p$ 的点，且 $q \nmid p - 1$，令 $R = [x]P$，并设 $k$ 为该曲线的嵌入次数。所用的配对为 $e_q$，其中 $\G_1 = \langle P \rangle$、$\G_T = \mu_q$。
\begin{enumerate}
  \item 证明 $\mu_q \subseteq \F_{p^k}^*$，并且 $k$ 是具有这一性质的最小值。由此得出：$E[q]$ 的所有点以及所有配对值都落在 $\F_{p^k}$ 中。
  \item 固定 $T \in E[q]$，定义 $\varphi_T : \langle P \rangle \to \mu_q$，$S \mapsto e_q(S, T)$。证明 $\varphi_T$ 是群同态，并确切地判定它何时是单射。
  \item 由 (b) 部分，我们需要一个满足 $e_q(P, T) \neq 1$ 的点 $T \in E[q]$，使得 $\varphi_T$ 是单射。证明每个 $T \in \langle P \rangle$ 都是坏的选择。然后计算一个均匀随机的 $T \in E[q]$ 是坏选择的概率。
  \item 令 $N := \#E(\F_{p^k})$。解释为什么 $q^2 \mid N$。假设 $q^3 \nmid N$，并设 $T' \in E(\F_{p^k})$ 是均匀随机的。证明 $T := [N/q^2]\,T'$ 在 $E[q]$ 中均匀随机。为什么 $[N/q]\,T'$ 不行？
  \item 把 (a)--(d) 组装成一个算法：给定输入 $(E, P, R)$，把 $\langle P \rangle$ 中的 ECDLP 归约到 $\F_{p^k}^*$ 中的 DLP，然后用数域筛法求解后者。说明每一步的代价。对于 $\log_2 p = 256$ 且 $q \approx p$，$k$ 取哪些值时这比在曲线上使用 Pollard rho 更快？你可以使用如下事实：在约 $3072$ 比特的有限域中，NFS 的代价大约为 $2^{128}$ 次运算。
\end{enumerate}

\end{document}
```

## Solutions

`week1-solutions-zh.tex`（XeLaTeX，需要 `ctex`、`mdframed`）

```latex
\documentclass[11pt,a4paper]{article}
\usepackage[UTF8]{ctex}
\usepackage{amsmath,amssymb}
\usepackage[margin=2.5cm]{geometry}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{mdframed}

\newcommand{\F}{\mathbb{F}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\G}{\mathbb{G}}
\newcommand{\Fbar}{\overline{\F}_p}
\newcommand{\OO}{\mathcal{O}}
\newcommand{\pk}{\mathsf{pk}}

\newcounter{problem}
\newcommand{\problem}[1]{\refstepcounter{problem}\medskip\noindent\textbf{Problem \theproblem.}\ (#1)\par\nopagebreak}
\setlist[enumerate,1]{label=(\alph*),leftmargin=2em}
\setlist[description]{leftmargin=6.5em,style=sameline,font=\bfseries}
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
\textbf{Exercise Set 1}\\
Prof.\ Kenny Paterson\\
K.\ T.\ Truong, S.-P.\ Merz, Y.\ Song
\end{minipage}

\bigskip\hrule\bigskip

\noindent\textbf{群的选择很重要。}
在讲课中，离散对数问题（DLP）是在一个由元素 $g$ 生成的、素数阶 $q$ 的任意循环群 $\G$ 中考虑的；我们用 $\G = \langle g \rangle$ 表示由 $g$ 生成的群。在那里，最好的通用（generic）算法需要 $O(\sqrt{q})$ 次群运算。在本习题集中，我们考察一些具体的群，其中 DLP 要容易得多，因为这些群具有通用算法没有利用到的额外结构。主要工具是\emph{配对}（pairing），它也是现代密码学中若干构造的基础。标有 $\star$ 的部分是留作课后完成的习题。

\begin{mdframed}
\textbf{双线性配对（Bilinear pairings）：} 设 $\G_1 = \langle P \rangle$、$\G_2 = \langle Q \rangle$ 和 $\G_T$ 是具有相同素数阶 $q$ 的循环群，前两个写成加法群，$\G_T$ 写成乘法群。一个\emph{（双线性）配对}是一个映射
\[
  e : \G_1 \times \G_2 \longrightarrow \G_T
\]
满足以下三条性质。
\begin{description}
  \item[双线性] 对所有 $P' \in \G_1$、$Q' \in \G_2$ 以及 $a, b \in \Z$，有 $e([a]P', [b]Q') = e(P', Q')^{ab}$。
  \item[非退化性] $e(P, Q) \neq 1$。
  \item[高效性] $e$ 可以在多项式时间内计算。
\end{description}
若 $\G_1 = \G_2$，则称该配对是\emph{对称的}，此时把 $\G_1 = \G_2$ 记作 $\G$。
\end{mdframed}

\medskip
对于 Problem 1 和 Problem 2，不需要了解配对是如何构造的。Problem 3 使用一个具体的配对——Weil 配对，它将在那里引入。

\problem{通用困难性 vs.\ 困难性}
\begin{enumerate}
  \item 考虑群 $(\Z_N, +)$。固定 $g \in \Z_N$ 满足 $\gcd(g, N) = 1$，并令 $h = x \cdot g \bmod N$。给出一个恢复 $x$ 的算法，并说明其代价。
  \begin{solution}
    在这个群中，“求幂”就是映射 $x \mapsto x \cdot g$，所以 DLP 是：给定 $g$ 和 $xg \bmod N$，求 $x$。由于 $\gcd(g, N) = 1$，可以用扩展欧几里得算法计算 $g^{-1} \bmod N$，并输出 $x = h \cdot g^{-1} \bmod N$。这需要 $O(\log^2 N)$ 次比特运算，即关于 $N$ 的比特长度的多项式时间，而通用算法需要 $O(\sqrt{N})$。
  \end{solution}
  \item 每个 $N$ 阶循环群都同构于 $(\Z_N, +)$。为什么 (a) 部分并不能攻破每个 $N$ 阶循环群中的 DLP？
  \begin{solution}
    设 $\G = \langle g \rangle$ 是一个 $N$ 阶循环群。要使用 (a) 部分，就必须计算同构 $\G \to \Z_N$，而这正是 DLP 本身。映射 $\Z_N \to \G$，$x \mapsto g^x$ 是高效的（平方-乘算法），但它的逆就是离散对数映射。

    换句话说，DLP 的困难性取决于群元素如何\emph{表示}、以及群运算如何在这些表示上计算，而不取决于抽象的群。通用群模型（generic group model）通过把元素替换为随机标签来刻画这一点，于是下界 $\Omega(\sqrt{q})$ 对利用了特定表示的算法什么也没说。
  \end{solution}
\end{enumerate}

\medskip
\noindent 其余的题目展示了这样一些椭圆曲线：它们的表示可以用不那么显然的方式加以利用，例如借助配对。

\problem{把配对当作黑盒}
\begin{enumerate}
  \item 设 $e : \G \times \G \to \G_T$ 是如上定义的对称配对，其中 $\G = \langle P \rangle$。给定输入 $(P, [a]P, [b]P, [c]P)$，给出 DDH 问题的一个高效判定方法，即判定是否有 $c \equiv ab \pmod{q}$。
  \begin{solution}
    令 $g_T := e(P, P)$。由非退化性 $g_T \neq 1$，又因为 $\G_T$ 的阶为素数 $q$，所以 $g_T$ 的阶为 $q$。计算 $e([a]P, [b]P) = g_T^{ab}$ 和 $e(P, [c]P) = g_T^{c}$ 并比较；两个值相等当且仅当 $c \equiv ab \pmod{q}$。按我们的定义，两次配对求值都是高效的。

    因此，在带有高效配对的群中，判定性 Diffie--Hellman 问题在 $\G$ 中是容易的，即使 DLP 和计算性 Diffie--Hellman 问题可能是困难的：给定 $[a]P$ 和 $[b]P$，可以\emph{识别} $[ab]P$，但不一定能\emph{计算}它。具有这一性质的群称为 \emph{gap Diffie--Hellman 群}。
  \end{solution}
  \item 现在设 $e : \G_1 \times \G_2 \to \G_T$ 是如上定义的一般配对（不一定对称），其中 $\G_1 = \langle P \rangle$、$\G_2 = \langle Q \rangle$。设 $R = [x]P \in \G_1$，其中 $x$ 未知。在多项式时间内构造 $\G_T$ 中 DLP 的一个实例，使其解为 $x$。这说明 $\G_1$ 中的 DLP 与 $\G_T$ 中的 DLP 在困难性上有什么关系？
  \begin{solution}
    令 $\alpha := e(P, Q)$，$\beta := e(R, Q)$。由双线性，$\beta = e([x]P, Q) = \alpha^x$，并且像 (a) 部分一样 $\alpha$ 的阶为 $q$，所以 $(\alpha, \beta)$ 是 $\G_T$ 中的一个 DLP 实例，其解为 $x \bmod q$。因此
    \[
      \mathrm{time}(\text{DLP in } \G_1) \;\leq\; \mathrm{time}(\text{DLP in } \G_T) + \mathrm{poly},
    \]
    即 $\G_1$ 中的 DLP 至多与 $\G_T$ 中的 DLP 一样难。与 Problem 1(b) 对比，我们注意到这里从 $\G_1$ 到 $\G_T$ 的同构是可以高效计算的。
  \end{solution}
  \item $\star$ 给定一个带有对称配对的群 $\G = \langle P \rangle$，设计一个一轮的三方密钥交换。也就是说，如果 Alice、Bob 和 Charlie 分别持有秘密 $a, b, c$，且每人只能广播一条消息，他们如何协商出一个共享密钥？
  \begin{solution}
    Alice、Bob 和 Charlie 分别广播 $[a]P$、$[b]P$ 和 $[c]P$。Alice 计算 $e([b]P, [c]P)^a = e(P, P)^{abc}$，Bob 和 Charlie 类似地进行，于是三人都得到 $K = e(P, P)^{abc}$。没有配对时，三方 Diffie--Hellman 需要两轮。其底层假设是\emph{双线性 Diffie--Hellman 问题}：给定 $[a]P, [b]P, [c]P$，计算 $e(P, P)^{abc}$。
  \end{solution}
  \item $\star$ 设 $H : \{0,1\}^* \to \G_1$ 是一个映到 $\G_1$ 上的哈希函数。私钥为 $x$，公钥为 $\pk = [x]Q \in \G_2$，消息 $m$ 的签名为 $\sigma = [x]H(m) \in \G_1$。给出验证等式并证明其正确性。
  \begin{solution}
    接受当且仅当 $e(\sigma, Q) = e(H(m), \pk)$。对于正确生成的签名，
    \[
      e(\sigma, Q) = e([x]H(m), Q) = e(H(m), Q)^x = e(H(m), [x]Q) = e(H(m), \pk).
    \]
    一个签名是 $\G_1$ 的单个元素（对 BLS12-381，压缩形式为 48 字节）。此外，同一消息上的签名可以聚合，即它们的和可以用公钥的和来验证。
  \end{solution}
  \item 在我们已知如何构造的所有配对中，$\G_1$ 是某个椭圆曲线群 $E(\F_p)$ 的子群，而 $\G_T$ 是 $\F_{p^k}^*$ 的子群，其中 $k \geq 1$。$\G_1$ 中 DLP 的已知最好算法是 Pollard rho 方法，需要 $O(\sqrt{q})$ 次群运算；而 $\F_{p^k}^*$ 中的 DLP 可以用数域筛法（Number Field Sieve）在亚指数时间 $L_{p^k}(1/3)$ 内求解。这里 $\F_{p^k}^*$ 是含 $p^k$ 个元素的有限域的乘法群，$k$ 称为\emph{嵌入次数}（embedding degree，定义见 Problem 3 之前），而
  \[
    L_{p^k}(1/3) = \exp\!\Bigl( c\,(\ln p^k)^{1/3} (\ln\ln p^k)^{2/3} \Bigr)
  \]
  其中 $c$ 为常数，这是一个增长慢于任何关于 $\log p^k$ 的指数函数的函数。结合 (b) 部分，如果我们想使用配对，这对参数的选择意味着什么？
  \begin{solution}
    由 (b) 部分，$\G_1$ 中的 DLP 至多与 $\G_T \subset \F_{p^k}^*$ 中的 DLP 一样难，所以\emph{两个}群都必须是安全的。要达到 $\lambda$ 比特安全性，由于 Pollard rho，需要 $q \geq 2^{2\lambda}$；并且 $p^k$ 要足够大，使得 $\F_{p^k}$ 中的 NFS 代价约为 $2^{\lambda}$。由于 NFS 是亚指数的，域必须有几千比特大，而曲线只需要几百比特。嵌入次数 $k$ 需要小心选取：要足够小，使 $\F_{p^k}$ 中的算术足够快；又要足够大，使 $\F_{p^k}$ 中的 NFS 不可行。例如，BLS12-381（用于以太坊和 BLS 签名）有 $\log_2 p = 381$ 和 $k = 12$，所以 $\G_T \subset \F_{p^{12}}$，共 4572 比特。
  \end{solution}
\end{enumerate}

\begin{mdframed}
\textbf{Problem 3 的背景。} 设 $E$ 是 $\F_p$ 上的椭圆曲线，$q \neq p$ 为素数。$\#E(\F_p)$ 表示 $E$ 上坐标在 $\F_p$ 中的点的个数（包括 $\OO$），$\Fbar$ 表示 $\F_p$ 的代数闭包，即所有有限扩域 $\F_{p^j}$ 的并；$E(\Fbar)$ 中的点的坐标落在某个 $\F_{p^j}$ 中。以下事实可以不加证明地使用。
\begin{description}
  \item[计数] $\#E(\F_p)$ 可以在多项式时间内计算（例如 SEA 算法），并且 $\#E(\F_p)$ 通过一个闭式公式决定了每个 $k$ 对应的 $\#E(\F_{p^k})$。$E(\F_{p^k})$ 中的随机点可以高效采样。
  \item[扩域] 对每个 $k \geq 1$ 有 $E(\F_p) \subseteq E(\F_{p^k})$，加法公式相同。$\F_{p^k}^*$ 是 $p^k - 1$ 阶循环群；一个 $M$ 阶循环群有 $q$ 阶子群当且仅当 $q \mid M$。
  \item[挠点] $q$-挠（$q$-torsion）$E[q] := \{ S \in E(\Fbar) : [q]S = \OO \}$ 是一个同构于 $\Z_q \times \Z_q$ 的群，共有 $q^2$ 个点；一个 $q$ 阶点 $P \in E(\F_p)$ 只生成它的 $q+1$ 个 $q$ 阶子群中的一个。\emph{嵌入次数} $k$ 是满足 $q \mid p^k - 1$ 的最小整数。若 $q \nmid p - 1$，则 $E[q] \subseteq E(\F_{p^k})$。
  \item[Weil 配对] 存在一个映射 $e_q : E[q] \times E[q] \to \mu_q := \{ \zeta \in \Fbar : \zeta^q = 1 \}$，它是双线性的、交错的（对所有 $S$ 有 $e_q(S, S) = 1$）、非退化的，并且可以用 Miller 算法在关于 $\log p^k$ 的多项式时间内计算。
\end{description}
\end{mdframed}

\problem{MOV 攻击}
现在我们应用 Problem 2(b) 来构造针对某些椭圆曲线上 DLP 的攻击。这一攻击由 Menezes、Okamoto 和 Vanstone 提出（1991）。

设 $P \in E(\F_p)$ 是一个素数阶 $q \neq p$ 的点，且 $q \nmid p - 1$，令 $R = [x]P$，并设 $k$ 为该曲线的嵌入次数。所用的配对为 $e_q$，其中 $\G_1 = \langle P \rangle$、$\G_T = \mu_q$。
\begin{enumerate}
  \item 证明 $\mu_q \subseteq \F_{p^k}^*$，并且 $k$ 是具有这一性质的最小值。由此得出：$E[q]$ 的所有点以及所有配对值都落在 $\F_{p^k}$ 中。
  \begin{solution}
    由于 $\F_{p^k}^*$ 是 $p^k - 1$ 阶循环群，它有 $q$ 阶子群当且仅当 $q \mid p^k - 1$。这样的子群由 $q$ 个满足 $\zeta^q = 1$ 的元素 $\zeta$ 组成；由于多项式 $X^q - 1$ 在一个域中至多有 $q$ 个根，这个子群就是 $\mu_q$。因此 $\mu_q \subseteq \F_{p^k}^*$ 当且仅当 $q \mid p^k - 1$。

    反过来，如果对某个 $j$ 有 $\mu_q \subseteq \F_{p^j}^*$，则由拉格朗日定理 $q \mid p^j - 1$。所以最小的这样的 $j$ 就是嵌入次数 $k$。

    由于 $q \nmid p - 1$，背景信息让我们推出 $E[q] \subseteq E(\F_{p^k})$。于是 $e_q$ 的自变量和取值的坐标都在 $\F_{p^k}$ 中。这就是攻击进行计算所在的域，它的大小 $k \log_2 p$ 决定了代价。
  \end{solution}
  \item 固定 $T \in E[q]$，定义 $\varphi_T : \langle P \rangle \to \mu_q$，$S \mapsto e_q(S, T)$。证明 $\varphi_T$ 是群同态，并确切地判定它何时是单射。
  \begin{solution}
    由第一个自变量上的双线性，
    \[
      \varphi_T(S + S') = e_q(S + S', T) = e_q(S, T)\, e_q(S', T) = \varphi_T(S)\, \varphi_T(S'),
    \]
    所以 $\varphi_T$ 是同态。特别地，对所有 $c$ 有 $\varphi_T([c]P) = e_q(P, T)^c$。

    一个同态是单射当且仅当它的核是平凡的。$\varphi_T$ 的核是 $\langle P \rangle$ 的子群，而 $\langle P \rangle$ 是素数阶 $q$ 的群，所以由拉格朗日定理，核要么是 $\{\OO\}$，要么是 $\langle P \rangle$。它等于 $\langle P \rangle$ 当且仅当它包含生成元 $P$，即当且仅当 $e_q(P, T) = 1$。因此
    \[
      \varphi_T \text{ 是单射} \iff e_q(P, T) \neq 1 .
    \]
    Problem 2(b) 的解答中的映射就是 $\varphi_Q$。
  \end{solution}
  \item 由 (b) 部分，我们需要一个满足 $e_q(P, T) \neq 1$ 的点 $T \in E[q]$，使得 $\varphi_T$ 是单射。证明每个 $T \in \langle P \rangle$ 都是坏的选择。然后计算一个均匀随机的 $T \in E[q]$ 是坏选择的概率。
  \begin{solution}
    设 $T = [c]P \in \langle P \rangle$。由第二个自变量上的双线性以及交错性，$e_q(P, [c]P) = e_q(P, P)^c = 1$，所以 $T$ 是坏的选择。因此 $T$ 必须在 $\langle P \rangle$ 之外选取。一般来说，$E(\F_p)$ 在 $\langle P \rangle$ 之外不含 $q$ 阶点，这就是攻击要在 $E(\F_{p^k})$ 中进行的原因——在那里整个 $E[q]$ 都可用。

    对于概率，考虑 $\psi : E[q] \to \mu_q$，$T \mapsto e_q(P, T)$，由第二个自变量上的双线性，它是一个同态。它的核 $\ker \psi = \{ T \in E[q] : e_q(P, T) = 1 \}$ 恰好是坏选择的集合。
    \begin{itemize}
      \item $\psi$ 不是平凡的：否则对所有 $T \in E[q]$ 有 $e_q(P, T) = 1$，由非退化性将得到 $P = \OO$。
      \item $\psi$ 的像是 $\mu_q$ 的非平凡子群，而 $\mu_q$ 的阶为素数 $q$，所以 $\psi$ 是满射，且 $|\ker \psi| = |E[q]| / |\mu_q| = q^2 / q = q$。
      \item $\ker \psi \supseteq \langle P \rangle$，因为上面已证明对所有 $T \in \langle P \rangle$ 有 $e_q(P, T) = 1$。两个集合都有 $q$ 个元素，所以 $\ker \psi = \langle P \rangle$。
    \end{itemize}
    所以坏的选择恰好是 $\langle P \rangle$ 的点，一个均匀随机的 $T \in E[q]$ 是坏选择的概率为 $|\langle P \rangle| / |E[q]| = q / q^2 = 1/q$。坏的选择也很容易检测，因为可以高效地检查 $e_q(P, T) \neq 1$。
  \end{solution}
  \item 令 $N := \#E(\F_{p^k})$。解释为什么 $q^2 \mid N$。假设 $q^3 \nmid N$，并设 $T' \in E(\F_{p^k})$ 是均匀随机的。证明 $T := [N/q^2]\,T'$ 在 $E[q]$ 中均匀随机。为什么 $[N/q]\,T'$ 不行？
  \begin{solution}
    由 (a)，$E[q]$ 是 $E(\F_{p^k})$ 的一个含 $q^2$ 个元素的子群，所以由拉格朗日定理 $q^2 \mid N$。记 $N = q^2 m$；假设 $q^3 \nmid N$ 意味着 $\gcd(m, q) = 1$。

    注意对每个 $T'$ 都有 $[m]T' \in E[q]$，并令 $S := [m]T'$。由 (a)，$E[q] \subseteq E(\F_{p^k})$，且 $E[q]$ 有 $q^2$ 个元素（背景框）。由拉格朗日定理 $[q^2]S = [N]T' = \OO$，所以 $S$ 的阶整除 $q^2$。如果 $S$ 的阶为 $q^2$，那么由 $S$ 和 $E[q]$ 生成的子群将有 $|\langle S \rangle| \cdot |E[q]| / |\langle S \rangle \cap E[q]| = q^2 \cdot q^2 / q = q^3$ 个元素，于是由拉格朗日定理 $q^3 \mid N$，矛盾。因此 $[q]S = \OO$。

    对于均匀性，把群 $G = E(\F_{p^k})$ 分解为 $G = G_q \times G'$，其中 $G_q$ 由阶为 $q$ 的幂的元素组成，$G'$ 由阶与 $q$ 互素的元素组成，所以 $|G_q| = q^2$，$|G'| = m$。由于 $E[q] \subseteq G_q$ 且两者都有 $q^2$ 个元素，$G_q = E[q]$。因为 $m = |G'|$，乘以 $m$ 在 $G'$ 上是零映射。此外，它在 $E[q]$ 上是双射（因为 $\gcd(m, q) = 1$）。因此 $T' \mapsto [m]T'$ 是一个满射 $G \to E[q]$，核为 $G'$，$E[q]$ 的每个元素恰有 $m$ 个原像，于是均匀的 $T'$ 给出均匀的 $T \in E[q]$。

    若改为乘以 $N/q = qm$，则对每个 $T'$ 都有 $[qm]T' = [q]([m]T') = \OO$，因为 $[m]T' \in E[q]$。
  \end{solution}
  \item 把 (a)--(d) 组装成一个算法：给定输入 $(E, P, R)$，把 $\langle P \rangle$ 中的 ECDLP 归约到 $\F_{p^k}^*$ 中的 DLP，然后用数域筛法求解后者。说明每一步的代价。对于 $\log_2 p = 256$ 且 $q \approx p$，$k$ 取哪些值时这比在曲线上使用 Pollard rho 更快？你可以使用如下事实：在约 $3072$ 比特的有限域中，NFS 的代价大约为 $2^{128}$ 次运算。
  \begin{solution}
    \textbf{输入：}$E/\F_p$，素数阶 $q$ 的点 $P \in E(\F_p)$，$R = [x]P$。\textbf{输出：}$x \in \Z_q$。
    \begin{enumerate}[label=\arabic*.]
      \item 对 $j = 1, 2, \ldots$ 计算 $p^j \bmod q$，直到结果为 $1$；这个 $j$ 就是 $k$。若 $k$ 超过某个固定的界则停止。
      \item 构造 $\F_{p^k}$，并把 $P, R$ 看作 $E(\F_{p^k})$ 的点。由 $\#E(\F_p)$ 计算 $N = \#E(\F_{p^k})$，并令 $m := N/q^2$。
      \item 均匀随机地采样 $T' \in E(\F_{p^k})$，并令 $T := [m]T'$，如 (d) 中所述。
      \item 计算 $\alpha := e_q(P, T)$。若 $\alpha = 1$（由 (c)，概率为 $1/q$），回到第 3 步。
      \item 计算 $\beta := e_q(R, T)$。由双线性，$\beta = e_q(P, T)^x = \alpha^x$。
      \item 用数域筛法求解 $\F_{p^k}^*$ 中的 DLP $\beta = \alpha^x$，并输出 $x$。
    \end{enumerate}
    第 1--5 步需要关于 $\log p^k$ 的多项式时间：第 1 步至多是 $k$ 次模 $q$ 乘法，第 2 步由计数事实是多项式的，第 3 步是一次标量乘法，第 4、5 步是两次 Miller 算法求值。第 6 步占主导，所以
    \[
      \mathrm{time}(\text{MOV}) = L_{p^k}(1/3) + \mathrm{poly}(\log p^k)
      \quad\text{对比}\quad
      \mathrm{time}(\text{rho}) = O(\sqrt{q}).
    \]
    该攻击比 Pollard rho 快，当且仅当 $\F_{p^k}$ 中的 NFS 代价小于 $\sqrt{q} \approx 2^{128}$，即当且仅当 $\F_{p^k}$ 少于约 3072 比特。当 $\log_2 p = 256$ 时，这意味着 $256k < 3072$，即 $k \leq 11$。$k$ 越大，域越大，NFS 越慢，所以该攻击在 $k = 1, 2$ 时破坏性最大，而在 $k \approx 12$ 之后变得无关紧要。
  \end{solution}
\end{enumerate}

\end{document}
```

