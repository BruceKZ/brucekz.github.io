# Data Annotation and Evaluation / 数据标注与评测

Covered in: Week 5 (`13+14-data-artifacts`, `angelika_romanou-nlp-evaluation-guest-lecture`)

这一部分可分为两条相连的线：

- 数据是怎么被构建出来的
- 模型又是怎么被评测的

两者都直接影响“分数到底代表什么”。

如果前面几周更多是在问“模型怎么学”，这一周开始更明确地问：

- 模型到底学到了什么
- 我们怎么知道它真的学到了
- 分数里有多少是真的能力，多少只是捷径

这部分内容在现代 NLP 和 LLM 讨论里非常核心。

## task、dataset、benchmark 的区别

- `task`：抽象问题
- `dataset`：某个任务对应的一组样本
- `benchmark`：用于评测和比较模型的一套数据与协议

高 benchmark 分数不等于真正掌握了 task 的广义能力。

这个区分重要，是因为很多讨论会在三个层级之间滑动：

- 某个数据集上做得好
- 不等于整个 benchmark 维度都强
- 更不等于真正掌握了抽象任务能力

很多“模型已经会推理了”一类结论，实际上都应该先问清楚：到底是在说 task、dataset，还是 benchmark。

## benchmark 的构建流程

一个比较规范的流程通常包括：

1. 明确定义任务
2. 设计 annotation guidelines
3. 做 pilot study
4. 检查早期数据
5. 再扩到大规模采集

这里 `pilot` 很重要，因为很多问题在数据收集阶段就已经产生。

如果前期任务定义和标注规则不清楚，那么后面规模再大，也只是把不清楚的东西更大规模地复制出来。

因此 benchmark 质量并不是规模越大越自然保证，而是从任务定义开始就要控制。

## 标注质控

常见质控手段包括：

- 多人标同一样本
- 计算 `inter-annotator agreement`
- 资格筛选
- 过滤低质量标注者

常见协议指标包括：

- `Cohen's kappa`
- `Fleiss' kappa`
- `Krippendorff's alpha`

这些指标背后的直觉很简单：

- 不同标注者是否能在同一规则下给出相近判断

如果 agreement 很低，可能意味着：

- 任务本身定义模糊
- 标注规范不清楚
- 样本质量有问题

因此 agreement 不只是“打分统计”，它经常暴露 benchmark 设计本身的问题。

## annotation artifacts

`annotation artifacts` 指的是：

- 和真正任务能力无关
- 但模型可以利用的表面模式

例如某类标签常常伴随固定措辞，于是模型可能学到的是标签写作习惯，而不是真正推理过程。

这类伪特征之所以危险，是因为它会制造一种假象：

- 分数看起来很高
- 但模型掌握的不是研究者本来想测的能力

benchmark 可能无意中奖励“会做捷径题”的模型。

## annotator bias

另一个问题是 `annotator bias`。

如果一个数据集主要由少数标注者贡献，那么模型可能会学到：

- 某些人的表达风格
- 某些人的写作习惯

而不是任务本身的规律。

如果一个模型能根据写作习惯猜出标签，那它学到的就是数据构建者留下的痕迹，而不是目标能力。

因此“谁来写、怎么写、写了多少”本身都会进模型。

## 常见缓解办法

课程里提到的典型方法包括：

- `re-balancing`
- `contrast sets`
- `data augmentation`
- `adversarial filtering`
- `bias-aware modeling`
- `datasheets for datasets`

这些方法虽然形式不同，但都在做同一件事：

- 想办法让模型更难只靠表面模式得高分

例如：

- `contrast sets` 会检查模型是否真的抓住了关键因素
- `adversarial filtering` 会尽量筛掉容易被弱模型走捷径解决的样本
- `datasheets` 则是在记录数据来源和风险，降低后续误用概率

## evaluation 为什么不是“报一个分数”

评测不只是记录结果，它还在定义研究目标。

如果评测方案有问题，整个领域都会被带向不合适的优化方向。

因此评测不是研究的最后一步附属工作，而是会反过来塑造：

- 哪些模型会被认为更强
- 哪些能力会被优先优化
- 哪些研究方向会获得更多注意力

这也是课程把评测单独拿出来讲的原因。

## leaderboard illusion

榜单上的小分差不一定对应真实能力差。

课件里列出的常见来源包括：

- `prompt formatting`
- 实现细节
- `dataset contamination`
- `sampling variance`
- benchmark 选择和规模差异

很多榜单排名是“模型 + prompt + implementation + benchmark choice”的联合结果，而不是一个纯粹、稳定、无上下文的能力值。

因此看到分数差距时，最应该先问的是：

- 这个差距稳不稳定
- 是不是可复现
- 到底是在测什么

## perplexity 与 lexical overlap metrics 的边界

### perplexity

它衡量模型给真实文本分配概率的能力，但不直接衡量：

- 推理
- 事实性
- 指令跟随
- 实用性
- 对齐程度

所以即使一个模型 `perplexity` 很低，也不能直接推出它：

- 推理就更强
- 更会按指令工作
- 更符合用户偏好

这类能力往往需要其他评测方式。

### lexical overlap metrics

经典指标包括：

- `BLEU`
- `ROUGE`
- `METEOR`

它们的共同问题是过度依赖词面重合，在开放式生成里很容易误罚合理改写。

这是因为开放式生成往往有多种正确答案：

- 语义一致
- 词面不同

而 lexical overlap 指标更适合参考答案相对固定的场景。

## LLM-as-a-judge

用强模型来评估另一个模型的输出，可以显著降低人工成本。

但它本身会引入偏差，例如：

- `position bias`
- `prompt sensitivity`
- `self-preference bias`

因此它不能被直接当成无误差真值。

更准确地说：

- `LLM-as-a-judge` 是一种可扩展近似器
- 它本身也需要被校验和约束

如果不做校验，可能只是把人工偏差换成了新的系统性机器偏差。

## 为什么现代评测越来越像“评测流水线”

因为评测结果不只取决于模型参数，还取决于：

- 输入格式
- prompt
- 推理策略
- 后处理
- 指标选择

所以现代评测越来越像一个完整 pipeline，而不是“喂数据集，吐一个分数”。

## 稳健评测通常是组合式的

现代评测更常采用多种方法组合，而不是迷信单一数字，例如：

- benchmark
- human evaluation
- `LLM-as-a-judge`
- robustness testing
- system-level evaluation

组合式评测的意义在于：

- 不同方法覆盖不同维度
- 一种方法的盲区可以被另一种补上

例如 benchmark 分数可以给出大规模可比性，人类评测可以补主观质量和真实使用感受，鲁棒性测试则能暴露失败模式。

## 需要记住的结论

- 数据集分数高不等于真正理解任务。
- `annotation artifacts` 和 `annotator bias` 都会直接进入模型行为。
- `leaderboard` 上的小分差未必有实际意义。
- 现代评测更依赖多种互补方法，而不是单一分数。
- 评测本身会定义研究方向，因此评测设计也是科学问题的一部分。
