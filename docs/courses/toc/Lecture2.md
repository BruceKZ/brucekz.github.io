# Lecture 2

Lecture 2: Non-Determinism and Closure Properties
Chapter 1.2 in Sipser. A few recommended exercises: 1.7-1.10, 1.14

[Lecture 2 Slides](https://blog.bruce12138.com/pdf/toc/Lecture2.pdf)

## 一、 非确定性有限自动机 (NFA) 的引入
在第一讲的末尾，我们发现 DFA 很难处理字符串的连接操作 (Concatenation)，因为 DFA 无法“猜测”应该在哪个位置将字符串拆分。为了解决这个问题，引入了非确定性有限自动机 (NFA)。

### 1. NFA 与 DFA 的核心区别
* **多重转移**：在给定状态下读入一个字符，NFA 可以转移到**多个**不同的状态。
* **缺失转移**：NFA 允许对某些字符**没有**定义转移（此时该分支直接“死亡”或拒绝）。
* **$\epsilon$-转移 (Epsilon Transitions)**：NFA 可以在**不读取任何输入字符**的情况下，直接从一个状态跳转到另一个状态。

### 2. NFA 的形式化定义
NFA 同样是一个五元组 $N = (Q, \Sigma, \delta, q_0, F)$，唯一的区别在于**转移函数 $\delta$ 的定义**：
$$\delta: Q \times (\Sigma \cup \{\epsilon\}) \rightarrow 2^Q$$
* $\Sigma \cup \{\epsilon\}$：表示转移不仅可以由字母表中的字符触发，还可以由空串 $\epsilon$ 触发。
* $2^Q$ (幂集)：表示转移的结果不再是一个单一状态，而是状态集合 $Q$ 的一个**子集**（即可以同时进入多个状态，或者进入空集 $\emptyset$）。

### 3. NFA 的计算模型（两种等价视角）
* **并行视角 (Parallel Viewpoint)**：机器像多线程一样，遇到分叉时**复制**自身，并行探索所有可能的路径。只要有一条线程最终停在接受状态，整个机器就接受该字符串。
* **猜测视角 (Guess Viewpoint)**：机器拥有“预知未来”的超能力，遇到分叉时总是能**猜中**那条最终能导向接受状态的正确路径。

---

## 二、 核心定理：NFA 与 DFA 的等价性
> **定理**：每一个 NFA 都有一个与之等价的 DFA。（即正则语言当且仅当它能被 NFA 识别）

为什么我们要研究 NFA？虽然现实世界中没有非确定性的物理实现，但 NFA 具有极高的数学价值：
1. 它让构造复杂语言（如正则表达）变得极其容易。
2. NFA 转化为 DFA 可能会导致状态数的指数级增长，这揭示了计算模型中**空间复杂度的权衡**。
3. 它是后续研究 P vs NP 问题（非确定性图灵机）的核心基础。

### 子集构造法 (The Subset Construction)
给定一个 NFA $N = (Q_N, \Sigma, \delta_N, q_0, F_N)$，我们构造一个等价的 DFA $M = (Q_M, \Sigma, \delta_M, q_0', F_M)$。
*(注：课程幻灯片中给出了无 $\epsilon$-转移版本的严格证明)*

1. **新状态集**：$Q_M = 2^{Q_N}$。DFA 的每一个状态都是 NFA 状态的一个子集。
2. **新转移函数**：对于任意状态集合 $A \subseteq Q_N$ 和字符 $a \in \Sigma$：
   $$\tilde{\delta}(A, a) = \bigcup_{q \in A} \delta_N(q, a)$$
   *(算法视角：这相当于查出当前所有活跃状态，把它们读入字符 $a$ 后能到达的所有新状态求并集。)*
3. **新接受状态**：$F_M = \{A \subseteq Q_N \mid A \cap F_N \ne \emptyset\}$。只要子集中包含哪怕一个 NFA 的接受状态，该超级状态就是 DFA 的接受状态。

---

## 三、 扩展转移函数与严格证明 (Extended Transition Function)
为了在数学上严谨证明 NFA 和构造出的 DFA 接受同一个语言，我们需要定义**扩展转移函数 $\Delta$**（即将单步转移扩展到读取整个字符串）。

### 对于 NFA $N$ 的扩展转移函数：
$$\Delta_N: 2^{Q_N} \times \Sigma^* \rightarrow 2^{Q_N}$$
* Base case: $\Delta_N(A, \epsilon) = A$
* Inductive step: 对于字符串 $x$ 和字符 $a$，$\Delta_N(A, xa) = \bigcup_{q \in \Delta_N(A, x)} \delta_N(q, a)$

### 证明等价性引理：
**引理**：对于所有 $A \subseteq Q_N$ 和 $x \in \Sigma^*$，必有 $\Delta_M(A, x) = \Delta_N(A, x)$。
* **证明方法**：对字符串长度 $|x|$ 进行数学归纳法。
* **推论**：$x \in L(M) \iff \Delta_M(\{q_0\}, x) \in F_M \iff \Delta_M(\{q_0\}, x) \cap F_N \ne \emptyset \iff x \in L(N)$。

---

## 四、 填坑：正则语言的连接闭包 (Concatenation Closure)
第一讲遗留的问题：如果 $L_1$ 和 $L_2$ 是正则语言，$L_1 \circ L_2$ 是否正则？
利用 NFA，构造证明变得异常简单：

假设 $N_1$ 识别 $L_1$，$N_2$ 识别 $L_2$。我们构造一个新的 NFA $N$ 来识别 $L_1 \circ L_2$：
1. **状态合并**：将 $N_1$ 和 $N_2$ 的状态放到一起。
2. **初始状态**：新机器 $N$ 的初始状态就是 $N_1$ 的初始状态。
3. **终态转移**：**核心操作！** 从 $N_1$ 的**每一个接受状态**，引出一条 $\epsilon$-转移（不消耗字符）指向 $N_2$ 的初始状态。
4. **新的接受状态**：原本 $N_1$ 的接受状态不再是接受状态，新机器的接受状态完全等于 $N_2$ 的接受状态。

这完美解决了“不知道在哪切断字符串”的难题，因为 $\epsilon$-转移赋予了机器“随时猜测当前属于第一部分结尾并跳入第二部分”的能力。
