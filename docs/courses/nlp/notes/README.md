# CS552 Structured Notes

These notes reorganize the course by knowledge point rather than by raw lecture order.
Main language is English, with some Chinese clarifications where they help intuition.

Source policy:
- Weeks 1-2 combine my rough notes and the official slides.
- Weeks 3-5 are mostly drafted from the lecture slides, then rewritten into note form.

## Note Map

| Note | Main topic | Covered in |
|---|---|---|
| [Neural Text Classification Basics](./01-neural-text-classification.md) | Basic NLP pipeline, embeddings, pooling, prediction, backprop | Week 1, Lectures 1-2 |
| [Word Embeddings](./02-word-embeddings.md) | Sparse vs dense vectors, CBOW, Skip-gram, GloVe, fastText | Week 1, Lecture 3 |
| [Count-Based Language Models](./03-count-based-language-models.md) | Chain rule, n-grams, perplexity, smoothing | Week 2, Lectures 4-5 |
| [Neural Language Models and RNN Foundations](./04-neural-language-models-and-rnns.md) | Fixed-context neural LMs, RNN intuition, BPTT | Week 2, Lectures 4-6 |
| [LSTMs, GRUs, and Training Issues](./05-lstms-grus-and-training-issues.md) | Vanishing gradients, LSTM, GRU | Week 2, Lecture 6 |
| [Sequence-to-Sequence Models and Attention](./06-seq2seq-and-attention.md) | Encoder-decoder models, temporal bottleneck, attention | Week 3, Lecture 7 |
| [Transformers](./07-transformers.md) | Self-attention, multi-head attention, masked attention, position embeddings | Week 3, Lecture 8 |
| [Tokenization](./08-tokenization.md) | Word/character/subword/byte tokenization, BPE, WordPiece, SentencePiece | Week 3, Lecture 9 |
| [Pretraining and Transfer Learning](./09-pretraining-and-transfer-learning.md) | ELMo, BERT, GPT, BART, T5, fine-tuning | Week 4, Lectures 10-11 |
| [Data Annotation and Bias](./10-data-annotation-and-bias.md) | Benchmarks, annotation pipelines, artifacts, bias mitigation | Week 5, Lecture 13-14 |
| [Evaluation of AI Systems](./11-evaluation-of-ai-systems.md) | Modern evaluation, leaderboard pitfalls, LLM-as-a-judge, robustness | Week 5 guest lecture |

## Suggested Reading Order

1. Start with `01` and `02` for the Week 1 foundations.
2. Read `03` to `06` for the sequence modeling progression.
3. Read `07` and `08` together because transformers and tokenization interact in practice.
4. Read `09` to understand the modern pretrain-then-finetune paradigm.
5. Finish with `10` and `11` because model quality depends on both data quality and evaluation quality.

## Conventions

- "Covered in" means where the topic was mainly taught, not the only place it appeared.
- "Quick intuition" sections are intentionally informal.
- These are structured study notes, not a verbatim transcript of the lectures.
