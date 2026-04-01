# Lecture 6

Lecture 6: Reductions

[Lecture 6 Slides](https://blog.bruce12138.com/pdf/toc/Lecture6.pdf)

## 为什么需要归约

到了这一讲，课程已经有了若干已知难题：

* $A_{TM}$ 不可判定
* $HALT$ 不可判定
* $\overline{A_{TM}}$、$\overline{HALT}$ 中至少有一些是不可识别的

问题是：  
每次都重新发明一个“自指 + 对角化”证明，非常费劲，也很不工程化。

**归约 (reduction)** 的作用就是：

* 把一个已经知道困难的问题 $A$
* 机械地翻译成另一个问题 $B$
* 从而说明：如果 $B$ 容易，那么 $A$ 也会变容易

因此，证明新问题困难，本质上是在做**难度传递**。

---

## 直觉：把问题翻译成另一个问题

设你已经知道某个问题 $A$ 很难。  
如果存在一个计算过程 $f$，把任意输入 $w$ 变成新输入 $f(w)$，并且满足：

* $w \in A$ 当且仅当 $f(w) \in B$

那么只要有人能解 $B$，你就能先算 $f(w)$ 再解 $B$，从而顺便解掉 $A$。

所以：

* 若 $A$ 已知不可判定，而 $A \le_m B$
* 那么 $B$ 也不可能可判定

这就是 reduction 证明的核心逻辑。

---

## Mapping Reduction 的正式定义

语言 $A$ **mapping reducible** 到语言 $B$，记作

$$
A \le_m B
$$

如果存在一个**可计算函数**

$$
f : \Sigma^* \to \Sigma^*
$$

使得对所有字符串 $w$，都有

$$
w \in A \iff f(w) \in B
$$

这一定义里有两个不可少的部分：

### 1. Computability

$f$ 本身必须能被某台图灵机算出来，而且对每个输入都停机。

### 2. Correctness

成员资格必须被严格保留：

* `yes` 输入映到 `yes`
* `no` 输入映到 `no`

很多错误证明的问题就在这里：

* 只说明了“正例会变正例”
* 却没说明“反例一定变反例”

那不构成 mapping reduction。

---

## Reduction 的基本定理

### 从 decidable 方向传递

如果

$$
A \le_m B
$$

且 $B$ 可判定，那么 $A$ 可判定。

证明套路很直接：

1. 输入 $w$
2. 先计算 $f(w)$
3. 再调用 $B$ 的 decider
4. 输出相同结论

于是立刻得到逆否命题：

> 若 $A \le_m B$ 且 $A$ 不可判定，则 $B$ 不可判定。

### 从 recognizable 方向传递

如果 $A \le_m B$ 且 $B$ 可识别，那么 $A$ 可识别。

同理可得逆否命题：

> 若 $A \le_m B$ 且 $A$ 不可识别，则 $B$ 不可识别。

这两条逆否命题是实际做题时最常用的版本。

---

## 证明 reduction 时的标准模板

写证明时建议机械地分成两部分：

### Part 1: 说明 $f$ 可计算

也就是解释：

* 输入是怎么被改写的
* 新机器的编码如何构造
* 这个构造过程本身为什么是有限步骤可完成的

一个高频提醒是：

* 构造 $M'$ 的编码，不等于真的运行 $M'$

你只是在“写出程序”，不是“执行程序”。

### Part 2: 证明正确性

分别证明：

* 若 $w \in A$，则 $f(w) \in B$
* 若 $w \notin A$，则 $f(w) \notin B$

最好严格按双向蕴含写，不要只写直觉。

---

## 例 1：$A_{TM} \le_m HALT_{TM}$

目标是把“是否接受”翻译成“是否停机”。

给定输入 $\langle M, w \rangle$，构造机器 $M'$：

1. 忽略自己的真实输入 $y$
2. 运行 $M(w)$
3. 如果 $M$ 接受 $w$，则 $M'$ 停机接受
4. 如果 $M$ 拒绝 $w$ 或无限循环，则让 $M'$ 无限循环

于是：

* 若 $\langle M, w \rangle \in A_{TM}$，则 $M'$ 在任意输入上都会停机
* 若 $\langle M, w \rangle \notin A_{TM}$，则 $M'$ 不会停机

因此

$$
A_{TM} \le_m HALT_{TM}
$$

因为 $A_{TM}$ 不可判定，所以 $HALT_{TM}$ 也不可判定。

这说明：  
**停机问题至少和接受问题一样难。**

---

## 例 2：$A_{TM} \le_m REG_{TM}$

定义

$$
REG_{TM} = \{\langle N \rangle \mid L(N) \text{ 是正则语言}\}
$$

这是一个非常经典的 reduction。

给定 $\langle M, w \rangle$，构造机器 $M'$：

1. 输入一个字符串 $y$
2. 若 $y \in B = \{0^n1^n \mid n \ge 0\}$，立刻接受
3. 同时模拟 $M(w)$
4. 如果 $M$ 接受 $w$，则对所有 $y$ 都接受

于是：

* 若 $M$ 接受 $w$，则 $L(M') = \Sigma^*$，这是正则语言
* 若 $M$ 不接受 $w$，则 $L(M') = \{0^n1^n \mid n \ge 0\}$，这是非正则语言

因此：

$$
A_{TM} \le_m REG_{TM}
$$

从而 $REG_{TM}$ 不可判定。

这个构造的思想很重要：  
**把难问题的答案“嵌进”目标机器的语言形状里。**

---

## 例 3：$\overline{A_{TM}} \le_m EQ_{TM}$

定义

$$
EQ_{TM} = \{\langle M_1, M_2 \rangle \mid L(M_1) = L(M_2)\}
$$

为了证明它不可识别，常从 $\overline{A_{TM}}$ 归约。

给定 $\langle M, w \rangle$，构造两台机器：

* $M_1$：忽略输入 $y$，运行 $M(w)$；若 $M$ 接受，则接受所有输入；否则永远不接受
* $M_2$：始终拒绝所有输入，因此 $L(M_2)=\emptyset$

于是：

* 若 $\langle M, w \rangle \in \overline{A_{TM}}$，即 $M$ 不接受 $w$，则 $L(M_1)=\emptyset=L(M_2)$
* 若 $\langle M, w \rangle \notin \overline{A_{TM}}$，即 $M$ 接受 $w$，则 $L(M_1)=\Sigma^* \ne \emptyset=L(M_2)$

所以

$$
\overline{A_{TM}} \le_m EQ_{TM}
$$

由于 $\overline{A_{TM}}$ 不可识别，故 $EQ_{TM}$ 也不可识别。

这类题的关键词通常是：

* “两台机器语言是否相同”
* “某台机器的语言是否有某种语义性质”

往往都该优先怀疑：它不是 decidable，很多时候甚至不是 recognizable。

---

## Reduction 里最容易犯的错

### 错误 1：方向写反

你想证明 $B$ 难，必须从**已知难**的 $A$ 出发，证明

$$
A \le_m B
$$

而不是 $B \le_m A$。

记忆方式：

* reduction 的箭头，指向你想打下来的目标问题

### 错误 2：只讲直觉，不验证双向

必须明确写出：

* `if`
* `only if`

否则不完整。

### 错误 3：把“写出机器”误当成“运行机器”

归约函数只需要输出某台新机器的**编码**。  
新机器未来可能会无限循环，这一点完全没问题；只要构造这个编码本身是可计算的即可。

---

## 本讲总结

* Mapping reduction 是证明不可判定性/不可识别性的标准工具。
* 证明 $A \le_m B$ 时，必须同时说明：
  * $f$ 可计算
  * $w \in A \iff f(w) \in B$
* 常用推论：
  * $A \le_m B$ 且 $A$ 不可判定 $\Rightarrow B$ 不可判定
  * $A \le_m B$ 且 $A$ 不可识别 $\Rightarrow B$ 不可识别
* 典型例子：
  * $A_{TM} \le_m HALT_{TM}$
  * $A_{TM} \le_m REG_{TM}$
  * $\overline{A_{TM}} \le_m EQ_{TM}$

Reduction 的价值在于：  
以后面对新语言时，你往往不需要重新发明一套对角化证明，而是只需要找到一个**合适的源问题**和一个**聪明的翻译函数**。
