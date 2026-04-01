# Text Generation / 文本生成

## 高频概念

- `teacher forcing`
- `exposure bias`
- `greedy decoding`
- `beam search`
- `temperature`
- `top-k`
- `top-p`
- `degeneration`
- `sequence-level training`

## 高频结论

- 训练目标和推理目标不完全一致。
- `teacher forcing` 会带来 `exposure bias`。
- 开放式生成中，采样往往比纯 `beam search` 更自然。
- 高概率序列不一定是高质量序列。

## 建议优先会区分

- `greedy` vs `beam search`
- `top-k` vs `top-p`
- token-level 训练 vs sequence-level 优化
