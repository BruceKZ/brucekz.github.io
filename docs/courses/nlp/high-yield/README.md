# CS552 NLP High-Yield / 提炼版

这组笔记面向已经跟过课，或者已经读过详细版的人。
目标是把最常考、最常混和最值得对比的内容压缩成可复习的多文档提纲。

## 主题总览

| 笔记 | 主要内容 |
|---|---|
| [Course Backbone / 课程主线](./00-course-backbone.md) | 整门课的升级链和阶段关系 |
| [Representations and Embeddings / 表示与词向量](./01-representations-and-embeddings.md) | one-hot、embedding、CBOW、Skip-gram、GloVe、fastText |
| [Language Models and RNN Family / 语言模型与循环模型](./02-language-models-and-rnn-family.md) | `n`-gram、perplexity、smoothing、RNN、LSTM、GRU |
| [Attention, Transformers, and Tokenization / 注意力、Transformer 与切分](./03-attention-transformers-and-tokenization.md) | seq2seq、attention、self-attention、mask、position embeddings、BPE 等 |
| [Pretraining and Transfer / 预训练与迁移](./04-pretraining-and-transfer.md) | ELMo、BERT、GPT、BART、T5、RoBERTa、DistilBERT |
| [Data and Evaluation / 数据与评测](./05-data-and-evaluation.md) | benchmark、artifacts、leaderboard illusion、LLM-as-a-judge |
| [Text Generation / 文本生成](./06-text-generation.md) | greedy、beam search、sampling、teacher forcing、exposure bias、sequence-level training |
| [In-Context Learning and Post-Training / 上下文学习与后训练](./07-in-context-learning-and-post-training.md) | ICL、CoT、instruction tuning、RLHF、PPO、DPO、RLVR |
| [High-Risk Missing Points / 高风险漏点](./08-high-risk-missing-points.md) | 原 `notes/` 之外建议额外补的点 |

## 使用建议

- 想快速建立全局框架，先看 `00`。
- 想考前查漏，优先看 `08`。
- 想做概念对比题，按 `01` 到 `07` 的顺序扫一遍。
