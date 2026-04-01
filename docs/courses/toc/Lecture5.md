# Lecture 5

Lecture 5: Decidability and Undecidability

[Lecture 5 Slides](https://blog.bruce12138.com/pdf/toc/Lecture5.pdf)

## 从“能算”到“总能算完”

上一讲引入了图灵机，说明它足够强大，可以表达一般算法。  
这一讲的核心问题更尖锐：

* 哪些问题能被 TM **判定**？
* 哪些问题只能被 **识别**？
* 哪些问题甚至**不可识别**？

因此，本讲真正建立的是一条能力分层：

* **Regular**
* **Decidable**
* **Recognizable**
* **Unrecognizable**

---

## 判定问题示例：DFA emptiness

考虑语言：

$$
E_{DFA} = \{\langle D \rangle \mid L(D) = \emptyset\}
$$

一个错误但很自然的想法是：

1. 枚举所有字符串
2. 逐个模拟 DFA
3. 如果发现某个字符串被接受，就拒绝

问题在于：如果语言真的为空，这个过程会**永远枚举下去**，所以它只是 recognizer，不是 decider。

### 正确思路：可达性

DFA 接受某个字符串，当且仅当：

* 存在一个从初态出发的路径
* 这条路径最终到达某个接受态

所以算法只需：

1. 从初态开始做图搜索
2. 求出所有可达状态集合 $R$
3. 检查 $R \cap F$ 是否为空

如果为空，则接受 $\langle D \rangle$；否则拒绝。  
因为 DFA 状态数有限，所以这个过程必然停机，故 $E_{DFA}$ **可判定**。

---

## 判定问题示例：DFA equivalence

考虑：

$$
EQ_{DFA} = \{\langle D, D' \rangle \mid L(D) = L(D')\}
$$

核心技巧是把“两个语言是否相等”转成“它们的对称差是否为空”：

$$
L(D) = L(D') \iff L(D) \oplus L(D') = \emptyset
$$

而正则语言对并、交、补都封闭，因此可以构造一个 DFA 来识别对称差。  
于是，$EQ_{DFA}$ 归约为一次 $E_{DFA}$ 判定，故也是**可判定**的。

这类做法体现了一个重要习惯：

* 不直接硬判“相等”
* 先改写成一个更熟悉、更可操作的问题

---

## HALT 是可识别的

停机问题定义为：

$$
HALT = \{\langle M, w \rangle \mid M \text{ 在输入 } w \text{ 上停机}\}
$$

它是 recognizable，因为通用 TM 可以这样做：

1. 模拟 $M(w)$
2. 如果 $M$ 停机（无论接受还是拒绝），就接受

为什么这不是 decider？

* 如果 $M(w)$ 无限循环，模拟器也会无限循环

所以：

* `yes` 实例最终能被识别出来
* `no` 实例不保证终止

这正是 recognizable 的定义。

---

## 对角化：为什么不可判定语言必然存在

这一部分借用了 Cantor 的思想。

### 第一步：图灵机只有可数多个

每台图灵机都可以编码成一个有限字符串 $\langle M \rangle$，而所有有限字符串组成可数集，因此：

* 所有 TM 的集合是可数的

### 第二步：语言有不可数多个

一个语言本质上是 $\Sigma^*$ 的某个子集，而所有子集组成幂集，规模远大于可数集。于是：

* 所有语言的集合是不可数的

结论立刻得到：

* 语言比图灵机多
* 因而存在某些语言根本不被任何图灵机识别

也就是说，**不可识别语言必然存在**。

---

## DIAG：用对角线制造矛盾

设所有图灵机按编码排成序列 $M_1, M_2, M_3, \dots$，定义

$$
DIAG = \{\langle M_i \rangle \mid M_i \text{ 不接受 } \langle M_i \rangle\}
$$

如果某台机器 $M_k$ 决定了 $DIAG$，那么考虑它在自己的编码 $\langle M_k \rangle$ 上的行为：

* 若 $M_k$ 接受 $\langle M_k \rangle$，则按定义它不应属于 $DIAG$
* 若 $M_k$ 不接受 $\langle M_k \rangle$，则按定义它又应属于 $DIAG$

两边都矛盾，因此 $DIAG$ 不可判定。

这个证明模式要牢牢记住：  
**让机器处理自己的编码，再翻转它的结论。**

---

## HALT 不可判定

接下来把“存在某个不可判定语言”升级成“一个具体而重要的问题不可判定”。

假设存在 decider $H$ 判定 $HALT$，我们构造一个机器 $D$ 来判定 $DIAG$：

1. 输入 $\langle M \rangle$
2. 先调用 $H(\langle M, \langle M \rangle \rangle)$ 判断 $M$ 在自己编码上是否停机
3. 若 $H$ 说“不停机”，则接受
4. 若 $H$ 说“会停机”，就真的运行 $M(\langle M \rangle)$，并把它的接受/拒绝结果反过来输出

这样 $D$ 就会决定 $DIAG$，与上一节矛盾。故：

$$
HALT \text{ 不可判定}
$$

注意：

* `HALT` 是 recognizable
* 但不是 decidable

这是课程里第一次出现“可识别但不可判定”的自然问题。

---

## $A_{TM}$ 不可判定

定义

$$
A_{TM} = \{\langle M, w \rangle \mid M \text{ 接受 } w\}
$$

它比 `HALT` 更强，因为：

* `accept` 是一种特殊的停机
* `halt` 包含 accept 或 reject

标准结论是：

$$
A_{TM} \text{ 不可判定}
$$

证明同样通过自指和对角化完成。  
直觉上，如果你真能完全判定“某台机器是否接受某输入”，那么你也就能构造出一台专门和自身答案唱反调的机器，从而产生矛盾。

---

## 判定性的一个重要刻画

定理：

> 语言 $L$ 可判定，当且仅当 $L$ 和 $\overline{L}$ 都是可识别的。

### 容易方向

若 $L$ 可判定，那么：

* 运行 decider，接受时就识别 $L$
* 反转 accept/reject，就识别 $\overline{L}$

### 困难方向

若 $L$ 和 $\overline{L}$ 都可识别，设其 recognizer 为 $M_1, M_2$。  
对任意输入 $w$，并行模拟二者：

1. 跑一步 $M_1$
2. 跑一步 $M_2$
3. 谁先接受，就按它的归属输出

因为任意字符串不是在 $L$ 里，就是在补集里，所以总有一边最终接受，于是这个并行过程一定停机。

这个定理非常重要，因为它给出了识别和判定之间的**精确分界**。

---

## 一个关键推论：补停机问题不可识别

由上面的定理立刻得到：

* `HALT` 是 recognizable
* `HALT` 不是 decidable

所以它的补集

$$
\overline{HALT}
$$

不可能也是 recognizable。否则 `HALT` 和 $\overline{HALT}$ 同时 recognizable，就会推出 `HALT` decidable，矛盾。

因此：

* `HALT`：可识别但不可判定
* $\overline{HALT}$：不可识别

这说明不可识别语言不是抽象存在，而是自然问题的补集里就已经出现了。

---

## 本讲核心结论

* 不是所有 TM 问题都可判定，`HALT` 和 $A_{TM}$ 都不可判定。
* “枚举所有输入”常常只能得到 recognizer，不能得到 decider。
* 通过 Cantor 对角化可以证明：有些语言甚至不可识别。
* 一个语言可判定，当且仅当它和它的补集都可识别。

下一讲会系统化这类证明技巧：  
不再每次都从头构造矛盾，而是使用**mapping reduction** 把已知困难问题转移到新问题上。
