# Representations and Embeddings / 表示与词向量

## 高频对比

### one-hot vs embedding

- `one-hot`：只表示身份，不表示相似性
- `embedding`：连续表示，允许相似词共享统计规律

### CBOW vs Skip-gram

- `CBOW`：`context -> target`
- `Skip-gram`：`target -> context`

### Word2Vec vs GloVe

- `Word2Vec`：更偏局部预测
- `GloVe`：更偏全局共现统计

### 普通词向量 vs fastText

- 普通词向量：整词一个向量
- `fastText`：整词之外引入字符 `n-grams`

## 高频结论

- 词向量的核心价值是参数共享和泛化。
- 静态词向量无法处理 `polysemy`。
- `fastText` 的主要优势在于稀有词和词形变化。
