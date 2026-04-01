# In-Context Learning and Post-Training / 上下文学习与后训练

## 高频概念

- `zero-shot`
- `one-shot`
- `few-shot`
- `in-context learning`
- `chain-of-thought`
- `instruction tuning`
- `reward model`
- `RLHF`
- `PPO`
- `DPO`
- `RLVR`

## 高频对比

### base model vs instruct model

- `base model`：更接近原始语言模型
- `instruct model`：经过后训练，更适合按人类意图工作

### RLHF vs DPO

- `RLHF`：偏好数据 + 奖励模型 + 策略优化
- `DPO`：更直接地从偏好数据优化模型

## 高频结论

- `in-context learning` 不更新参数，只靠上下文适配任务。
- `instruction tuning` 把模型从续写器推向助手模型。
- `post-training` 是现代助手模型可用性的关键来源。
