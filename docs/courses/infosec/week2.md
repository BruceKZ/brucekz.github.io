---
title: Week 2 - Schnorr Signatures, HNP and Lattices
contributors: false
---

# Week 2: Schnorr Signatures, HNP and Lattices

Schnorr 签名、隐藏数问题与格。原件为课程发布的英文 PDF；中文版由 LaTeX 重排，源码附在下方。

## PDFs

| | Original | 中文版 |
|---|---|---|
| Exercise | [week2-exercise.pdf](https://blog.bruce12138.com/pdf/infosec/week2-exercise.pdf) | [week2-exercise-zh.pdf](https://blog.bruce12138.com/pdf/infosec/week2-exercise-zh.pdf) |
| Solutions | [week2-solutions.pdf](https://blog.bruce12138.com/pdf/infosec/week2-solutions.pdf) | [week2-solutions-zh.pdf](https://blog.bruce12138.com/pdf/infosec/week2-solutions-zh.pdf) |

## Exercise

`week2-exercise-zh.tex`（XeLaTeX，需要 `ctex`、`mdframed`）

```latex
\documentclass[11pt,a4paper]{article}
\usepackage[UTF8]{ctex}
\usepackage{amsmath,amssymb}
\usepackage[margin=2.5cm]{geometry}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{mdframed}

\newcommand{\Z}{\mathbb{Z}}
\newcommand{\G}{\mathbb{G}}
\newcommand{\LL}{\mathcal{L}}
\newcommand{\PP}{\mathcal{P}}
\newcommand{\VV}{\mathcal{V}}
\newcommand{\vv}[1]{\underline{#1}}
\newcommand{\getsr}{\leftarrow\!\!{\scriptstyle\$}\;}
\newcommand{\concat}{\,\|\,}

\newcounter{problem}
\newcommand{\problem}{\refstepcounter{problem}\medskip\noindent\textbf{Problem \theproblem.}\ }
\setlist[enumerate,1]{label=(\alph*),leftmargin=2em}
\setlist[description]{leftmargin=6.5em,style=sameline,font=\bfseries}
\newenvironment{solution}{\begin{mdframed}[backgroundcolor=gray!15,topline=false,bottomline=true]\textbf{解答。}\ }{\end{mdframed}}

\begin{document}

\noindent
\begin{minipage}[t]{0.5\textwidth}
\textbf{Information Security Lab}\\
2026
\end{minipage}%
\begin{minipage}[t]{0.5\textwidth}
\raggedleft
\textbf{Exercise Set 2}\\
Prof.\ Kenny Paterson\\
K.\ T.\ Truong, S.-P.\ Merz, Y.\ Song
\end{minipage}

\bigskip\hrule\bigskip

在本习题集中，我们将介绍 Schnorr 签名方案，由于其良好的代数性质，它自 2021 年 Taproot 升级以来被用于比特币。然后我们将说明：如果给出了签名过程中所用 nonce 的信息，就可以对该签名方案进行密钥恢复攻击。我们先展示一些基于已知 nonce 和重复 nonce 的简单攻击。接着，我们把“给定若干 nonce 的最高有效位、求私钥”的问题表述为隐藏数问题（Hidden Number Problem，HNP）的一个实例，再把它归约为讲课中见过的最近向量问题（Closest Vector Problem，CVP）的一个实例。这是格在密码分析中最重要的应用之一，也是如何用讲课中的工具攻击现实世界密码方案的一个好例子。

\begin{mdframed}
\textbf{习题课的重点：} 在习题课上，我们不会讲 Problem 1，只讲其中 Part 1.c 对 Schnorr 签名方案的描述。我们建议你自己完成 Problem 1，以便理解该方案背后的逻辑，而不必把公式当作理所当然。

对于 Problem 2，我们将着重于理解攻击所需的直觉，具体是 Part 2.a、2.c、2.d、2.f 和 2.g。我们基本会跳过计算，并强烈建议你自己完成这些计算。
\end{mdframed}

\problem
在整份习题集中，设 $\G$ 是一个素数阶 $q$ 的循环群，生成元为 $P$，并假设在其中计算离散对数是困难的。我们将在椭圆曲线的点群上工作，因此对群运算采用加法记号：用 $[x]P$ 表示把 $P$ 与自身相加 $x$ 次得到的群元素。群的描述 $(\G, q, P)$ 是公开的。私钥是一个元素 $x \in \Z_q$，对应的公钥是 $X = [x]P \in \G$。

我们从一个交互式协议——\emph{Schnorr 身份识别方案}（Schnorr's Identification Scheme）——开始：持有私钥 $x$ 的证明者 $\PP$ 想让只持有公钥 $X$ 的验证者 $\VV$ 相信，它知道 $X$ 以 $P$ 为底的离散对数，而不泄露关于 $x$ 的任何其他信息。之后我们将应用一个变换把这个协议变成签名方案。该协议由以下三步交互组成：

\begin{center}
\renewcommand{\arraystretch}{1.5}
\begin{tabular}{lcl}
\textbf{证明者（Prover）} $\PP(P, X, x)$ & & \textbf{验证者（Verifier）} $\VV(P, X)$ \\
\hline
$k \getsr \Z_q$ & & \\
$R \leftarrow [k]P$ & & \\
 & $\xrightarrow{\quad R\ \text{(commitment，承诺)}\quad}$ & \\
 & & $t \getsr \Z_q$ \\
 & $\xleftarrow{\quad t\ \text{(challenge，挑战)}\quad}$ & \\
$s \leftarrow k - xt \pmod{q}$ & & \\
 & $\xrightarrow{\quad s\ \text{(response，响应)}\quad}$ & \\
 & & 接受当且仅当 $[s]P + [t]X = R$
\end{tabular}
\end{center}

\begin{enumerate}
  \item 证明该协议是\emph{完备的}（complete），即诚实的证明者总能说服验证者。
  \item 证明：如果证明者能在发送承诺 $R$ \emph{之前}预测验证者的挑战 $t$，那么它不知道私钥 $x$ 也能算出一个合法的响应 $s$。
  \item 可以证明，这个协议对诚实遵循协议的验证者不泄露关于 $x$ 的任何信息，并且一个不知道 $x$ 的作弊证明者只能以 $1/q$ 的概率说服验证者。我们在这里不证明这些性质，但它们对我们将从该协议导出的签名方案的安全性至关重要。把这个协议转换成签名方案所需要的，是使它变成\emph{非交互式的}。为此，我们使用 \emph{Fiat--Shamir 变换}。假设我们要对消息 $m$ 签名，那么我们把验证者的随机挑战 $t$ 替换为 $H(R \concat m)$。这使得签名者可以在不与验证者交互的情况下诚实地生成挑战。得到的签名方案如下。

  \begin{mdframed}
  \textbf{Schnorr 签名方案。} 如上，设 $\G$ 是素数阶 $q$ 的循环群，生成元为 $P$，并设 $H : \{0,1\}^* \to \Z_q$ 是一个哈希函数。Schnorr 签名方案定义如下：
  \begin{description}
    \item[KeyGen] 选取随机的 $x \in \Z_q$ 并计算 $X = [x]P$。公钥为 $pk = X$，私钥为 $sk = x$。
    \item[Sign] 要对消息 $m \in \{0,1\}^*$ 签名，选取随机 nonce $k \in \Z_q$ 并计算 $R = [k]P$。计算 $t = H(R \concat m)$ 和 $s = k - xt \pmod{q}$。签名为 $\sigma = (s, t)$。
    \item[Verify] 要验证消息 $m$ 上的签名 $\sigma = (s, t)$，计算 $R' = [s]P + [t]X$ 和 $t' = H(R' \concat m)$。签名合法当且仅当 $t' = t$。
  \end{description}
  \end{mdframed}

  非形式化地论证：为什么这使得方案成为非交互式的，同时保留了原协议的安全性质。
  \item 证明：如果敌手知道对消息 $m$ 签名时所用 nonce $k$ 的值，那么它可以计算出私钥 $x$（除了可忽略的概率之外）。
  \item 证明：如果签名者用同一个 nonce $k$ 对两条不同的消息 $m_1$ 和 $m_2$ 签名，那么敌手可以计算出私钥 $x$（假设不发生哈希碰撞）。
\end{enumerate}

\problem
我们现在说明：如果敌手知道 nonce $k$ 的最高有效位，那么在看到足够多的签名后，它可以计算出私钥 $x$。为简单起见，我们分析假设 $k$ 的 $L$ 个最高有效位为零的情形。\footnote{可以很容易地推广到 MSB 已知但不一定为零的情形。}设 $N = \lceil \log_2 q \rceil$ 为 $q$ 的比特长度。那么我们可以写
\[
  k = 2^{N-L-1} + \varepsilon
\]
其中 $\varepsilon$ 是一个小的误差项，即 $|\varepsilon| \leq 2^{N-L-1}$。接下来考虑签名等式：
\[
  s = k - xt \pmod{q}
\]
它可以改写为
\[
  xt = k - s = 2^{N-L-1} - s + \varepsilon \pmod{q}.
\]
令 $u = 2^{N-L-1} - s$，得到：
\[
  xt = u + \varepsilon \pmod{q}
\]
其中 $|\varepsilon|$ 很小，且 $t$ 和 $u$ 已知。换句话说，$u$ 是 $xt$ 模 $q$ 的一个“好的”近似。给定许多这样的近似来求 $x$ 的问题称为\emph{隐藏数问题}（Hidden Number Problem，HNP）。即：给定 $n$ 个对 $(t_i, u_i)$，满足 $x t_i = u_i + \varepsilon_i \pmod{q}$ 且 $|\varepsilon_i|$ 很小，求 $x$。

我们的策略是把 HNP 归约为格中最近向量问题（CVP）的一个实例，其中目标向量由公开已知的值组成，而最近向量的最后一个坐标包含私钥 $x$。

\begin{enumerate}
  \item 考虑格 $\LL_B$ 的如下基矩阵 $B$：
  \[
    B = \begin{bmatrix}
      q & 0 & 0 & \cdots & 0 & 0 \\
      0 & q & 0 & \cdots & 0 & 0 \\
      0 & 0 & q & \cdots & 0 & 0 \\
      \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
      0 & 0 & 0 & \cdots & q & 0 \\
      t_1 & t_2 & t_3 & \cdots & t_n & 1/2^{L+1}
    \end{bmatrix}
  \]
  并设 $\vv{u} = (u_1, u_2, \ldots, u_n, 0)$。证明存在 $\LL_B$ 中的向量 $\vv{v}$ 使得：
  \[
    \| \vv{u} - \vv{v} \| < \sqrt{n+1} \cdot 2^{N-L-1}.
  \]
  \textbf{提示：}令 $\vv{v} = (-\ell_1, -\ell_2, \ldots, -\ell_n, x) \cdot B$，其中每个 $\ell_i$ 是使得 $x t_i = u_i + \varepsilon_i + \ell_i q$（在 $\Z$ 上）成立的整数。
  \item 回忆讲课中的高斯启发式（Gaussian heuristic）：它断言，对于 $n'$ 维的“随机”格 $\LL$，有：
  \[
    \lambda_1 \approx \sqrt{\frac{n'}{2\pi e}} \cdot \det(\LL)^{1/n'}.
  \]
  计算 $B$ 的行列式以及对应格的 $\lambda_1$ 的期望值（在高斯启发式下）。
  \item 把 Part 2.a 中的距离 $\| \vv{u} - \vv{v} \|$ 与 Part 2.b 中 $\lambda_1$ 的期望值作比较，说明 $\vv{u}$ 和 $\vv{v}$ 异常地接近。然后，观察 $\vv{v}$ 的最后一个坐标，解释在假设我们有一个求解格 $\LL_B$ 的 CVP 的算法的情况下，如何恢复私钥 $x$。

  \textbf{提示：}验证对足够大的 $n$，有 $\| \vv{u} - \vv{v} \| < \lambda_1(\LL_B)/2$。使用近似 $x < q \approx 2^N$、$\sqrt{2\pi e} \approx 2^{2.05}$ 并取对数来处理可能会有帮助。
  \item 回忆在用 Kannan 嵌入（Kannan embedding）求解 CVP 的方法中，我们把格 $B$ 扩充为：
  \[
    B' = \begin{bmatrix} B & 0 \\ \vv{u} & M \end{bmatrix}.
  \]
  这里 $\vv{u}$ 是 CVP 的目标输入向量。设 $\vv{v}$ 是该 CVP 问题的解。格 $\LL' = \LL_{B'}$ 中的最短向量预期具有 $(\vv{f}, M)$ 的形式，其中 $\vv{f} = \vv{u} - \vv{v}$。计算 $(\vv{f}, M) \in \LL'$ 的范数的一个上界（作为 $M$ 的函数）。
  \item 计算 $B'$ 的行列式以及对应格的最短向量长度 $\lambda_1'$ 的期望值（在高斯启发式下）。
  \item 把 Part 2.e 中 $\lambda_1'$ 的估计与你在 Part 2.d 中得到的 $\| (\vv{f}, M) \|$ 的界作比较。这对于如何设置 $M$ 才能确保 Kannan 嵌入方法在这种情况下成功求解 CVP 有什么启示？
  \item 考虑 $\vv{z} = (-t_1, -t_2, -t_3, \ldots, -t_n, q, 0) \cdot B' \in \LL'$。计算 $\vv{z}$ 的范数，并把它与你在 Part 2.d 中得到的 $(\vv{f}, M)$ 的范数的界作比较，说明它通常大约小 $\sqrt{n+1}$ 倍（与 $M$ 的选取无关）。

  这道题说明 $\LL'$ 含有异常短的向量，所以对于我们在这里构造的这类特定的格，求解 SVP 未必能直接给出原 CVP 的解。

  另一方面，也许所需的解会出现在对 $B'$ 做格基约化所得到的基的\emph{其他位置}……
\end{enumerate}

\end{document}
```

## Solutions

`week2-solutions-zh.tex`（XeLaTeX，需要 `ctex`、`mdframed`）

```latex
\documentclass[11pt,a4paper]{article}
\usepackage[UTF8]{ctex}
\usepackage{amsmath,amssymb}
\usepackage[margin=2.5cm]{geometry}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{mdframed}

\newcommand{\Z}{\mathbb{Z}}
\newcommand{\G}{\mathbb{G}}
\newcommand{\LL}{\mathcal{L}}
\newcommand{\PP}{\mathcal{P}}
\newcommand{\VV}{\mathcal{V}}
\newcommand{\vv}[1]{\underline{#1}}
\newcommand{\getsr}{\leftarrow\!\!{\scriptstyle\$}\;}
\newcommand{\concat}{\,\|\,}

\newcounter{problem}
\newcommand{\problem}{\refstepcounter{problem}\medskip\noindent\textbf{Problem \theproblem.}\ }
\setlist[enumerate,1]{label=(\alph*),leftmargin=2em}
\setlist[description]{leftmargin=6.5em,style=sameline,font=\bfseries}
\newenvironment{solution}{\begin{mdframed}[backgroundcolor=gray!15,topline=false,bottomline=true]\textbf{解答。}\ }{\end{mdframed}}

\begin{document}

\noindent
\begin{minipage}[t]{0.5\textwidth}
\textbf{Information Security Lab}\\
2026
\end{minipage}%
\begin{minipage}[t]{0.5\textwidth}
\raggedleft
\textbf{Exercise Set 2}\\
Prof.\ Kenny Paterson\\
K.\ T.\ Truong, S.-P.\ Merz, Y.\ Song
\end{minipage}

\bigskip\hrule\bigskip

在本习题集中，我们将介绍 Schnorr 签名方案，由于其良好的代数性质，它自 2021 年 Taproot 升级以来被用于比特币。然后我们将说明：如果给出了签名过程中所用 nonce 的信息，就可以对该签名方案进行密钥恢复攻击。我们先展示一些基于已知 nonce 和重复 nonce 的简单攻击。接着，我们把“给定若干 nonce 的最高有效位、求私钥”的问题表述为隐藏数问题（Hidden Number Problem，HNP）的一个实例，再把它归约为讲课中见过的最近向量问题（Closest Vector Problem，CVP）的一个实例。这是格在密码分析中最重要的应用之一，也是如何用讲课中的工具攻击现实世界密码方案的一个好例子。

\begin{mdframed}
\textbf{习题课的重点：} 在习题课上，我们不会讲 Problem 1，只讲其中 Part 1.c 对 Schnorr 签名方案的描述。我们建议你自己完成 Problem 1，以便理解该方案背后的逻辑，而不必把公式当作理所当然。

对于 Problem 2，我们将着重于理解攻击所需的直觉，具体是 Part 2.a、2.c、2.d、2.f 和 2.g。我们基本会跳过计算，并强烈建议你自己完成这些计算。
\end{mdframed}

\problem
在整份习题集中，设 $\G$ 是一个素数阶 $q$ 的循环群，生成元为 $P$，并假设在其中计算离散对数是困难的。我们将在椭圆曲线的点群上工作，因此对群运算采用加法记号：用 $[x]P$ 表示把 $P$ 与自身相加 $x$ 次得到的群元素。群的描述 $(\G, q, P)$ 是公开的。私钥是一个元素 $x \in \Z_q$，对应的公钥是 $X = [x]P \in \G$。

我们从一个交互式协议——\emph{Schnorr 身份识别方案}（Schnorr's Identification Scheme）——开始：持有私钥 $x$ 的证明者 $\PP$ 想让只持有公钥 $X$ 的验证者 $\VV$ 相信，它知道 $X$ 以 $P$ 为底的离散对数，而不泄露关于 $x$ 的任何其他信息。之后我们将应用一个变换把这个协议变成签名方案。该协议由以下三步交互组成：

\begin{center}
\renewcommand{\arraystretch}{1.5}
\begin{tabular}{lcl}
\textbf{证明者（Prover）} $\PP(P, X, x)$ & & \textbf{验证者（Verifier）} $\VV(P, X)$ \\
\hline
$k \getsr \Z_q$ & & \\
$R \leftarrow [k]P$ & & \\
 & $\xrightarrow{\quad R\ \text{(commitment，承诺)}\quad}$ & \\
 & & $t \getsr \Z_q$ \\
 & $\xleftarrow{\quad t\ \text{(challenge，挑战)}\quad}$ & \\
$s \leftarrow k - xt \pmod{q}$ & & \\
 & $\xrightarrow{\quad s\ \text{(response，响应)}\quad}$ & \\
 & & 接受当且仅当 $[s]P + [t]X = R$
\end{tabular}
\end{center}

\begin{enumerate}
  \item 证明该协议是\emph{完备的}（complete），即诚实的证明者总能说服验证者。
  \begin{solution}
    诚实的证明者计算 $s = k - xt \pmod{q}$，所以验证者检查
    \[
      [s]P + [t]X = [k - xt]P + [t]([x]P) = [k - xt + xt]P = [k]P = R\,,
    \]
    并接受。
  \end{solution}
  \item 证明：如果证明者能在发送承诺 $R$ \emph{之前}预测验证者的挑战 $t$，那么它不知道私钥 $x$ 也能算出一个合法的响应 $s$。
  \begin{solution}
    如果证明者能预测 $t$，它可以选取 $s \getsr \Z_q$ 并计算 $R = [s]P + [t]X$。然后它把 $R$ 发给验证者，验证者会发回挑战 $t$。证明者随后把 $s$ 作为响应发送，验证者会接受，因为按构造有 $[s]P + [t]X = R$。
  \end{solution}
  \item 可以证明，这个协议对诚实遵循协议的验证者不泄露关于 $x$ 的任何信息，并且一个不知道 $x$ 的作弊证明者只能以 $1/q$ 的概率说服验证者。我们在这里不证明这些性质，但它们对我们将从该协议导出的签名方案的安全性至关重要。把这个协议转换成签名方案所需要的，是使它变成\emph{非交互式的}。为此，我们使用 \emph{Fiat--Shamir 变换}。假设我们要对消息 $m$ 签名，那么我们把验证者的随机挑战 $t$ 替换为 $H(R \concat m)$。这使得签名者可以在不与验证者交互的情况下诚实地生成挑战。得到的签名方案如下。

  \begin{mdframed}
  \textbf{Schnorr 签名方案。} 如上，设 $\G$ 是素数阶 $q$ 的循环群，生成元为 $P$，并设 $H : \{0,1\}^* \to \Z_q$ 是一个哈希函数。Schnorr 签名方案定义如下：
  \begin{description}
    \item[KeyGen] 选取随机的 $x \in \Z_q$ 并计算 $X = [x]P$。公钥为 $pk = X$，私钥为 $sk = x$。
    \item[Sign] 要对消息 $m \in \{0,1\}^*$ 签名，选取随机 nonce $k \in \Z_q$ 并计算 $R = [k]P$。计算 $t = H(R \concat m)$ 和 $s = k - xt \pmod{q}$。签名为 $\sigma = (s, t)$。
    \item[Verify] 要验证消息 $m$ 上的签名 $\sigma = (s, t)$，计算 $R' = [s]P + [t]X$ 和 $t' = H(R' \concat m)$。签名合法当且仅当 $t' = t$。
  \end{description}
  \end{mdframed}

  非形式化地论证：为什么这使得方案成为非交互式的，同时保留了原协议的安全性质。
  \begin{solution}
    挑战必须是签名者在选定承诺 $R$ 之前无法预测的东西。通过使用哈希函数，我们可以确保证明者必须在知道挑战之前先对 $R$ 作出承诺。加入消息 $m$ 保证了签名与消息绑定。要形式化地证明安全性，必须在\emph{随机预言机模型}（Random Oracle Model，ROM）中工作，其中哈希函数表现为一个各方都可以查询的随机函数。这也意味着挑战本质上是随机的，从而保留了原协议的安全性质。
  \end{solution}
  \item 证明：如果敌手知道对消息 $m$ 签名时所用 nonce $k$ 的值，那么它可以计算出私钥 $x$（除了可忽略的概率之外）。
  \begin{solution}
    如果敌手知道 $k$，那么由于它还从签名 $\sigma = (s, t)$ 中知道 $s$ 和 $t$，它可以计算 $x = (k - s)\,t^{-1} \pmod{q}$。直觉是：签名等式是只含一个未知数 $x$ 的线性方程，因此很容易求解。可忽略的概率来自 $t$ 可能为零这一事实，此时敌手无法计算 $x$。
  \end{solution}
  \item 证明：如果签名者用同一个 nonce $k$ 对两条不同的消息 $m_1$ 和 $m_2$ 签名，那么敌手可以计算出私钥 $x$（假设不发生哈希碰撞）。
  \begin{solution}
    设 $\sigma_1 = (s_1, t_1)$ 和 $\sigma_2 = (s_2, t_2)$ 分别是消息 $m_1$ 和 $m_2$ 上的签名。那么我们有
    \begin{align*}
      s_1 &= k - x t_1 \pmod{q} \\
      s_2 &= k - x t_2 \pmod{q}
    \end{align*}
    两式相减得到
    \[
      s_1 - s_2 = x (t_2 - t_1) \pmod{q}
    \]
    由于 $t_1 \neq t_2$（因为消息不同），我们可以解出 $x$：
    \[
      x = (s_1 - s_2)(t_2 - t_1)^{-1} \pmod{q}
    \]
    直觉是：即使敌手不知道 $k$，两个签名给出了含两个未知数 $k$ 和 $x$ 的两个线性方程，很容易求解。
  \end{solution}
\end{enumerate}

\problem
我们现在说明：如果敌手知道 nonce $k$ 的最高有效位，那么在看到足够多的签名后，它可以计算出私钥 $x$。为简单起见，我们分析假设 $k$ 的 $L$ 个最高有效位为零的情形。\footnote{可以很容易地推广到 MSB 已知但不一定为零的情形。}设 $N = \lceil \log_2 q \rceil$ 为 $q$ 的比特长度。那么我们可以写
\[
  k = 2^{N-L-1} + \varepsilon
\]
其中 $\varepsilon$ 是一个小的误差项，即 $|\varepsilon| \leq 2^{N-L-1}$。接下来考虑签名等式：
\[
  s = k - xt \pmod{q}
\]
它可以改写为
\[
  xt = k - s = 2^{N-L-1} - s + \varepsilon \pmod{q}.
\]
令 $u = 2^{N-L-1} - s$，得到：
\[
  xt = u + \varepsilon \pmod{q}
\]
其中 $|\varepsilon|$ 很小，且 $t$ 和 $u$ 已知。换句话说，$u$ 是 $xt$ 模 $q$ 的一个“好的”近似。给定许多这样的近似来求 $x$ 的问题称为\emph{隐藏数问题}（Hidden Number Problem，HNP）。即：给定 $n$ 个对 $(t_i, u_i)$，满足 $x t_i = u_i + \varepsilon_i \pmod{q}$ 且 $|\varepsilon_i|$ 很小，求 $x$。

我们的策略是把 HNP 归约为格中最近向量问题（CVP）的一个实例，其中目标向量由公开已知的值组成，而最近向量的最后一个坐标包含私钥 $x$。

\begin{enumerate}
  \item 考虑格 $\LL_B$ 的如下基矩阵 $B$：
  \[
    B = \begin{bmatrix}
      q & 0 & 0 & \cdots & 0 & 0 \\
      0 & q & 0 & \cdots & 0 & 0 \\
      0 & 0 & q & \cdots & 0 & 0 \\
      \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
      0 & 0 & 0 & \cdots & q & 0 \\
      t_1 & t_2 & t_3 & \cdots & t_n & 1/2^{L+1}
    \end{bmatrix}
  \]
  并设 $\vv{u} = (u_1, u_2, \ldots, u_n, 0)$。证明存在 $\LL_B$ 中的向量 $\vv{v}$ 使得：
  \[
    \| \vv{u} - \vv{v} \| < \sqrt{n+1} \cdot 2^{N-L-1}.
  \]
  \textbf{提示：}令 $\vv{v} = (-\ell_1, -\ell_2, \ldots, -\ell_n, x) \cdot B$，其中每个 $\ell_i$ 是使得 $x t_i = u_i + \varepsilon_i + \ell_i q$（在 $\Z$ 上）成立的整数。
  \begin{solution}
    令 $\vv{v} = (-\ell_1, -\ell_2, \ldots, -\ell_n, x) \cdot B = (u_1 + \varepsilon_1, u_2 + \varepsilon_2, \ldots, u_n + \varepsilon_n, x/2^{L+1})$。那么我们有
    \begin{align*}
      \vv{u} - \vv{v} &= (u_1, u_2, \ldots, u_n, 0) - (u_1 + \varepsilon_1, u_2 + \varepsilon_2, \ldots, u_n + \varepsilon_n, x/2^{L+1}) \\
      &= (-\varepsilon_1, -\varepsilon_2, \ldots, -\varepsilon_n, -x/2^{L+1}),
    \end{align*}
    于是
    \[
      \| \vv{u} - \vv{v} \|^2 = \sum_{i=1}^{n} \varepsilon_i^2 + (x/2^{L+1})^2 < n \cdot 2^{2(N-L-1)} + 2^{2(N-L-1)} = (n+1)\, 2^{2(N-L-1)},
    \]
    这蕴含
    \[
      \| \vv{u} - \vv{v} \| < \sqrt{n+1} \cdot 2^{N-L-1}.
    \]
  \end{solution}
  \item 回忆讲课中的高斯启发式（Gaussian heuristic）：它断言，对于 $n'$ 维的“随机”格 $\LL$，有：
  \[
    \lambda_1 \approx \sqrt{\frac{n'}{2\pi e}} \cdot \det(\LL)^{1/n'}.
  \]
  计算 $B$ 的行列式以及对应格的 $\lambda_1$ 的期望值（在高斯启发式下）。
  \begin{solution}
    该矩阵是下三角的，所以计算其行列式只需把对角线上的所有元素乘起来。
    \[
      \det(\LL_B) = q^n / 2^{L+1}
    \]
    于是 $\lambda_1$ 的期望值为：
    \[
      \lambda_1(\LL_B) \approx \sqrt{\frac{n+1}{2\pi e}}\, \det(\LL_B)^{1/(n+1)} = \sqrt{\frac{n+1}{2\pi e}}\; \frac{q^{n/(n+1)}}{2^{(L+1)/(n+1)}}
    \]
  \end{solution}
  \item 把 Part 2.a 中的距离 $\| \vv{u} - \vv{v} \|$ 与 Part 2.b 中 $\lambda_1$ 的期望值作比较，说明 $\vv{u}$ 和 $\vv{v}$ 异常地接近。然后，观察 $\vv{v}$ 的最后一个坐标，解释在假设我们有一个求解格 $\LL_B$ 的 CVP 的算法的情况下，如何恢复私钥 $x$。

  \textbf{提示：}验证对足够大的 $n$，有 $\| \vv{u} - \vv{v} \| < \lambda_1(\LL_B)/2$。使用近似 $x < q \approx 2^N$、$\sqrt{2\pi e} \approx 2^{2.05}$ 并取对数来处理可能会有帮助。
  \begin{solution}
    我们有
    \[
      \| \vv{u} - \vv{v} \| < \sqrt{n+1} \cdot 2^{N-L-1}
    \]
    以及
    \begin{align*}
      \lambda_1(\LL_B) &\approx \sqrt{\frac{n+1}{2\pi e}}\; \frac{q^{n/(n+1)}}{2^{(L+1)/(n+1)}} \\
      &\approx \sqrt{\frac{n+1}{2\pi e}} \cdot 2^{Nn/(n+1)} / 2^{(L+1)/(n+1)} \\
      &= \sqrt{\frac{n+1}{2\pi e}} \cdot 2^{(Nn-L-1)/(n+1)}.
    \end{align*}
    所以比较两者得到：
    \begin{align*}
      N - L - 1 &< (Nn - L - 1)/(n+1) - 1 - 2.05 \\
      (N - L + 2.05)(n+1) &< Nn - L - 1 \\
      n(L - 2.05) &> N + 3.05
    \end{align*}
    这个式子也精确地告诉我们，要恢复私钥 $x$ 需要看到多少个签名。代入 $N = 256$ 和 $L = 8$，得到 $n > (256 + 3.05)/(8 - 2.05) \approx 43.5$，所以我们至少需要看到 44 个签名才能恢复私钥 $x$。顺便一提，在这种情况下，恢复 $x$ 所需签名数的信息论下限是 $N/L = 32$。

    不过要注意，我们是把 $\| \vv{u} - \vv{v} \|$ 与 $\lambda_1(\LL_B)$ 的一个\emph{估计}作比较，而这个估计只对随机格和大的 $n$ 成立。在实践中，我们可能需要看到更多的签名才能恢复 $x$。

    总结：如果我们有一个求解格 $\LL_B$ 的 CVP 的算法，我们就可以期望找到离 $\vv{u}$ 最近的向量 $\vv{v}$。如果恢复出的正是预期的 $\vv{v}$，它的最后一个坐标是 $x/2^{L+1}$，由此我们可以恢复私钥 $x$。
  \end{solution}
  \item 回忆在用 Kannan 嵌入（Kannan embedding）求解 CVP 的方法中，我们把格 $B$ 扩充为：
  \[
    B' = \begin{bmatrix} B & 0 \\ \vv{u} & M \end{bmatrix}.
  \]
  这里 $\vv{u}$ 是 CVP 的目标输入向量。设 $\vv{v}$ 是该 CVP 问题的解。格 $\LL' = \LL_{B'}$ 中的最短向量预期具有 $(\vv{f}, M)$ 的形式，其中 $\vv{f} = \vv{u} - \vv{v}$。计算 $(\vv{f}, M) \in \LL'$ 的范数的一个上界（作为 $M$ 的函数）。
  \begin{solution}
    注意到 $\| (\vv{f}, M) \|^2 = \| \vv{f} \|^2 + \| M \|^2 = \| \vv{f} \|^2 + M^2$。我们已经在 Part 2.a 中计算过 $\| \vv{f} \|$：
    \[
      \| \vv{f} \| < \sqrt{n+1} \cdot 2^{N-L-1}
    \]
    因此：
    \[
      \| (\vv{f}, M) \| < \sqrt{(n+1) \cdot 2^{2(N-L-1)} + M^2}
    \]
  \end{solution}
  \item 计算 $B'$ 的行列式以及对应格的最短向量长度 $\lambda_1'$ 的期望值（在高斯启发式下）。
  \begin{solution}
    该矩阵是下三角的，所以计算其行列式只需把对角线上的所有元素乘起来。我们有 $\det(\LL_{B'}) = \det(\LL_B) \cdot M = q^n M / 2^{L+1}$。

    于是 $\lambda_1'$ 的期望值为：
    \[
      \lambda_1'(\LL_{B'}) \approx \sqrt{\frac{n+2}{2\pi e}}\, \det(\LL_{B'})^{1/(n+2)} = \sqrt{\frac{n+2}{2\pi e}}\; \frac{q^{n/(n+2)} M^{1/(n+2)}}{2^{(L+1)/(n+2)}}
    \]
  \end{solution}
  \item 把 Part 2.e 中 $\lambda_1'$ 的估计与你在 Part 2.d 中得到的 $\| (\vv{f}, M) \|$ 的界作比较。这对于如何设置 $M$ 才能确保 Kannan 嵌入方法在这种情况下成功求解 CVP 有什么启示？
  \begin{solution}
    这是一个棘手的问题！从表面上看，讲课中的引理告诉我们应取 $M = \| \vv{f} \|$。问题在于，我们只有 $\| \vv{f} \|$ 的一个（可能很松的）上界。除此之外，我们的目标是设置 $M$ 使得我们的向量 $(\vv{f}, M)$ 是格中的最短向量，也就是要显著小于 $\lambda_1'$。然而，我们对 $\lambda_1'$ 的估计（来自高斯启发式）可能不精确：高斯启发式通常在 $n$ 较大（$n \geq 45$）且格是随机格时才开始稳定地起作用。而我们的格往往很小，并且不那么随机（下一小题就是一个例子）。

    作为一般方法，列出不等式 $\| \vv{f}, M \| < \lambda_1'/2$，看看它对 $M$ 说明了什么。你会发现这个不等式并不整洁，但你可以尝试用一些 $M$ 的取值做数值计算。换句话说，对 $M$ 应取的值做出有根据的猜测，然后反复试验，直到它稳定地起作用。

    这在密码分析中是比较常见的做法：让理论引导你，但不要让它束缚你！有时你没有手段去满足理论所要求的全部条件，但更多的时候，密码分析工具的实际表现比理论预测的要好（参见 LLL 的可证明界，再与 LLL 在实践中的实际表现作比较）。

    还要记住，Kannan 嵌入相当宽容：有许多取值都可行。你可以使用任何你认为在该问题的各个实例上都能稳定起作用的值。
  \end{solution}
  \item 考虑 $\vv{z} = (-t_1, -t_2, -t_3, \ldots, -t_n, q, 0) \cdot B' \in \LL'$。计算 $\vv{z}$ 的范数，并把它与你在 Part 2.d 中得到的 $(\vv{f}, M)$ 的范数的界作比较，说明它通常大约小 $\sqrt{n+1}$ 倍（与 $M$ 的选取无关）。
  \begin{solution}
    我们有：
    \begin{align*}
      \vv{z} &= (-t_1, \ldots, -t_n, q, 0) \cdot B' \\
      &= (-t_1 \cdot q + q \cdot t_1, \ldots, -t_n \cdot q + q \cdot t_n, q/2^{L+1}, 0) \\
      &= (0, \ldots, 0, q/2^{L+1}, 0)
    \end{align*}
    这个向量的范数为 $q/2^{L+1}$。使用与 Part 2.a 中相同的近似（$x < q < 2^N$），得到 $\vv{z}$ 的范数平方的一个上界：
    \[
      \| \vv{z} \|^2 < 2^{2(N-L-1)}
    \]
    把它与 Part 2.d 中 $(\vv{f}, M)$ 的范数平方的界作比较，可以看出，如果忽略 $M$ 的值，这个界至少小 $n+1$ 倍。开平方即得结论。

    这个向量 $\vv{z}$ 的存在也提示：你未必总能从 CVP 问题的解中恢复私钥 $x$。事实上，向量 $(\vv{f}, M) \pm \vv{z}$ 也在格中，不过你仍然可能从其中任何一个恢复出 $x$……
  \end{solution}

  这道题说明 $\LL'$ 含有异常短的向量，所以对于我们在这里构造的这类特定的格，求解 SVP 未必能直接给出原 CVP 的解。

  另一方面，也许所需的解会出现在对 $B'$ 做格基约化所得到的基的\emph{其他位置}……
\end{enumerate}

\end{document}
```

