# Lecture 1

Lecture 1: Introduction and Finite Automata
Chapters 0 and 1.1 from Sipser's book. A few recommended exercises from Sipser's book: 1.4-1.6

[Lecture 1 Slides](https://blog.bruce12138.com/pdf/toc/Lecture1.pdf)

## 一、 宏观计算宇宙 (The Computational Universe)
* **核心探讨**：计算的本质与边界（追寻图灵与哥德尔的遗志）。
* **复杂性阶层**：
  * **Undecidable (不可判定)**：如停机问题，计算机无法解决。
  * **NP (多项式时间内可验证)**：如 TSP (旅行商问题)、图着色。
  * **P (多项式时间内可解)**：如排序、最短路径。
* **本讲切入点**：如果计算模型的**内存被严格限制为常数级别**，它能计算什么？这就引入了有限状态自动机 (Finite Automata)。

---

## 二、 确定性有限自动机 (DFA) 的数学形式化
DFA $M$ 必须被严谨地定义为 **五元组 (5-tuple)** $M = (Q, \Sigma, \delta, q_0, F)$：
* $Q$：有限状态集（反映常数内存）。
* $\Sigma$：有限的字母表。
* $\delta: Q \times \Sigma \rightarrow Q$：转移函数，决定了系统在给定当前状态和输入字符时的唯一后继状态。
* $q_0 \in Q$：初始状态。
* $F \subseteq Q$：接受状态（或称终态）集合，$F$ 可以为 $\emptyset$。

**正则语言 (Regular Language)**：
机器 $M$ 接受的所有字符串集合构成其语言，记为 $L(M)$。能被某个 DFA 识别的语言即为正则语言。

---

## 三、 DFA 正确性的严密证明 (Proof by Induction)
要证明 DFA 准确无误地识别了目标语言 $L$，必须使用**结构归纳法 (Structural Induction)** 证明状态的正确性。

### 证明核心步骤 (强化归纳假设法)
为了避免在归纳推导时因状态不明而卡壳，必须为**每一个状态**赋予明确的物理或数学意义：
1. **定义状态集合**：为机器的每个状态 $q_i$ 准确描述其对应的字符串集合 $T_i$。
2. **基础情况 (Base Case)**：证明空串 $w = \epsilon$ 时，系统处于正确的初始状态（即证明 $\epsilon \in T_0$ 且 $\delta(q_0, \epsilon) = q_0$）。
3. **归纳情况 (Inductive Case)**：
   * **假设**：对任意字符串 $x$，若 $x \in T_i$，则 $\delta(q_0, x) = q_i$ 成立。
   * **推导**：对于新读入的任意字符 $\sigma \in \Sigma$，分析拼接后的 $x \cdot \sigma$ 属于哪个集合 $T_j$，并利用转移函数 $\delta(q_i, \sigma)$ 证明系统恰好转移到了 $q_j$。通过**分类讨论**所有可能的状态和字符组合，完成严格推导。

---

## 四、 正则语言的闭包性质 (Closure Properties)
如果对已有的正则语言进行集合操作，得到的新语言是否依然是正则的？

### 1. 补集 (Complement)
* **定义**：$\overline{L} = \{w \in \Sigma^* \mid w \notin L\}$
* **定理**：正则语言在补集操作下封闭。
* **构造证明**：若 $M = (Q, \Sigma, \delta, q_0, F)$ 接受 $L$，只需反转接受状态。构造 $M' = (Q, \Sigma, \delta, q_0, Q \setminus F)$，则 $M'$ 接受 $\overline{L}$。

### 2. 并集 (Union) 与 交集 (Intersection)
* **定理**：正则语言在并集和交集操作下封闭。
* **构造证明 (乘积构造法 Product Construction)**：
  为了同时判断两个语言 $L_1$ 和 $L_2$，我们可以在一个“超级 DFA”中**并行模拟**原来的两个机器 $M_1$ 和 $M_2$。
  * **新状态集 (笛卡尔积)**：$Q = Q_1 \times Q_2$。每个新状态 $(q_a, q_b)$ 记录了两个原机器的当前位置。
  * **新转移函数**：同步转移，$\delta((q_a, q_b), \sigma) = (\delta_1(q_a, \sigma), \delta_2(q_b, \sigma))$。
  * **并集 $L_1 \cup L_2$ 的终态**：$F = \{(q_a, q_b) \mid q_a \in F_1 \text{ or } q_b \in F_2\}$（满足其一即接受）。
  * **交集 $L_1 \cap L_2$ 的终态**：$F = \{(q_a, q_b) \mid q_a \in F_1 \text{ and } q_b \in F_2\}$（必须同时满足才接受）。

### 3. 连接操作 (Concatenation) 的悬念
* **定义**：$L_1 \circ L_2 = \{w_1 \cdot w_2 \mid w_1 \in L_1, w_2 \in L_2\}$
* **难点**：DFA 在处理连接操作时，无法“预知”何时应该将前半部分 $w_1$ 截断并开始匹配 $w_2$。这种状态判定的不确定性，呼唤着我们引入新的计算模型——**非确定性有限自动机 (NFA)**。