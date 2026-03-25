# Sequence-to-Sequence Models and Attention / Seq2Seq 与注意力

Covered in: Week 3, Lecture 7 (`7-Seq2seq`)

这里进入输入序列到输出序列的建模，重点是 `encoder-decoder` 结构以及 `attention` 如何缓解单向压缩瓶颈。

## Seq2Seq 的任务形式

普通 `language modeling` 处理的是“同一条序列的下一个词是什么”。
但很多 NLP 任务并不是这样，它们需要把一个输入序列变成另一个输出序列，例如：

- `machine translation`
- `summarization`
- `code generation`
- `image captioning`

这类任务需要更一般的 `sequence-to-sequence` 架构。

## 编码器-解码器结构

经典 `seq2seq model` 包含两个部分：

- `encoder` 负责读入源序列
- `decoder` 负责自回归地产生目标序列

`encoder` 会把输入压缩成表示，`decoder` 再基于这个表示生成：

$$
y_1, y_2, \dots, y_T
$$

这个结构的本质，是把“理解输入”和“生成输出”拆成两个相互配合的过程。

## 条件语言模型训练目标

有配对数据时，训练目标依然可以写成目标端的 `cross-entropy`：

$$
\mathcal{L} = \sum_{t=1}^{T} -\log P(y_t \mid y_{<t}, x_{1:n})
$$

所以 `decoder` 本质上还是一个 `conditional language model`。

和普通语言模型相比，最大的差别在于：

- 现在需要成对的输入输出样本
- 这类数据通常更难收集

## 时间瓶颈 temporal bottleneck

早期 `seq2seq` 往往让 `encoder` 只输出一个最终状态，再把它交给 `decoder`。

问题在于，这会形成严重的 `temporal bottleneck`：

- 所有源信息都要塞进一个向量
- 输入一长，就很难压得完整
- 长距离依赖更容易丢失

## Attention 机制

`attention` 的作用，就是让 `decoder` 不只依赖一个总结向量，而是能在生成每一步时重新查看所有 `encoder states`。

在第 `t` 步解码时：

- `decoder state` 像 `query`
- `encoder states` 像 `keys` 和 `values`

模型会先算相似度，再经过 `softmax` 得到权重，最后做加权平均：

$$
\alpha_i = \text{softmax}(a_i)
$$

$$
\tilde{h}_t = \sum_i \alpha_i h_i^{enc}
$$

这个 `context vector` 会和当前 `decoder state` 一起决定下一个词。

## Attention 带来的改进

`attention` 带来的提升很直接：

- 可以直接访问源序列的不同位置
- 单向压缩瓶颈被显著缓解
- 长距离信息更容易保留
- 梯度传播路径更短
- `attention map` 还能提供一定可解释性

## Query / Key / Value 的直观理解

在经典 `encoder-decoder attention` 里，可以把三者理解成：

- `query`：当前解码器到底需要什么信息
- `key`：每个源位置的“地址”或匹配线索
- `value`：每个源位置真正携带的内容

所以 `attention` 本质上很像一次基于内容的检索。
`decoder` 不是把整句源文本死记住，而是在每一步生成时，动态地去取当前最相关的 `source positions`。

## 经典 Seq2Seq 的剩余限制

即便加了 `attention`，经典 `seq2seq` 的 `encoder` 和 `decoder` 仍然往往是循环结构。
这意味着：

- 隐状态还是要按时间顺序计算
- 并行化能力依然有限

这也是后面 `transformer` 会出现的直接背景。

## 小结

`seq2seq` 把语言建模推广成输入序列到输出序列的映射，而 `attention` 则把“只靠一个向量传递全部信息”的老问题拆开，让 `decoder` 能在生成过程中动态取回真正需要的源端信息。
