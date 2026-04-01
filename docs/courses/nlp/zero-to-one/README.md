# CS552 NLP Zero-to-One / 从零开始版

这组笔记面向第一次系统接触 NLP 的读者。
写法比原始 `notes/` 更展开，补齐课程默认前置知识，但仍按主题拆分，不写成单篇长文。

内容组织原则：

- 先交代问题背景，再讲模型结构
- 解释方法之间的过渡关系
- 补齐对照 PDF 时发现的高风险漏点

## 主题总览

| 笔记 | 主要内容 | 对应课程 |
|---|---|---|
| [Course Overview and NLP Basics / 课程总览与 NLP 基础](./00-course-overview-and-nlp-basics.md) | NLP 在解决什么问题、语言为什么难、课程主线 | Week 1, `1-Intro` |
| [Basic Text Classification and Representations / 基础文本分类与表示](./01-basic-text-classification-and-representations.md) | 最基础的 NLP pipeline、词表、`<UNK>`、embedding、pooling、预测层 | Week 1, `2-NeuralClassifier` |
| [Word Embeddings / 词向量](./02-word-embeddings.md) | 稀疏与稠密表示、CBOW、Skip-gram、GloVe、fastText | Week 1, `3-NeuralEmbeddings` |
| [Count-Based Language Models / 计数语言模型](./03-count-based-language-models.md) | chain rule、Markov assumption、`n`-gram、perplexity、smoothing | Week 2, `4+5-EarlyLMs+RNNs-Start` |
| [Neural Language Models, RNNs, LSTMs, and GRUs / 神经语言模型、RNN、LSTM 与 GRU](./04-neural-language-models-rnns-lstms-and-grus.md) | 固定窗口神经 LM、RNN、BPTT、梯度消失、LSTM、GRU | Week 2, `4+5-EarlyLMs+RNNs-Start`, `6-RNNs-continued+LSTMs+GRUs` |
| [Seq2Seq and Attention / Seq2Seq 与注意力](./05-seq2seq-and-attention.md) | encoder-decoder、temporal bottleneck、attention、QKV 直觉 | Week 3, `7-Seq2seq` |
| [Transformers and Tokenization / Transformer 与切分](./06-transformers-and-tokenization.md) | self-attention、multi-head attention、mask、position embeddings、BPE、WordPiece、SentencePiece | Week 3, `8-Transformers`, `9-Tokenization` |
| [Pretraining and Transfer Learning / 预训练与迁移学习](./07-pretraining-and-transfer-learning.md) | ELMo、BERT、GPT、BART、T5、RoBERTa、DistilBERT、fine-tuning | Week 4, `10-PLMs_1`, `11-PLMs_2` |
| [Training Data for LLMs / 大模型训练数据](./08-training-data-for-llms.md) | 预训练数据、instruction data、preference data、filtering、dedup、contamination | Week 4 guest lecture |
| [Data Annotation and Evaluation / 数据标注与评测](./09-data-annotation-and-evaluation.md) | benchmark 构建、artifacts、annotator bias、leaderboard illusion、LLM-as-a-judge | Week 5, `13+14-data-artifacts`, `angelika_romanou-nlp-evaluation-guest-lecture` |
| [Text Generation / 文本生成](./10-text-generation.md) | greedy、beam search、sampling、exposure bias、teacher forcing、scheduled sampling、sequence-level training | Week 6, `19+20-Text_Generation_part1` |
| [In-Context Learning and Post-Training / 上下文学习与后训练](./11-in-context-learning-and-post-training.md) | zero-shot、few-shot、CoT、instruction tuning、RLHF、PPO、DPO、RLVR、test-time scaling | Week 7, `23-gpt-3+prompting+post-training` |

## 阅读顺序

- 第一次学这门课，按上表顺序读。
- 已经上过课但对部分基础不稳，可从 `03` 开始补。
- 考前复习可配合提炼版。
