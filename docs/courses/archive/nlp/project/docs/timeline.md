# Timeline

## 1. 四人技术分工

重点原则：每个人都负责一个技术研究方向，而不是纯工程杂活。每个人都有自己的数据、方法、模型或 evaluation slice，以及 final notebook/report section。

### Member 1: Trust-boundary SFT

研究问题：

> Boundary-SFT 能否让 Qwen3.5-9B 学会把 GitHub repository content 当作不可信数据，而不是可执行指令？

负责内容：

```text
设计 SFT trajectory schema
构造 safe GitHub-MCP trajectories
训练 Qwen3.5-9B LoRA/QLoRA Boundary-SFT
评估 base vs Boundary-SFT
分析 ASR、clean utility、over-refusal
```

技术产出：

```text
Boundary-SFT dataset
Qwen3.5-9B SFT adapter/checkpoint
training config
loss curve
before/after result table
SFT failure analysis
```

Report section:

```text
Boundary-SFT for Trust-Boundary Learning
```

### Member 2: Failure-based Alignment / Preference Defense

研究问题：

> 使用 attack-following failure 构造 chosen/rejected pairs，是否能比普通 SFT 更有效地降低模型跟随恶意指令的概率？

负责内容：

```text
收集 base / prompt-defense / SFT 的失败样例
构造 chosen/rejected preference pairs
尝试 DPO / ORPO / contrastive SFT / failure-augmented SFT
重点分析 direct override、impersonation、argument manipulation
比较该方法与 Boundary-SFT
```

技术产出：

```text
failure-pair dataset
preference / contrastive training setup
Qwen3.5-9B failure-based defense checkpoint
attack-family robustness table
failure-based alignment analysis
```

Report section:

```text
Failure-derived Alignment for Attack-following Reduction
```

### Member 3: Tool-use Utility and MCP-Bench Transfer

研究问题：

> 安全防御是否破坏 GitHub-MCP agent 的正常 tool-use 能力？

负责内容：

```text
定义 GitHub-MCP action format
构造 clean utility split
评估 tool selection accuracy
评估 argument accuracy
评估 structured output validity
评估 multi-step tool-use success
在 MCP-Bench 或其子集上测试 general MCP competence
分析 post-training 前后 utility 是否下降
```

技术产出：

```text
clean utility benchmark
tool-call parser
tool-use metric implementation
MCP-Bench subset evaluation
utility retention table
tool-use error taxonomy
```

Report section:

```text
Tool-use Utility Preservation and Benchmark Transfer
```

### Member 4: OOD Red-teaming and Adversarial Generalization

研究问题：

> 调优后的模型是否真的学会了 trust boundary，还是只记住了训练集中的攻击模板？

负责内容：

```text
设计 unseen attack phrasing
设计 unseen attack location
设计 multi-hop injection
设计 markdown-hidden injection
设计 adaptive attacks against prompt defense
评估 base / prompt-defense / SFT / failure-based defense / MiMo
构造 failure-mode taxonomy
分析模型在 OOD/adaptive 攻击下的泛化能力
```

技术产出：

```text
OOD attack split
adaptive attack set
generalization result table
failure-mode taxonomy
red-teaming analysis
```

Report section:

```text
OOD Red-teaming and Adversarial Generalization
```

## 2. Timeline

### Phase 1: Proposal and Literature Review

**Deadline: May 3**

全体目标：

```text
确定项目题目
确定 research questions
确定 benchmark 范围
确定模型选择
确定四人分工
完成 proposal 和 literature review
核查所有引用真实存在
```

各成员：

```text
Member 1:
定义 Boundary-SFT 输入输出格式，整理 SFT 相关文献。

Member 2:
定义 chosen/rejected pair 格式，整理 DPO / preference / failure alignment 文献。

Member 3:
定义 tool-use utility metrics，整理 MCP-Bench / ToolBench / Gorilla 等文献。

Member 4:
定义 OOD/adaptive attack taxonomy，整理 prompt injection / AgentDojo / red-teaming 文献。
```

