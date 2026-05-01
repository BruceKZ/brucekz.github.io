# Pretraining and Transfer Learning / 预训练与迁移学习

Covered in: Week 4, Lectures 10-11 (`10-PLMs_1`, `11-PLMs_2`)

这里讨论的是现代 NLP 最关键的范式变化：从训练局部表示，转向先预训练整个模型，再迁移到具体任务。

## 静态词向量的不足

传统 `word embeddings` 给每个词类型只分配一个固定向量。
但很多词的含义会随上下文变化。

例如：

- `play` 在棒球语境里是一种意思
- `play` 在戏剧语境里是另一种意思

单一静态向量很难同时表达这两种语义。

## 上下文化表示 contextualized representations

现代方法的核心想法是：

- 先在大规模原始语料上做 `pretraining`
- 用模型内部的上下文化隐藏状态做表示
- 再把整个模型迁移到下游任务

这就是 `pretrain-then-finetune` 范式。

## ELMo

`ELMo` 用的是双向 `LSTM language models`。
它的基本做法是：

- 分别训练前向和后向语言模型
- 把隐藏状态当成上下文化 `token embeddings`
- 再用学习到的权重去组合不同层

它的优点是，相比静态词向量，很多任务上效果都明显更好。
但它的双向性仍然是两个方向模型的拼接，而不是统一编码器里的一体化双向条件建模。

这也是 `ELMo` 的经典局限：它已经比静态词向量前进了一大步，但还不是后来 `BERT` 那种原生双向编码。

## BERT

`BERT` 是 `encoder-only transformer`，主要通过 `masked language modeling` 做预训练。

它不是从左到右预测下一个词，而是把部分输入位置遮住，再去预测这些被遮住的词。

课上给出的典型设置是：

- 选出 15% 的 `tokens`
- 其中 80% 替换成 `[MASK]`
- 10% 替换成随机词
- 10% 保持原样

这种训练方式的关键价值在于：

- `BERT` 可以利用双向上下文
- 它对分类和序列标注尤其强

另一个容易考的点是：`BERT` 的预训练目标和 `GPT` 不同，所以它天然更偏表示学习，而不是左到右生成。

### Fine-tuning BERT

做分类任务时，常见方式是：

- 在开头加 `[CLS]`
- 取它的输出表示
- 接一个轻量分类头
- 对整个模型做 `fine-tuning`

课上强调的一点是，完整 `fine-tuning` 通常比只把 `BERT embeddings` 冻结起来当特征更有效。

这是现代预训练范式的核心结论之一：迁移的不只是词向量，而是整套模型参数。

## GPT

`GPT` 走的是 `decoder-style transformer` 路线，预训练目标是 `causal language modeling`：

$$
P(x_t \mid x_{<t})
$$

它的强项是：

- 非常自然地做文本生成
- 自回归扩展性很好

和 `BERT` 相比，它的弱点在于预训练时不使用双向条件信息。
所以如果任务更偏表示学习，`BERT` 往往更合适；如果任务更偏生成，`GPT` 更自然。

把它们放在一起记，常见比较就是：

- `BERT`：强在编码和理解
- `GPT`：强在自回归生成

## 预训练范式转变

旧范式通常是：

- 为具体任务手工设计模型
- 最多只拿预训练词向量做初始化

新范式则是：

- 先预训练一个大模型
- 再把整个模型迁移到许多下游任务

这不是小修小补，而是现代 NLP 最重要的思路切换之一。

## 迁移学习 transfer learning

课上把两个阶段区分得很清楚。

`Pretraining` 的特点是：

- 目标通常比较通用
- 语料规模很大
- 训练昂贵而缓慢

`Fine-tuning` 的特点是：

- 用较小的有标签数据
- 监督信号更贴近具体任务
- 成本更低，迭代更快

## BART

`BART` 是 `encoder-decoder transformer`。
它把两种思路结合起来：

- `encoder` 处理被破坏过的输入
- `decoder` 负责自回归生成输出

这使得它既适合生成任务，也能处理很多理解任务。

课上这部分的重点，是把 `BART` 看成把 `BERT` 风格的输入破坏和 `GPT` 风格的生成结合起来。

## T5

`T5` 把“万物皆可 `text-to-text`”这一路线推得更彻底。

它的核心想法是：

- 把很多任务都统一改写成输入文本到输出文本
- 用 `span corruption` 或 `infilling` 一类目标做预训练

这种统一格式让模型框架非常通用。

`T5` 的重要性不只是模型结构，而是任务表述方式。
它把大量 NLP 任务都重新写成统一的 `text-to-text` 接口。

## 模型对比

可以粗略地这样记：

- `ELMo`：来自双向 `LSTM` 的上下文化表示
- `BERT`：`encoder-only` 的 `masked LM`
- `GPT`：`decoder-only` 的 `causal LM`
- `BART`：做去噪的 `encoder-decoder seq2seq`
- `T5`：统一成 `text-to-text` 的 `seq2seq`

## 核心概念

- **出现背景：** 静态词向量无法处理 `polysemy`，这推动了上下文化表示的发展。
- **ELMo：** `ELMo` 通过双向 `LSTM` 隐状态提供上下文化表示。
- **BERT / GPT：** `BERT` 是 `encoder-only + masked LM`，`GPT` 是 `decoder-only + causal LM`。

## 高频结论

- **能力分工：** `BERT` 更偏表示学习，`GPT` 更偏生成。
- **迁移方式：** `fine-tuning` 通常强于只抽取冻结的预训练特征。
- **Encoder-decoder 范式：** `BART` 和 `T5` 都属于更统一的 `encoder-decoder` 预训练路线。

## 小结

现代 NLP 的主线，已经从“先学词向量，再自己搭任务模型”转成了“先预训练完整模型，再把它迁移到具体任务”。真正被迁移的不再只是词表示，而是整套上下文化参数。
