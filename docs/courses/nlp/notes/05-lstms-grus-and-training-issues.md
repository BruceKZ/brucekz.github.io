# LSTMs, GRUs, and Training Issues in RNNs / LSTM、GRU 与训练问题

Covered in: Week 2, Lecture 6 (`6-RNNs-continued+LSTMs+GRUs`) and Week 3 recap

这里讨论的是 `RNN` 真正难用的地方，也就是梯度传播和长期依赖，然后引出 `LSTM` / `GRU` 这种门控结构。

## 梯度消失问题

当 `RNN` 沿时间展开很多步之后，梯度会连续乘上一串 `Jacobians`。
如果这些因子经常小于 1，梯度就会指数级缩小。

直接后果是：

- 早期 `tokens` 几乎收不到学习信号
- 长距离依赖会变得很难学

对使用饱和激活函数的 `vanilla RNN` 来说，这个问题尤其明显。

和它并列的另一个训练问题是 `exploding gradients`。
虽然课上这里的主角是 `vanishing gradients`，但实际训练 `RNN` 时也常会配合 `gradient clipping` 来控制梯度爆炸。

## 训练可达性与有效上下文

从表达能力上说，`vanilla RNN` 理论上可以拥有无限长上下文。
但从训练角度说，它常常根本用不上这么长的历史。

所以这里要区分两件事：

- `theoretical capacity`
- `effective trainability`

模型“理论上能表示”，不等于它“训练时真能学到”。

## 门控循环网络

一个自然的修正思路，就是让模型自己控制信息流。

也就是说，不再把所有记忆更新都塞进同一个非线性变换里，而是显式地让网络决定：

- 什么该保留
- 什么该覆盖
- 什么该暴露到当前输出

这就是 `gated recurrent networks` 的基本想法。

## LSTM 结构

`LSTM` 引入了几类关键部件：

- `forget gate` `f_t`
- `input gate` `i_t`
- `output gate` `o_t`
- 候选内容 `\tilde{c}_t`
- `cell state` `c_t`

核心更新公式是：

$$
c_t = i_t \odot \tilde{c}_t + f_t \odot c_{t-1}
$$

$$
h_t = o_t \odot \phi(c_t)
$$

### 各个 gate 的直观含义

- `forget gate` 决定旧记忆留多少
- `input gate` 决定新信息写多少
- `output gate` 决定当前暴露多少内部记忆

如果用最粗糙的话记，就是“忘多少、写多少、露出多少”。

要区分两个量：

- `cell state` 更像长期记忆通道
- `hidden state` 更像当前时刻暴露给外部的表示

## LSTM 为什么有效

`LSTM` 的关键不是多了几个门这么简单，而是 `cell state` 给梯度提供了更直接的通路。

简化地看：

$$
\frac{\partial c_t}{\partial c_{t-1}} = f_t
$$

如果 `forget gate` 长时间保持开放，信息和梯度都可以更稳定地穿过很多时间步。
这就是它比 `vanilla RNN` 更能处理长期依赖的原因。

## GRU 结构

`GRU` 可以看成更简化的门控版本。
它通常只保留较少部件，例如：

- `update gate`
- `reset gate`

和 `LSTM` 相比，它一般有这些特点：

- 结构更简单
- 参数更少
- 训练和推理通常更快
- 某些任务上效果和 `LSTM` 很接近，甚至更好

但在某些场景下，它也可能不如完整 `LSTM` 灵活。

从考试角度看，`GRU` 和 `LSTM` 的对比一般不会要求你背所有公式，但经常会考“谁的门更多、谁更轻量、谁通常更快”。

## 实践中的权衡

`LSTM` / `GRU` 的优点是：

- 比 `vanilla RNN` 更能学习长距离依赖
- 显著缓解 `vanishing gradient`
- 仍然适合逐 token 处理的场景

代价也很明确：

- 参数量高于 `vanilla RNN`
- 时序计算仍然是串行的
- 面对非常长的上下文时，仍然不如后来的 `transformer`

## Cell state 可能编码的内容

课上还强调了一个重要直觉：`cell state` 不是纯黑盒。
单个记忆维度有时会学到相当可解释的模式，例如：

- 当前是否在引号内部
- 代码里当前缩进层级
- 某些持续很多步存在的潜在状态

所以循环记忆并不只是“一个抽象向量”，它经常会发展出结构化行为。

## 核心概念

- **梯度消失：** `vanishing gradient` 会让早期 token 几乎收不到训练信号。
- **训练可达性：** 理论上的无限上下文，不等于实践里真的能学到长依赖。
- **LSTM 门控：** `LSTM` 通过 `forget/input/output gates` 控制信息流。

## 高频结论

- **Cell state：** `cell state` 是 `LSTM` 里让梯度更稳定传播的关键通道。
- **GRU 对比：** `GRU` 更轻量、参数更少，很多场景下效果接近 `LSTM`。
- **结构上限：** 门控循环网络缓解了训练问题，但没有消除串行计算瓶颈。

## 小结

`LSTM` 和 `GRU` 的意义，在于它们通过 `gates` 控制记忆和梯度流动，让循环模型终于能在更长时间跨度上被稳定训练，但它们仍然保留了序列计算的串行瓶颈。
