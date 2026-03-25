# Neural Text Classification Basics / 文本分类基础

Covered in: Week 1, Lectures 1-2 (`1-Intro`, `2-NeuralClassifier`)

文本分类里最基础的 NLP pipeline 是：`token` 先变成向量，再压成句子表示，最后映射到 `label`。

## 任务形式与基本目标

最简单的 NLP 系统，会把一个离散 `token sequence` 映射成某个有用的输出。
课上最典型的例子是情感分类，也就是把一段影评映射成正面或负面的 `label`。

抽象地写，就是：

$$
S = (x_1, x_2, \dots, x_T) \rightarrow y
$$

这里 `S` 是输入序列，`y` 是输出标签。

## 基本流水线

这类模型通常按下面的顺序工作：

1. 先定义词表 `V`。
2. 把每个 `token` 映射成一个 `embedding vector`。
3. 把一串 `token embeddings` 组合成一个句子级表示。
4. 把这个表示送进预测层。
5. 根据 `loss` 做 `backpropagation`，更新参数。

压缩成一句话，就是 `word ids -> vectors -> sentence representation -> label`。

## 词表与 `<UNK>`

自然语言本身很脏，常见问题包括：

- 词表非常大
- 稀有词很多
- 会有 typo、emoji、多语言混杂和特殊符号

所以实际建模时通常不会保留所有词，而是先定义一个可控的 `vocabulary`。
不在词表里的词，会被映射成特殊符号：

$$
\texttt{<UNK>}
$$

这不是语言学上的完美处理，而是工程上的近似。

## Embedding lookup 与向量查表

模型不会把词当成彼此完全独立的符号，而是会从共享的 `embedding matrix` 里查一个稠密向量：

$$
\mathbb{E} \in \mathbb{R}^{|V| \times d}
$$

词表中的每个词类型，都对应矩阵里的一行。
同一个词在不同位置出现时，查到的是同一组参数。

## 序列表示的组合方式

最简单的组合方法是 `sum-pooling`：

$$
h_T = \sum_{t=1}^{T} x_t
$$

常见的简单变体还有：

- `average pooling`
- `max pooling`

这里的关键点是，这类模型还没有真正显式地建模 `syntax`。
它做的事情更接近把一串词向量压缩成一个句子级向量。

## 预测层

如果是二分类，可以用 `logistic regression`：

$$
P(y) = \sigma(W_o h_T)
$$

如果是多分类，可以用：

$$
P(y) = \text{softmax}(W_o h_T)
$$

如果输出空间不是标签集合，而是整个词表，那这个形式也可以变成 `next-word prediction`。

## 损失函数与学习过程

训练时通常会做几件事：

- 把预测结果和 `gold label` 比较
- 计算 `loss`
- 通过 `backpropagation` 回传梯度
- 更新模型参数

最重要的一点是，模型学到的不只是分类器权重，也包括 `embedding` 本身。

这个最简单的设定里，可学习参数主要包括：

- `embedding matrix` `E`
- 输出矩阵 `W_o`

## Embedding 的语义泛化作用

如果两个词在很多任务里表现相似，梯度更新就可能把它们推到向量空间里相近的位置。
这就是语义泛化的起点。

直观上：

- `great` 和 `excellent` 可能会变近
- `terrible` 和 `awful` 可能会变近

也就是说，模型开始通过参数共享学到某种“相似词应该有相似表示”的结构。

## 局限

这条基础流水线虽然清楚，但能力很有限：

- `pooling` 会丢失词序
- 长距离结构基本看不到
- `syntax` 几乎没有被显式利用
- 每个词对最终表示的贡献方式比较粗糙

也正因为这些限制，后面的课程才会继续引出 `RNN`、`attention` 和 `transformer`。

## 小结

现代 NLP 的第一个核心观念是：文本模型不是直接处理词，而是先把 `token` 变成向量，再把这些向量组合成序列表示，并且把表示学习和分类器训练放在同一个端到端过程里完成。
