# Attention, Transformers, and Tokenization / 注意力、Transformer 与切分

## seq2seq 与 attention

- `seq2seq`：输入序列到输出序列
- 早期 `encoder-decoder` 有 `temporal bottleneck`
- `attention` 允许 decoder 每一步直接访问输入各位置状态

## transformer 高频点

- `self-attention` 替代循环
- `multi-head attention` 学多种关系模式
- block 标准组件：
  - `attention`
  - `feed-forward`
  - `residual`
  - `LayerNorm`
- decoder 需要 `causal mask`
- `position embeddings` 用来补顺序信息

## tokenization 高频点

至少要区分：

- word-level
- character-level
- subword-level
- byte-level

至少要认识：

- `BPE`
- `WordPiece`
- `SentencePiece`
