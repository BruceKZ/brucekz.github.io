# Language Models and RNN Family / 语言模型与循环模型

## language model 基础

- 目标：给序列分配概率
- 基础分解：`chain rule`
- 经典近似：`Markov assumption`

## `n`-gram 高频点

- 固定窗口
- 稀疏问题
- `perplexity` 是内部评测指标
- `smoothing` 的本质是给未见事件保留概率质量

至少要认识：

- `Laplace smoothing`
- `back-off`
- `interpolation`
- `absolute discounting`

## RNN 高频点

- 用隐藏状态累计历史
- 参数在时间上共享
- 训练依赖 `BPTT`

## vanilla RNN 的核心问题

- `vanishing gradients`

## LSTM / GRU

- 都是门控循环结构
- 目标都是缓解长距离训练困难
- `GRU` 通常比 `LSTM` 更简化
