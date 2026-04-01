# Data and Evaluation / 数据与评测

## 数据部分

要先区分：

- `task`
- `dataset`
- `benchmark`

高频风险：

- `annotation artifacts`
- `annotator bias`

常见缓解方法：

- `re-balancing`
- `contrast sets`
- `adversarial filtering`
- `datasheets for datasets`

## 评测部分

### leaderboard illusion

小分差未必代表真实能力差。

可能原因包括：

- prompt formatting
- implementation details
- contamination
- sampling variance

### perplexity 的边界

它不直接衡量：

- reasoning
- factuality
- instruction following
- usefulness

### LLM-as-a-judge 风险

- `position bias`
- `prompt sensitivity`
- `self-preference bias`

## 高频结论

- benchmark 分数高不等于真实能力强。
- 稳健评测更依赖多种方法组合，而不是单一指标。
