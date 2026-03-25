# Data Annotation and Bias / 数据标注与偏差

Covered in: Week 5, Lecture 13-14 (`13+14-data-artifacts`)

这里的重点不是 `model architecture`，而是数据如何被定义、被标注，以及偏差怎样在数据阶段就进入系统。

## benchmark、dataset、task 的区别

这几个概念要先分清：

- `task` 是抽象问题本身
- `dataset` 是这个问题对应的一组具体样本
- `benchmark` 是用来比较模型的一套评测数据，可能是单个数据集，也可能是一组数据集

这个区分很重要，因为模型在某个 `benchmark` 上分数高，不等于它真的掌握了这个 `task` 的广义能力。

## benchmark 的作用

`benchmark` 有几个明显作用：

- 统一比较标准
- 方便观察进展
- 让不同方法面对同一套测试条件

但它也会反过来塑造研究方向。
如果 `benchmark` 自身有偏差，整个领域就可能一起朝错误目标优化。

## benchmark 的构建流程

一个像样的 `benchmark pipeline` 通常包括：

1. 明确定义任务
2. 编写标注规范
3. 做 `pilot study`
4. 检查早期数据
5. 再大规模采集

其中 `pilot stage` 很关键，因为糟糕的说明文档会直接产出糟糕标签。

## 标注规范 guidelines

`annotators` 需要的是可操作的任务定义，而不是含糊的大方向。
如果说明不清楚，标注者就会自己发明捷径。

所以 `annotation guidelines` 不是行政细节，而是数据质量的一部分。

## 大规模标注中的质控

做大规模标注时，常见的质控手段包括：

- 一个样本多次标注
- 计算 `inter-annotator agreement`
- 标注者资格筛选
- 过滤低质量标注者

课上提到的协议指标包括：

- `Cohen's kappa`
- `Fleiss' kappa`
- `Krippendorff's alpha`

## 标注伪特征 annotation artifacts

课程里非常强调的一点是，很多数据集会带有 `annotation artifacts`，也就是和真正任务目标无关、但能帮助模型投机取巧的表面线索。

例如在一些 `NLI` 数据里：

- `contradiction` 往往更常出现否定词
- `neutral` 往往更常出现新增信息

于是模型可能不是在做真正推理，而是在抓标签偏好模式。

## artifact 带来的问题

一旦模型学的是捷径，结果通常会是：

- `benchmark score` 变高
- 真正理解能力并没有同步提升
- `OOD generalization` 很差

也就是说，数据集可能奖励的是模式利用，而不是真正的能力。

## 标注者偏差

另一个隐蔽问题是 `annotator bias`。

- 很多数据集实际由少数几位标注者主导
- 每个人会有自己的表达习惯
- 模型可能学到的是“某个标注者怎么写”，而不是“任务本身应该怎么判断”

这说明数据构建细节会直接渗进模型行为。

## 缓解思路

课程里提到的典型应对方法包括：

### Re-balancing

重新调整数据分布，让标签不那么容易被表层模式预测出来。

### Contrast sets

构造受控扰动样本，专门测试模型到底有没有学到目标能力。

### Data augmentation

增加更多多样化样本，降低模型对少数表层模式的依赖。

### Adversarial filtering

把那些简单的、会被弱模型靠捷径解决的样本筛掉。

### Bias-aware modeling

显式引入偏差模型或组合模型，压低浅层线索的影响。

### Datasheets for datasets

把数据集的来历和风险记录清楚，例如：

- 为什么采这个数据
- 谁做的
- 标签怎么来的
- 有哪些限制和潜在风险

这既是技术问题，也是治理问题。

## 数据与模型的关系

模型表现从来不是只由架构决定的。
一个更强的模型，如果喂的是有缺陷的数据，很多时候只是更擅长学会捷径而已。

## 小结

评估模型之前，先理解数据集本身。`benchmark` 的质量取决于任务定义、标注流程、标注者行为和伪特征控制；如果这些环节有问题，分数本身就不可靠。
