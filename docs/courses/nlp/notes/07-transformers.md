# Transformers / Transformer

Covered in: Week 3, Lecture 8 (`8-Transformers`)

这一章的核心是用 `self-attention` 替代 `recurrence`，让序列里所有位置都能并行地做上下文化表示。

## Transformer 取代 RNN 的背景

`RNN` 有两个非常明显的瓶颈：

- `temporal bottleneck`，也就是长距离依赖很难稳定传播
- `parallelization bottleneck`，也就是隐藏状态必须按顺序计算

`Transformer` 的基本策略，就是把循环结构拿掉，改用 `self-attention` 直接建模位置之间的关系。

## 自注意力 self-attention

在 `self-attention` 里，序列中的每个位置都可以和同一序列中的其他位置交互。

每个位置的表示会被投影成三类向量：

- `query` `Q`
- `key` `K`
- `value` `V`

两个位置之间的打分可以写成：

$$
a_{st} = \frac{(W_Q h_s)^\top (W_K h_t)}{\sqrt{d}}
$$

再经过 `softmax` 得到注意力权重：

$$
\alpha_{st} = \text{softmax}(a_{st})
$$

最终输出是对各个 `value` 的加权求和。

这里常见的名字是 `scaled dot-product attention`。
分母里的 `\sqrt{d}` 不是装饰，而是为了在维度变大时控制点积规模，避免 `softmax` 太快进入极端饱和区。

## 直观理解

如果只看某一个位置：

- `query` 表示“我现在想找什么信息”
- `key` 表示“我这里提供的是什么类型的信息”
- `value` 表示“我真正携带的内容是什么”

这样一来，每个 `token` 都能在一层里直接聚合整个序列里对自己最重要的信息。

## 多头注意力

`Transformer` 不只用一个注意力头，而是用 `multi-head attention`。

这样做的原因是，不同 `heads` 可以学到不同类型的关系，例如：

- 局部句法关系
- 语义相关性
- 指代关系
- 某种近似位置关系

多个头的输出会先拼接，再投影回统一维度。

多头的意义，不只是“复制很多份注意力”。
更准确地说，它让模型可以在不同子空间里并行学习不同关系。

## Transformer block 的组成

一个标准 `transformer block` 通常包括：

- `multi-head attention`
- `residual connection`
- `layer normalization`
- `feedforward network`

`residual connection` 让优化更稳定，`LayerNorm` 有助于控制表示分布，后面的前馈层则负责进一步做非线性变换。

这一块也是常见选择题来源：`transformer block` 不只有注意力，`residual`、`LayerNorm` 和 `feedforward network` 都是标准组成部分。

## Encoder 与 Decoder

`transformer encoder` 的特点是：

- 对整段输入做 `self-attention`
- 每一层都可以并行计算

`transformer decoder` 则通常包含：

- 先做带掩码的 `self-attention`
- 再对 `encoder outputs` 做 `cross-attention`
- 最后经过前馈层

## 因果 mask 的作用

做生成任务时，第 `t` 个位置不能偷看未来 `tokens`。
所以未来位置对应的分数会先被 `mask` 成 `-\infty`，再做 `softmax`。

这就实现了 `causal generation`，保证模型只能利用当前位置之前的上下文。

所以要区分两种注意力：

- `encoder self-attention` 通常可以看全序列
- `decoder self-attention` 在生成场景下必须是 `masked`

## 交叉注意力 cross-attention

`cross-attention` 是经典 `encoder-decoder attention` 在 `transformer` 里的版本：

- `query` 来自 `decoder state`
- `keys` 和 `values` 来自 `encoder outputs`

因此 `decoder` 一边建模目标端历史，一边按需从源端取信息。

这一层和经典 `seq2seq attention` 的关系非常紧密。
如果把 `transformer` 放回课程主线里看，`cross-attention` 就是把旧的 `encoder-decoder attention` 用更统一的注意力框架重写了一遍。

## 位置编码

纯粹的 `self-attention` 对顺序是置换不变的，也就是如果不额外加信息，它并不知道词序。

所以 `transformer` 必须引入 `positional information`，常见方式有：

- `sinusoidal position embeddings`
- `learned position embeddings`

学习式位置编码实现简单、效果通常也好，但它对超出训练长度的泛化有时会差一些。

## 相比 RNN 的优势

`Transformer` 相比 `RNN` 的优势主要体现在：

- 编码可以完全并行
- 长距离交互路径更短
- 更容易扩展到大模型
- 没有递归隐藏状态瓶颈

## 主要代价与局限

它也不是没有代价：

- 注意力计算对序列长度通常是二次复杂度
- 位置信息不会自动出现
- 长上下文效率仍然是活跃研究问题

## 核心概念

- **结构替换：** `Transformer` 用 `self-attention` 替代循环结构。
- **三元组：** `query / key / value` 是理解注意力机制的核心。
- **缩放项：** `scaled dot-product attention` 里的缩放项用于稳定训练。

## 高频结论

- **多头意义：** `multi-head attention` 让模型在不同子空间并行建模关系。
- **标准 block：** 一个典型 `transformer block` 不只有注意力，还包含残差、归一化和前馈层。
- **因果生成：** `decoder` 里的 `masked self-attention` 用来保证不能偷看未来 token。

## 小结

`Transformer` 的关键突破，是用 `self-attention` 替代循环结构，让所有位置都能并行地做上下文化表示，同时再用 `mask` 和位置编码把生成约束与顺序信息补回来。
