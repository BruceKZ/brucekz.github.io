# Evaluation of AI Systems / AI 系统评测

Covered in: Week 5 guest lecture (`angelika_romanou-nlp-evaluation-guest-lecture`)

这里讨论的是模型该怎样被 `evaluation`，以及为什么 `leaderboard` 上的单一数字很容易让人误判系统能力。

## 核心观点

`evaluation` 不是简单地报几个分数。
它实际上决定了：

- 我们在优化什么
- 什么样的模型会被视为更强
- 哪些研究方向会被继续投入

所以评测本身就是科学过程的一部分，而不是最后补的一张表。

## Leaderboard 幻觉

课程里一个非常重要的提醒是：`leaderboard` 上很小的分差，往往并不对应真实能力差距。

这些差异可能来自：

- `prompt formatting`
- 实现细节
- 数据污染
- 采样波动
- benchmark 选择

所以看到 `+0.5` 之类的提升时，不能默认它就一定有实质意义。

## 评测不存在单一最优方案

不同人关心的问题不一样：

- 研究者更关心能力边界
- 用户更关心是否有用、是否稳定
- 产品团队更关心真实工作流表现
- 政策和治理侧更关心风险与伤害

因此评测永远要围绕具体问题设计，而不是假设存在一个通用的“最好评测”。

## 评测流水线

一套完整的评测设置，通常不只是“数据集 + 指标”这么简单，它还包括：

- 输入格式
- `prompting method`
- 推理策略
- 后处理
- 指标
- 结果解释

像下面这些推理设置，都会实打实影响分数：

- `chain-of-thought`
- `few-shot prompting`
- `RAG`
- `tool use`

## 内在评测与下游评测

### Perplexity

`perplexity` 对语言模型有价值，因为它衡量模型给真实文本分配了多少概率。
但它并不直接衡量：

- 推理
- 事实性
- 指令跟随
- 实用性
- 对齐程度

所以 `perplexity` 有用，但只覆盖很窄的一部分能力。

### Lexical overlap metrics

经典生成指标包括：

- `BLEU`
- `ROUGE`
- `METEOR`

它们的问题在于，`LLM outputs` 往往有很多正确答案，而语义等价并不等于字面重合。
如果只看词面重叠，很多合理改写都会被误罚。

## 现代能力评测

现代模型常见的评测维度包括：

- 知识
- 推理
- 指令跟随
- 编码
- 规划或 `agent behavior`

代表性的 benchmark 类型例如：

- `GSM8K`、`AIME`、`GPQA` 这类推理评测
- `HumanEval` 这类代码评测
- `IFEval`、`WildBench`、`AlpacaEval` 这类指令跟随评测

## 对数概率评测

在结构化任务里，有时不直接看自由生成，而是比较候选答案的 `sequence log-probabilities`。

这种方式的优点是：

- 更确定
- 更容易比较
- 对接近选择题的任务很合适

局限是，它不太适合真正开放式生成。

## LLM-as-a-judge

强模型还可以拿来评另一个模型的输出，也就是 `LLM-as-a-judge`。

它吸引人的地方在于：

- 人工评测很贵
- judge model 可扩展
- 速度更快

但它也会引入新的偏差，例如：

- `position bias`
- `prompt sensitivity`
- `self-preference bias`

所以这种方法必须被校验，不能直接当真值。

## 安全性与鲁棒性

评测不能只看平均分，还要专门测失败模式。
常见关注点包括：

- `red-teaming`
- `jailbreak resistance`
- `refusal/helpfulness trade-off`
- 对 `prompt perturbation` 的鲁棒性

课程还强调了一些更高层的 `meta-evaluation` 维度，例如：

- 一致性
- 鲁棒性
- 对 benchmark 设计变化的敏感性

## 实践中的评测组合

真正搭建评测套件时，更合理的思路是先问：

- 我到底关心什么能力
- 哪个 benchmark 真的代表这种能力
- 这个 benchmark 会不会已经刷穿了
- 它和我的模型类型、部署场景是否匹配
- 结果是否可复现

成熟的评测体系通常会把这些东西组合起来：

- 标准 benchmark
- 人工评测
- `LLM-as-a-judge`
- 鲁棒性测试
- 系统级或 `agent-level` 评测

## 总结观点

`benchmark` 测到的通常只是行为切片，不是“通用智能总分”。
一个模型在榜单上看起来很好，并不意味着它在真实环境里不会犯很严重的错。

## 小结

可靠评测依赖多种互补方法、清楚的问题定义和谨慎的实验设计。对单一分数、微小提升和排行榜排序保持怀疑，是现代 AI 评测里非常基本的态度。
