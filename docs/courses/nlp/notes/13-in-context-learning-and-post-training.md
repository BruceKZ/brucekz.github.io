# In-Context Learning and Post-Training / 上下文学习与后训练

Covered in: Week 7, Lecture 23 (`23-gpt-3+prompting+post-training`)

这一讲的主线是：`foundation models` 在规模变大以后，不再只靠参数更新学任务，还能通过 `prompt` 在上下文里临时适配任务；而真正让它们变得“像助手”的关键，则来自后续的 `post-training`。

## 从预训练模型到可用助手

一个只做 `next-token prediction` 训练的 `base model`，本质上学到的是：

- 语言分布
- 模式续写
- 大规模知识压缩

但它不一定天然擅长：

- 按指令回答
- 稳定遵守格式
- 拒绝危险请求
- 贴近用户偏好

所以现代大模型流程通常不止有 `pretraining`，后面还会接一整套 `post-training`。

## In-context learning

`in-context learning` 指的是：不给模型做梯度更新，只把任务说明、示例和输入一起放进上下文里，模型就能当场完成新任务。

常见形式包括：

- `zero-shot`
- `one-shot`
- `few-shot`

它们的区别只是上下文里是否提供示例，以及示例数量多少。

## Prompt 作为任务条件

从这个角度看，`prompt` 不只是自然语言输入，它其实在扮演任务描述器的角色。

上下文里可以包含：

- 任务说明
- 输出格式
- 风格约束
- 若干输入输出示例

模型据此推断“当前该做什么”，而不是再通过参数更新去学一次任务。

这也是 `GPT-3` 之后一个非常重要的范式变化：很多过去要专门 `fine-tune` 的任务，现在可以先试试 `prompting`。

## Few-shot 的作用

`few-shot examples` 往往能告诉模型三件事：

- 输入长什么样
- 输出该长什么样
- 这个任务到底关注哪种映射关系

所以示例的价值不仅是“给答案”，更是在给模型定义任务接口。

不过 `few-shot prompting` 也有明显限制：

- 占用上下文窗口
- 对示例顺序和措辞敏感
- 不是所有任务都稳定

## Emergent abilities 与规模效应

课程里这部分通常会和 `GPT-3` 联系起来理解：随着模型规模、数据规模和计算量增长，一些在小模型上不明显的行为会变得更可靠，例如：

- 更强的 `few-shot learning`
- 更稳定的格式跟随
- 更好的跨任务泛化

这里的核心不是“模型突然有魔法”，而是规模使得模型更能在上下文里利用模式匹配和隐式任务归纳。

## Instruction tuning

虽然 `few-shot prompting` 很强，但光靠 base model 仍然不够稳定。

`instruction tuning` 的做法是：

- 收集大量“指令 -> 理想回答”样本
- 用监督学习继续训练模型
- 让模型学会更自然地响应人类任务描述

调完之后，模型会更像一个 `assistant model`，而不只是续写器。

直观上可以把它理解为：`pretraining` 教模型“会说话”，`instruction tuning` 教模型“听懂别人要你做什么”。

## Preference tuning 和对齐

即使经过 `instruction tuning`，模型输出仍可能：

- 太冗长
- 不够有帮助
- 风格不稳
- 在安全边界上做得不好

所以后面还会有 `preference optimization`。

常见思路是：

- 收集人类偏好比较数据
- 训练 `reward model`，或者直接做偏好优化
- 继续调整模型输出风格

相关路线包括：

- `RLHF`
- `RLAIF`
- `DPO`

它们目标不同、实现不同，但方向一致：让模型输出更接近“人类更偏好的回答”，而不只是高似然文本。

## Post-training 在做什么

今天常说的 `post-training`，通常不是单一步骤，而是一串操作组合：

- `supervised fine-tuning`
- `instruction tuning`
- preference tuning
- safety alignment
- format tuning
- 有时还包括 tool-use 或 agent-style data

它的作用是把“会续写的基座模型”变成“更能执行任务的产品模型”。

## Base model 和 instruct model 的区别

一个容易考也很实用的区分是：

- `base model`：更接近原始语言模型，擅长建模文本分布
- `instruct model`：经过 post-training，更擅长按人类意图响应

前者不一定更“差”，只是目标不同。
很多时候 base model 更原始、更开放，而 instruct model 更可控、更适合真实交互。

## Prompting 仍然重要

做了 `instruction tuning` 以后，并不意味着 `prompt engineering` 没用了。

相反，好的 prompt 仍然会影响：

- 任务理解
- 输出结构
- 推理稳定性
- 安全边界

只是现代模型里，prompt 的角色从“强行教模型任务”逐渐转向“清晰指定当前任务和输出约束”。

## 核心概念

- **In-context learning：** 不更新参数，只靠上下文里的说明和示例完成新任务。
- **Instruction tuning：** 用指令数据监督训练，让模型更像助手而不是纯续写器。
- **Post-training：** 通过偏好优化和安全对齐，把 base model 调整成更实用的产品模型。

## 高频结论

- **提示即任务接口：** `prompt` 和示例可以在上下文里临时定义任务，而不一定要重新训练模型。
- **可用性来自后训练：** 真正让大模型更听话、更稳、更像助手的关键步骤，通常发生在 `post-training` 阶段。
- **Base 不等于 Instruct：** 两者服务目标不同，不能只用一个统一标准比较。

## 小结

现代 LLM 的能力，已经不只是“预训练得够不够大”。真正的产品化能力来自两层东西一起工作：一层是模型在上下文里做任务归纳的 `in-context learning`，另一层是把模型行为往“更有帮助、更可控”方向推的 `post-training`。
