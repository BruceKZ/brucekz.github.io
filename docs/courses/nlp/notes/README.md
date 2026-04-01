# CS552 NLP Notes / 现代 NLP 笔记

这组笔记按知识点组织，不按 lecture 时间顺序展开。
写法以平述知识点为主，保留英文术语，并补一层中文提示，方便扫读和复习。
每一章除了基础叙述外，也尽量补了核心概念、模型对比和高频结论，便于从头学和考前回看。

Weeks 1-2 主要结合了我自己的草稿笔记和课程 slides。
Weeks 3-7 主要根据 slides 重写成知识点笔记。

## 主题总览

| 笔记 | 主要内容 | 对应课程 |
|---|---|---|
| [Neural Text Classification Basics / 文本分类基础](./01-neural-text-classification.md) | 基础 NLP 流水线、embedding、pooling、预测层、backprop | Week 1, Lectures 1-2 |
| [Word Embeddings / 词向量](./02-word-embeddings.md) | 稀疏与稠密表示、CBOW、Skip-gram、GloVe、fastText | Week 1, Lecture 3 |
| [Count-Based Language Models / 计数语言模型](./03-count-based-language-models.md) | chain rule、n-gram、perplexity、smoothing | Week 2, Lectures 4-5 |
| [Neural Language Models and RNN Foundations / 神经语言模型与 RNN 基础](./04-neural-language-models-and-rnns.md) | 固定窗口神经 LM、RNN、BPTT | Week 2, Lectures 4-6 |
| [LSTMs, GRUs, and Training Issues / LSTM、GRU 与训练问题](./05-lstms-grus-and-training-issues.md) | vanishing gradients、LSTM、GRU | Week 2, Lecture 6 |
| [Sequence-to-Sequence Models and Attention / Seq2Seq 与注意力](./06-seq2seq-and-attention.md) | encoder-decoder、temporal bottleneck、attention | Week 3, Lecture 7 |
| [Transformers / Transformer](./07-transformers.md) | self-attention、multi-head attention、masked attention、position embeddings | Week 3, Lecture 8 |
| [Tokenization / 分词与切分](./08-tokenization.md) | word/character/subword/byte tokenization、BPE、WordPiece、SentencePiece | Week 3, Lecture 9 |
| [Pretraining and Transfer Learning / 预训练与迁移学习](./09-pretraining-and-transfer-learning.md) | ELMo、BERT、GPT、BART、T5、fine-tuning | Week 4, Lectures 10-11 |
| [Data Annotation and Bias / 数据标注与偏差](./10-data-annotation-and-bias.md) | benchmark、标注流程、artifacts、bias mitigation | Week 5, Lecture 13-14 |
| [Evaluation of AI Systems / AI 系统评测](./11-evaluation-of-ai-systems.md) | 现代评测、leaderboard 陷阱、LLM-as-a-judge、robustness | Week 5 guest lecture |
| [Text Generation / 文本生成](./12-text-generation.md) | decoding、beam search、sampling、sequence-level training、generation evaluation | Week 6, Lectures 19-21 |
| [In-Context Learning and Post-Training / 上下文学习与后训练](./13-in-context-learning-and-post-training.md) | GPT-3、few-shot prompting、instruction tuning、RLHF、DPO、alignment | Week 7, Lecture 23 |

这些笔记整体上从表示学习、语言建模、序列建模，一直推进到预训练范式、数据构建、评测，再延伸到文本生成和大模型后训练。
