# Pretraining and Transfer / 预训练与迁移

## 高频对比

### ELMo

- 双向 `LSTM` 上下文化表示
- 还不是原生统一双向编码

### BERT

- `encoder-only`
- `masked LM`
- 更偏理解 / 表示学习

### GPT

- `decoder-only`
- `causal LM`
- 更偏生成

### BART

- `encoder-decoder`
- 去噪预训练

### T5

- `text-to-text` 统一接口

## 高频补点

- `RoBERTa`：更强训练策略下的 BERT 系模型
- `DistilBERT`：蒸馏压缩版 BERT
- BART 常见 corruption：`text infilling + sentence permutation`

## 高频结论

- 现代 NLP 的关键变化是从“迁移词向量”转向“迁移整套预训练模型”。
- `fine-tuning` 往往强于只抽取冻结表示。