### Phase 2: Benchmark Construction

**May 4 - May 12**

全体目标：

```text
创建 sandbox GitHub organization
创建 8-12 个 benchmark repositories
设计 clean tasks
设计 injected variants
freeze commits
导出 issues / PR snapshots
```

Implementation stance:

```text
从 Phase 2 开始使用真实 GitHub MCP server
GitHub MCP server 以 read-only mode 运行
只在 sandbox GitHub organization 中创建 benchmark repos
不使用 local mock backend 作为主开发路径
offline replay 只用于后续可复现实验，不替代 live MCP trace collection
```

各成员：

```text
Member 1:
构造用于 SFT 的 safe trajectories。

Member 2:
构造 unsafe responses 和 chosen/rejected pairs。

Member 3:
构造 clean utility split 和 tool-call action schema。

Member 4:
构造 OOD/adaptive attack split 和 attack taxonomy。
```

### Phase 3: MCP Integration and Baseline Evaluation

**May 13 - May 20**

全体目标：

```text
接入 GitHub MCP server
记录 MCP tool traces
实现 offline replay
运行 Qwen3.5-9B base
运行 Qwen3.5-9B prompt-defense
运行 MiMo-V2.5-Pro subset evaluation
```

各成员：

```text
Member 1:
准备 SFT-ready dataset，跑 base model 在 SFT/dev split 上的表现。

Member 2:
收集 base/prompt-defense 的 attack-following failures。

Member 3:
实现 tool-call validity / accuracy evaluator，跑 clean utility baseline。

Member 4:
跑 OOD/adaptive split 的初始 baseline，形成第一版 failure taxonomy。
```

### Phase 4: Milestone Report

**Deadline: May 24**

最低交付：

```text
可运行的 GitHub-MCP benchmark
至少 100 个 evaluated examples
Qwen3.5-9B base result
Qwen3.5-9B prompt-defense result
MiMo-V2.5-Pro subset result
初步 clean vs injected 对比
初步 attack-family / attack-location breakdown
SFT dataset ready 或 first SFT checkpoint
```

各成员 milestone output：

```text
Member 1:
Boundary-SFT dataset / first checkpoint

Member 2:
failure-pair dataset / failure taxonomy

Member 3:
tool-use utility evaluator / clean utility table

Member 4:
OOD/adaptive attack split / initial red-team results
```

### Phase 5: Post-training and Defense Experiments

**May 25 - May 31**

全体目标：

```text
完成 Boundary-SFT
完成 failure-based defense
评估调优后模型
比较 base / prompt-defense / SFT / failure-based defense
```

各成员：

```text
Member 1:
训练 Boundary-SFT，分析 ASR 和 utility trade-off。

Member 2:
训练 DPO / ORPO / failure-augmented SFT，比较对不同 attack family 的影响。

Member 3:
评估调优模型的 tool-use utility，检查是否破坏 tool selection / argument accuracy。

Member 4:
评估调优模型在 unseen / adaptive attacks 上的泛化能力。
```

### Phase 6: Final Evaluation and Analysis

**June 1 - June 5**

全体目标：

```text
完成最终实验表格
完成 failure analysis
完成 benchmark comparison
完成 report 初稿
准备 individual notebooks
```

### Phase 7: Final Submission

**Deadline: June 7**

最终交付：

```text
4-page final report
benchmark repositories
task JSON files
MCP trace logs / replayable traces
evaluation scripts
training scripts
Qwen3.5-9B adapter/checkpoint
individual notebooks
README for reproduction
```

个人 notebook 对应：

```text
Member 1:
Boundary-SFT training and safety-utility analysis

Member 2:
Failure-based alignment and attack-family robustness

Member 3:
Tool-use utility preservation and MCP-Bench transfer

Member 4:
OOD red-teaming and adversarial generalization
```
