# Word Embeddings / 词向量

Covered in: Week 1, Lecture 3 (`3-NeuralEmbeddings`)

词向量的核心变化是：词不再被看成彼此孤立的符号，而是被表示成可学习的连续向量。

## 稀疏表示与稠密表示

`one-hot vector` 只能告诉我们“现在是哪个词”，但几乎不表达相似性。

如果：

- `enjoyed` 和 `loved` 是两个不同下标
- 它们的 `one-hot vectors` 彼此正交

那么它们的余弦相似度几乎就是 0，哪怕语义上非常接近。

`dense embedding` 试图解决这个问题。它给每个词学习一个向量：

$$
e_w \in \mathbb{R}^d
$$

这里 `d` 远小于 `|V|`，但足够让向量编码有用的语义结构。

## 分布式假设

词向量背后的经典出发点是 Firth 的那句话：

> You shall know a word by the company it keeps.

意思是，词义可以从它反复出现的 `context` 里推出来。
这就是 `distributional semantics` 的基础。

换成建模语言看，模型不是靠字典把定义塞进去，而是通过上下文共现模式去反推出词和词之间的关系。

## 自监督学习的必要性

如果只依赖有标签任务来学 `embedding`，数据效率会很差。
而原始文本很多，所以更合理的做法是直接在无标签语料上定义训练目标。

课上重点讲了四类经典方法：

- `CBOW`
- `Skip-gram`
- `GloVe`
- `fastText`

## CBOW

`CBOW` 的全称是 `Continuous Bag of Words`，它的目标是根据周围上下文预测中间被遮掉的词。

例如：

`enjoyed the ___ we watched`

模型会把上下文向量求和，再投影到整个词表上的概率分布：

$$
P(x_t \mid \{x_s\}) = \text{softmax}\left(U \sum_{s \neq t} x_s \right)
$$

它的特点可以概括成：

- `context -> target`
- 计算高效
- 学到的表示通常更平滑

## Skip-gram

`Skip-gram` 刚好反过来，它是用中心词去预测周围的上下文词。

概念上可以写成：

$$
\max \sum_{s \in \text{context}(t)} \log P(x_s \mid x_t)
$$

它的特点是：

- `target -> context`
- 往往使用更大的窗口
- 离中心更近的上下文通常更重要

如果把两者对比起来看：

- `CBOW` 是把多个上下文压缩成一次预测
- `Skip-gram` 是把一个中心词展开成多个局部预测

## GloVe

`Word2Vec` 一类方法更偏向局部预测目标，而 `GloVe` 更强调全局 `co-occurrence statistics`。

它的核心思路是：

- 先构造词和上下文的共现矩阵
- 再学习向量，使得向量内积能够近似这些共现计数的对数

这样做的结果是，向量之间的差异不只是“像不像”，还可能反映更稳定的概率比值关系。

## fastText

`fastText` 在词向量里进一步引入了 `subword information`。
一个词不只对应整体向量，还会由多个字符 `n-grams` 共同表示。

例如 `where` 可以被拆成若干字符片段，这对下面几类问题都很有帮助：

- 词形变化
- 稀有词
- 形态学较丰富的语言

因为相关词形会共享子串，稀有词也不至于完全没有可迁移的表示。

## 好的词向量具备什么性质

一个有用的 `embedding` 至少应该支持：

- 语义相似性
- 句法规律
- 下游任务迁移
- 对部分稀有词变化的鲁棒性

但静态词向量有一个根本问题：同一个词无论出现在什么上下文里，拿到的都是同一个向量。
这在 `polysemy` 上会很吃亏。

例如：

- `play` 在棒球语境里是一种意思
- `play` 在戏剧语境里又是另一种意思

静态表示会把这些词义揉在一起。

## 实践中的权衡

训练词向量时常见的权衡包括：

- 更大的 `dimension d` 能容纳更多信息，但参数更多
- 更大的 `context window` 能捕获更宽的语义关系，但可能牺牲局部句法细节
- 局部预测目标简单、可扩展，但本质上还不是上下文化表示

## 小结

词向量的意义在于，它把离散的词 ID 变成了可学习的连续表示，让相似性、泛化和参数共享能够直接在向量空间里出现。
