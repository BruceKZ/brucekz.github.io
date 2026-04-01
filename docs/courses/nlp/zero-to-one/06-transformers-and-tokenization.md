# Transformers and Tokenization / Transformer 与切分

Covered in: Week 3 (`8-Transformers`, `9-Tokenization`)

这部分可以分成两条线：

- `transformer` 在建模层面替代了循环结构
- `tokenization` 决定模型实际看到的最小输入单元

这两条线看起来一个偏模型、一个偏数据预处理，但在现代 NLP 里其实联系很紧。模型能力、词表大小、序列长度和训练成本会直接相互影响。

## 为什么需要 transformer

即使 `seq2seq + attention` 已经比早期结构强很多，只要底层还是 `RNN`，就仍然存在串行计算问题：

- 编码和解码都难并行
- 长序列训练较慢

`transformer` 的关键思路是：

- 去掉显式循环
- 直接用 `self-attention` 建模序列内部关系

因此它的优势不只是“效果更好”，还包括：

- 更容易并行训练
- 信息传播路径更短
- 更适合大规模堆叠和预训练

## self-attention

`self-attention` 的含义是：

- 一个序列内部的每个位置
- 都能直接和同一序列中的其他位置交互

它的好处是：

- 长距离依赖路径更短
- 计算更容易并行
- 不再必须靠时间递推传信息

和 `RNN` 相比，最关键的结构差异是：

- `RNN` 里位置 `t` 想利用位置 `1` 的信息，必须穿过很多递推步
- `self-attention` 里位置 `t` 可以直接和位置 `1` 建立连接

这就是为什么它在长距离建模上更自然。

## self-attention 到底在算什么

从计算上看，它在做三件事：

1. 为每个位置构造 `query`、`key`、`value`
2. 用 `query` 和其他位置的 `key` 计算相关性
3. 用相关性权重对 `value` 做加权汇总

因此每个位置的新表示，都是“从整个序列里挑选出对自己最重要的信息后重新汇总”的结果。

## multi-head attention

单个注意力头只能学一种关系模式。

多头机制允许模型：

- 在不同子空间里学习不同关系
- 同时关注局部、全局、句法或语义信息

因此一个头不必承担所有工作。

更合理的理解是：

- 不同头可以专门捕捉不同模式
- 有的头偏局部词搭配
- 有的头偏远距离依赖
- 有的头偏结构性关系

虽然并不是每个头都会自动学出非常清晰的人类可解释功能，但“多头提供多种关系视角”这个直觉是成立的。

## transformer block 的组成

标准 `transformer block` 不只有注意力。

课程里强调的标准组件包括：

- `multi-head attention`
- `feed-forward network`
- `residual connection`
- `layer normalization`

这些组件共同决定了训练稳定性和表示能力。

可以把它们的作用先分别理解成：

- `attention`：在位置之间搬运和重组信息
- `feed-forward`：对每个位置做更强的非线性变换
- `residual`：让优化更稳定，避免深层网络训练困难
- `LayerNorm`：帮助控制表示分布和训练稳定性

所以 `transformer block` 不是“注意力加点别的”，而是一整套协同设计。

## masked attention

生成任务里的 `decoder` 不能偷看未来词。

因此需要 `causal mask`：

- 当前时刻只能看当前位置及以前
- 未来位置的注意力分数会被屏蔽

如果没有这一步，训练时 decoder 会直接看到未来正确词，生成任务就失去意义。

因此 `causal mask` 不是实现细节，而是生成式 decoder 的定义性约束。

## cross-attention

在 `encoder-decoder transformer` 中，`decoder` 里还会出现 `cross-attention`：

- `query` 来自 decoder 当前状态
- `key / value` 来自 encoder 输出

它的作用是把输入序列的信息注入解码过程。

这也解释了为什么 `self-attention` 和 `cross-attention` 不能混为一谈：

- `self-attention` 处理的是“同一序列内部的关系”
- `cross-attention` 处理的是“输出序列如何读取输入序列”

## position embeddings

自注意力本身不天然包含顺序信息。

如果不给位置编码，模型只能看到一组 token 表示，无法区分谁在前谁在后。

因此需要加入 `position embeddings`，常见有：

- `sinusoidal position embeddings`
- learned positional embeddings

这里要抓住一个最基本的事实：

- 没有位置编码的 self-attention，更像在看一个无序集合

而语言显然不是无序集合，所以顺序信息必须通过额外机制补回来。

## tokenization 为什么重要

模型不会直接处理原始字符串，而是先处理 token。

因此切分策略会直接影响：

- 词表大小
- 序列长度
- OOV 问题
- 训练和推理成本

因此切分策略从来不只是“工程实现细节”。

它会决定：

- 一个模型是否更擅长处理稀有词
- 同样一段文本会被切成多长的序列
- 相同上下文窗口里能容纳多少内容
- 多语言或拼写噪声是否容易处理

## 常见切分层级

### word-level

优点是直观，缺点是词表大且 OOV 问题严重。

它的问题在现代系统里尤其明显，因为：

- 现实文本里新词很多
- 词形变化很多
- 多语言和专有名词很多

### character-level

优点是几乎没有 OOV，缺点是序列很长，学习负担重。

它牺牲了词表大小，换来了更长的建模长度。

### subword-level

这是现代 NLP 最常见的折中方案。

它希望同时保留两点：

- 比整词更开放
- 比字符更紧凑

因此子词方案往往成为现代预训练模型的默认选择。

### byte-level

更底层、更统一，能够进一步缓解 OOV，但序列长度可能上升。

它的优势在于几乎不用担心字符集覆盖问题，但代价是文本通常会被切得更细。

## BPE、WordPiece、SentencePiece

它们都属于子词方法，但实现策略不同。

### BPE

从较小单位开始，不断合并高频相邻单元。

它的核心直觉是：

- 高频组合值得被当成一个更大的单元
- 低频复杂词则仍可拆开

因此它会在“词表大小”和“平均序列长度”之间找到某种平衡。

### WordPiece

同样是子词方案，但合并标准和训练方式与 `BPE` 有差异。

从课程角度，重点不在于死背算法细节，而在于知道它和 `BPE` 一样，是为开放词表和可控词表大小做折中。

### SentencePiece

一类不强依赖传统空格预切分的子词建模方法。

这让它在不同语言和不同文本形式下更灵活。

## 词表大小在实际中意味着什么

词表不是越大越好，也不是越小越好。

词表大：

- token 更接近完整词
- 序列可能更短
- 但稀有词和 OOV 压力更大

词表小：

- 开放性更强
- 但序列更长
- 模型需要处理更多位置

因此词表大小本质上是在做：

- 表示粒度
- 序列长度
- 模型成本

之间的权衡。

## 需要记住的结论

- `transformer` 的核心是用 `self-attention` 替代循环。
- `transformer block` 的标准组成不只有注意力，还包括 `FFN`、`residual` 和 `LayerNorm`。
- `mask` 是生成式 decoder 的必要条件。
- `position embeddings` 用来补足顺序信息。
- `tokenization` 是建模决策的一部分，而不是纯前处理。
- 子词方案之所以成为主流，是因为它在开放词表和序列长度之间提供了较好的折中。
