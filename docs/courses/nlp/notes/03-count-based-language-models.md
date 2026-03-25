# Count-Based Language Models / 计数语言模型

Covered in: Week 2, Lectures 4-5 (`4+5-EarlyLMs+RNNs-Start`)

这里的核心问题是怎样把“句子有多自然”写成概率问题，以及 `n-gram` 为什么既有效又很快碰到上限。

## 语言模型的定义

`language model` 的任务，是给一个词序列分配概率：

$$
P(w_1, w_2, \dots, w_n)
$$

这就是把“这句话看起来有多像自然语言”形式化成概率表达。

## 概率链式法则

根据概率的 `chain rule`：

$$
P(w_1, \dots, w_n) = \prod_{i=1}^{n} P(w_i \mid w_1, \dots, w_{i-1})
$$

这说明语言建模可以被拆成一连串 `next-token prediction`。

用中文直说，就是整句话的概率等于“前面都给定时，下一个词出现的概率”一路乘下去。

## 精确建模为什么不可行

如果我们真的对完整前缀做精确条件建模，参数空间会迅速爆炸。
有限语料里，绝大多数长上下文根本不会出现足够多次。

所以经典语言模型必须做近似。

## 马尔可夫假设与 n-gram

最常见的近似就是 `Markov assumption`，也就是只保留最近的上下文：

$$
P(w_i \mid w_1, \dots, w_{i-1}) \approx P(w_i \mid w_{i-k}, \dots, w_{i-1})
$$

这就得到 `n-gram` 模型：

- `unigram`：各词彼此独立
- `bigram`：只看前一个词
- `trigram`：只看前两个词
- 更高阶也是同理

这个近似的代价非常明确：模型把“很久以前的上下文”全部截断掉了。
所以 `n-gram` 的能力上限从一开始就和窗口大小绑死。

## n-gram 的优点

`n-gram` 的优势非常直接：

- 结构简单
- 可解释性强
- 只要数据够多，效果并不差
- 训练方式清楚，就是统计计数

这也是它在早期 NLP 里长期有效的原因。

## 困惑度 perplexity

`perplexity` 是经典语言模型最常见的 `intrinsic metric`。

直觉上：

- `perplexity` 越低，说明模型对下一个词越不迷惑
- `perplexity` 越高，说明模型越不确定

它和平均负对数似然的指数形式密切相关。
也可以把它理解成：模型平均看来，自己像是在多少个“同样可能的选项”里做选择。

考试里经常会考一句定性判断：`perplexity` 越低，通常说明模型对测试语料分配的概率越高。
但它是 `intrinsic evaluation`，只反映语言模型内部预测质量，不直接等价于任务效果。

## 数据稀疏问题

`n-gram` 最大的问题是稀疏。
很多 `n-grams` 在训练集里根本没出现过。

于是就会出现：

$$
P(\text{unseen n-gram}) = 0
$$

只要乘积里有一项变成 0，整句话的概率就直接归零，`perplexity` 也会跟着失真。

## 平滑 smoothing

`smoothing` 的目标，是给没见过的事件也留下一点概率质量。

课上提到的主要策略包括：

- `additive / Laplace smoothing`
- `discounting`
- `back-off`
- `interpolation`

### Laplace smoothing

对 `bigram` 来说，可以写成：

$$
P(w_i \mid w_{i-1}) = \frac{C(w_{i-1}, w_i) + \alpha}{C(w_{i-1}) + \alpha |V|}
$$

它很直观，但通常不是实际效果最好的方案。

原因在于 `Laplace smoothing` 会给大量未见事件平均分配概率质量，往往把真实出现过的高频事件也压得过低。

### Back-off

如果高阶 `n-gram` 太稀疏，就退回到低一阶模型。

### Interpolation

也可以把多个阶数的模型按权重混合：

$$
P = \lambda_1 P_{\text{unigram}} + \lambda_2 P_{\text{bigram}} + \cdots
$$

## 局限

哪怕做了 `smoothing`，`n-gram` 仍然有明显结构上限：

- 上下文窗口是固定的
- 不会在不同但相近的词之间共享语义
- 阶数越高，对数据和参数的需求涨得越快

例如：

- `students opened their`
- `pupils opened their`

人很容易知道这两个前缀很像，但朴素 `n-gram` 并不会自动共享这种知识。

## 核心概念

- **语言模型：** `language model` 的任务是给整个序列分配概率。
- **链式分解：** `chain rule` 把序列概率拆成一串条件概率。
- **核心近似：** `Markov assumption` 是 `n-gram` 的基础，也直接带来固定窗口限制。

## 高频结论

- **Perplexity：** `perplexity` 是经典语言模型最常见的内部评测指标，越低通常越好。
- **稀疏问题：** 未见 `n-gram` 概率变成 0，是计数模型最典型的失败模式。
- **Smoothing：** 平滑的本质是重新分配概率质量，让未见事件不至于完全不可能。

## 小结

计数语言模型把句子概率问题转成了局部条件概率估计问题，但它始终受制于稀疏性、固定窗口和缺乏语义共享，这也是后续神经语言模型要解决的核心缺陷。
