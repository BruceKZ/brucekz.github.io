# Project Structure

## 1. Design Goal

最终提交需要 5 个 Jupyter notebooks：

```text
1 个 group notebook：描述全组项目贡献
4 个 individual notebooks：每个人描述自己的技术贡献
```

为了避免核心逻辑散落在 notebooks 中，本项目采用：

```text
standard Python package
+ config-driven experiment system
+ notebooks for execution, visualization, and explanation
```

Notebook 只负责：

```text
加载配置
运行或复现某个小规模实验
展示结果表格
画图
解释个人贡献
展示 qualitative examples
```

核心 agent、MCP、evaluation、training、trace logging 逻辑全部放在 package 里。

## 2. Proposed Repository Structure

项目包名建议使用 `rpnr`，代表 **Read the Prompt, Not the README**。

```text
read_prompt_not_readme/
├── README.md
├── pyproject.toml
├── requirements.txt
├── configs/
│   ├── models/
│   │   ├── qwen35_9b_vllm.py
│   │   ├── qwen35_9b_boundary_sft.py
│   │   ├── qwen35_9b_failure_alignment.py
│   │   └── mimo_v25_pro.py
│   ├── benchmark/
│   │   ├── github_mcp_main.py
│   │   ├── github_mcp_clean.py
│   │   ├── github_mcp_injected.py
│   │   ├── github_mcp_ood.py
│   │   └── mcpbench_subset.py
│   ├── experiments/
│   │   ├── baseline_qwen.py
│   │   ├── prompt_defense.py
│   │   ├── boundary_sft_eval.py
│   │   ├── failure_alignment_eval.py
│   │   ├── mimo_reference.py
│   │   ├── utility_eval.py
│   │   └── ood_redteam.py
│   └── prompts/
│       ├── base_agent.py
│       ├── trust_boundary.py
│       └── structured_boundary.py
├── rpnr/
│   ├── __init__.py
│   ├── config/
│   │   ├── lazy.py
│   │   └── instantiate.py
│   ├── llm/
│   │   ├── base.py
│   │   ├── vllm_client.py
│   │   ├── mimo_client.py
│   │   └── openai_compatible.py
│   ├── agent/
│   │   ├── runner.py
│   │   ├── parser.py
│   │   ├── prompts.py
│   │   └── actions.py
│   ├── tools/
│   │   ├── base.py
│   │   ├── github_mcp_backend.py
│   │   ├── replay_backend.py
│   │   └── local_backend.py
│   ├── benchmark/
│   │   ├── dataset.py
│   │   ├── task.py
│   │   ├── splits.py
│   │   └── github_repo_builder.py
│   ├── eval/
│   │   ├── metrics.py
│   │   ├── evaluator.py
│   │   ├── judge.py
│   │   └── reports.py
│   ├── training/
│   │   ├── sft_data.py
│   │   ├── dpo_data.py
│   │   ├── train_lora.py
│   │   └── merge_adapter.py
│   ├── logging/
│   │   ├── trace.py
│   │   └── io.py
│   └── utils/
│       ├── json.py
│       └── paths.py
├── data/
│   ├── tasks/
│   │   ├── train.jsonl
│   │   ├── dev.jsonl
│   │   ├── test.jsonl
│   │   └── ood.jsonl
│   ├── traces/
│   │   ├── live_mcp/
│   │   └── replay/
│   ├── sft/
│   │   ├── boundary_sft_train.jsonl
│   │   └── failure_pairs.jsonl
│   └── results/
│       ├── baseline_qwen.jsonl
│       ├── prompt_defense.jsonl
│       ├── boundary_sft.jsonl
│       ├── failure_alignment.jsonl
│       └── mimo_reference.jsonl
├── scripts/
│   ├── run_agent_eval.py
│   ├── run_mcp_trace_collection.py
│   ├── build_sft_data.py
│   ├── run_sft.py
│   └── summarize_results.py
├── notebooks/
│   ├── 00_group_project_overview.ipynb
│   ├── 01_member_boundary_sft.ipynb
│   ├── 02_member_failure_alignment.ipynb
│   ├── 03_member_tool_utility.ipynb
│   └── 04_member_ood_redteam.ipynb
└── tests/
    ├── test_parser.py
    ├── test_metrics.py
    └── test_replay_backend.py
```

`local_backend.py` 只作为 unit tests 或 emergency fallback，不作为主开发路径。项目主路径是 `GitHubMCPBackend` 收集真实 live traces，然后用 `ReplayBackend` 做可复现 evaluation。

## 3. Notebook and Package Boundary

Notebook 里应该尽量只写 orchestration 和展示代码：

```python
from rpnr.config.lazy import load_config
from rpnr.engine import run_experiment
from rpnr.eval.reports import load_results, make_main_table

cfg = load_config("../configs/experiments/boundary_sft_eval.py")
outputs = run_experiment(cfg)

results = load_results(["../data/results/boundary_sft.jsonl"])
make_main_table(results)
```

不要在 notebook 里直接实现：

```text
MCP client
agent loop
JSON parser
metrics
training data builder
LoRA training logic
```

这些应该全部在 `rpnr/` package 或 `scripts/` 中。

## 4. LazyConfig-style Config System

可以模仿 Detectron2 LazyConfig 的思想，但实现极简版本即可。核心目标是：

```text
experiment definition lives in Python config files
objects are instantiated from config
scripts and notebooks share the same config
```

### Minimal LazyCall

```python
# rpnr/config/lazy.py

import importlib.util
from dataclasses import dataclass


@dataclass
class LazyCall:
    target: object

    def __call__(self, **kwargs):
        return {
            "_target_": self.target,
            **kwargs,
        }


def instantiate(cfg):
    if isinstance(cfg, dict) and "_target_" in cfg:
        target = cfg["_target_"]
        kwargs = {
            k: instantiate(v)
            for k, v in cfg.items()
            if k != "_target_"
        }
        return target(**kwargs)

    if isinstance(cfg, dict):
        return {k: instantiate(v) for k, v in cfg.items()}

    if isinstance(cfg, list):
        return [instantiate(x) for x in cfg]

    return cfg


def load_config(path):
    spec = importlib.util.spec_from_file_location("config_module", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module
```

### Example Experiment Config

```python
# configs/experiments/baseline_qwen_live_mcp.py

from rpnr.config.lazy import LazyCall as L
from rpnr.llm.vllm_client import VLLMClient
from rpnr.tools.github_mcp_backend import GitHubMCPBackend
from rpnr.agent.runner import AgentRunner
from rpnr.eval.evaluator import Evaluator


llm = L(VLLMClient)(
    model_name="Qwen/Qwen3.5-9B",
    base_url="http://localhost:8000/v1",
    api_key_env="VLLM_API_KEY",
    temperature=0.0,
    max_tokens=2048,
)

tool_backend = L(GitHubMCPBackend)(
    server_command="docker",
    server_args=[
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "-e",
        "GITHUB_READ_ONLY=1",
        "ghcr.io/github/github-mcp-server",
    ],
    allowed_tools=[
        "issue_read",
        "get_file_contents",
        "search_code",
        "pull_request_read",
    ],
)

runner = L(AgentRunner)(
    llm=llm,
    tool_backend=tool_backend,
    prompt_name="base_agent",
    max_steps=5,
)

evaluator = L(Evaluator)(
    metrics=[
        "clean_task_success",
        "attack_success",
        "tool_call_validity",
        "tool_call_accuracy",
        "leakage",
        "over_refusal",
    ],
)

experiment = dict(
    name="baseline_qwen_live_mcp",
    task_file="data/tasks/test.jsonl",
    runner=runner,
    evaluator=evaluator,
    output_file="data/results/baseline_qwen.jsonl",
    trace_dir="data/traces/live_mcp/baseline_qwen",
)
```

### Replay Evaluation Config

Final quantitative comparison should use replayed live observations:

```python
# configs/experiments/baseline_qwen_replay.py

from rpnr.config.lazy import LazyCall as L
from rpnr.llm.vllm_client import VLLMClient
from rpnr.tools.replay_backend import ReplayBackend
from rpnr.agent.runner import AgentRunner
from rpnr.eval.evaluator import Evaluator


llm = L(VLLMClient)(
    model_name="Qwen/Qwen3.5-9B",
    base_url="http://localhost:8000/v1",
    api_key_env="VLLM_API_KEY",
    temperature=0.0,
    max_tokens=2048,
)

tool_backend = L(ReplayBackend)(
    trace_dir="data/traces/replay/test",
)

runner = L(AgentRunner)(
    llm=llm,
    tool_backend=tool_backend,
    prompt_name="base_agent",
    max_steps=5,
)

evaluator = L(Evaluator)(
    metrics=[
        "clean_task_success",
        "attack_success",
        "tool_call_validity",
        "tool_call_accuracy",
        "leakage",
        "over_refusal",
    ],
)

experiment = dict(
    name="baseline_qwen_replay",
    task_file="data/tasks/test.jsonl",
    runner=runner,
    evaluator=evaluator,
    output_file="data/results/baseline_qwen.jsonl",
)
```

## 5. Core Package Responsibilities

### `rpnr.llm`

统一不同模型的调用方式：

```python
class BaseLLMClient:
    def chat(self, messages: list[dict]) -> str:
        raise NotImplementedError
```

实现：

```text
VLLMClient
MiMoClient
OpenAICompatibleClient
```

这样 `AgentRunner` 不需要知道底层是 Qwen、MiMo 还是别的 OpenAI-compatible endpoint。

### `rpnr.agent`

负责 agent loop、JSON action parser、prompt construction 和 action schema。

核心输出：

```json
{
  "task_id": "repo003_issue02_direct_override",
  "model": "Qwen3.5-9B-base",
  "actions": [],
  "tool_trace": [],
  "final_answer": "...",
  "raw_outputs": []
}
```

### `rpnr.tools`

统一 tool backend：

```python
class ToolBackend:
    def list_tools(self) -> list[dict]:
        raise NotImplementedError

    def call_tool(self, tool_name: str, arguments: dict) -> str:
        raise NotImplementedError
```

实现：

```text
GitHubMCPBackend   # live MCP trace collection and demo
ReplayBackend      # final reproducible evaluation
LocalBackend       # tests only / fallback only
```

### `rpnr.eval`

负责所有 metrics：

```python
class Evaluator:
    def evaluate(self, task, prediction) -> dict:
        ...
```

指标：

```text
clean_task_success
attack_success
tool_call_validity
tool_call_accuracy
leakage
over_refusal
```

### `rpnr.training`

负责 SFT / preference 数据准备和训练脚本：

```text
sft_data.py
dpo_data.py
train_lora.py
merge_adapter.py
```

Notebook 里不直接写训练逻辑，而是调用 package 或 scripts。

## 6. Unified Experiment Entry

建议加一个统一入口：

```python
# rpnr/engine.py

from rpnr.config.lazy import instantiate
from rpnr.benchmark.dataset import load_tasks
from rpnr.logging.io import save_jsonl


def run_experiment(cfg):
    runner = instantiate(cfg.experiment["runner"])
    evaluator = instantiate(cfg.experiment["evaluator"])

    tasks = load_tasks(cfg.experiment["task_file"])
    outputs = []

    for task in tasks:
        prediction = runner.run(task)
        metrics = evaluator.evaluate(task, prediction)
        outputs.append(
            {
                "task": task,
                "prediction": prediction,
                "metrics": metrics,
            }
        )

    save_jsonl(outputs, cfg.experiment["output_file"])
    return outputs
```

Notebook 和 scripts 都调用同一个入口：

```python
from rpnr.config.lazy import load_config
from rpnr.engine import run_experiment

cfg = load_config("../configs/experiments/baseline_qwen_replay.py")
outputs = run_experiment(cfg)
```

## 7. Scripts and Notebooks Boundary

### Scripts for Reproducible Runs

```bash
python scripts/run_mcp_trace_collection.py --config configs/experiments/baseline_qwen_live_mcp.py
python scripts/run_agent_eval.py --config configs/experiments/baseline_qwen_replay.py
python scripts/run_agent_eval.py --config configs/experiments/prompt_defense_replay.py
python scripts/build_sft_data.py --config configs/training/boundary_sft_data.py
python scripts/run_sft.py --config configs/training/boundary_sft.py
python scripts/summarize_results.py --results data/results/*.jsonl
```

### Notebooks for Demonstration and Analysis

Notebook 可以运行 small subset：

```python
RUN_FULL = False

cfg = load_config("../configs/experiments/boundary_sft_eval.py")

if not RUN_FULL:
    cfg.experiment["task_file"] = "../data/tasks/demo_20.jsonl"
    cfg.experiment["output_file"] = "../data/results/notebook_demo_boundary_sft.jsonl"

outputs = run_experiment(cfg)
```

长训练和完整 benchmark 不建议默认在 notebook 中运行。Notebook 应加载已有结果，必要时只跑 5-20 个 examples 证明流程可执行。

## 8. Five Notebook Plan

### Group Notebook

File:

```text
notebooks/00_group_project_overview.ipynb
```

Content:

```text
1. Project overview
2. Benchmark construction summary
3. Live GitHub-MCP pipeline
4. Model configurations
5. Main evaluation results
6. Safety-utility trade-off
7. Comparison with MiMo-V2.5-Pro
8. Summary of individual contributions
```

Code:

```python
from rpnr.eval.reports import load_results, main_table, attack_breakdown_table

results = load_results([
    "../data/results/baseline_qwen.jsonl",
    "../data/results/prompt_defense.jsonl",
    "../data/results/boundary_sft.jsonl",
    "../data/results/failure_alignment.jsonl",
    "../data/results/mimo_reference.jsonl",
])

main_table(results)
attack_breakdown_table(results)
```

### Member 1 Notebook: Boundary-SFT

File:

```text
notebooks/01_member_boundary_sft.ipynb
```

Content:

```text
1. Boundary-SFT motivation
2. SFT trajectory format
3. Training setup
4. Training curve
5. Base vs Boundary-SFT comparison
6. Over-refusal / utility trade-off
7. Qualitative examples fixed by SFT
```

Code:

```python
cfg = load_config("../configs/experiments/boundary_sft_eval.py")
results = run_or_load_results(cfg)
show_before_after_table(results)
show_failure_cases(results, category="fixed_by_sft")
```

### Member 2 Notebook: Failure-based Alignment

File:

```text
notebooks/02_member_failure_alignment.ipynb
```

Content:

```text
1. Attack-following failures
2. Chosen/rejected pair construction
3. DPO / ORPO / failure-augmented SFT setup
4. Comparison with Boundary-SFT
5. Attack-family-specific robustness
6. Remaining failure cases
```

Code:

```python
pairs = load_preference_pairs("../data/sft/failure_pairs.jsonl")
show_pair_examples(pairs)

results = load_results([
    "../data/results/boundary_sft.jsonl",
    "../data/results/failure_alignment.jsonl",
])
attack_family_table(results)
```

If DPO/ORPO is too expensive, this notebook can focus on failure-augmented SFT and still count as a concrete technical contribution.

### Member 3 Notebook: Tool-use Utility

File:

```text
notebooks/03_member_tool_utility.ipynb
```

Content:

```text
1. GitHub-MCP action format
2. Tool-call validity metric
3. Tool argument accuracy metric
4. Clean utility evaluation
5. MCP-Bench subset / external benchmark transfer
6. Does safety tuning damage tool-use?
```

Code:

```python
results = load_results([
    "../data/results/baseline_qwen.jsonl",
    "../data/results/prompt_defense.jsonl",
    "../data/results/boundary_sft.jsonl",
])

tool_accuracy_table(results)
show_tool_error_examples(results)
```

### Member 4 Notebook: OOD Red-teaming

File:

```text
notebooks/04_member_ood_redteam.ipynb
```

Content:

```text
1. OOD/adaptive attack design
2. Unseen phrasing split
3. Unseen location split
4. Multi-hop injection split
5. Markdown-hidden and code-comment injection
6. Adaptive attacks against prompt defense
7. Generalization results
8. Failure taxonomy
```

Code:

```python
ood_results = load_results([
    "../data/results/ood_baseline_qwen.jsonl",
    "../data/results/ood_boundary_sft.jsonl",
    "../data/results/ood_failure_alignment.jsonl",
    "../data/results/ood_mimo.jsonl",
])

ood_generalization_table(ood_results)
show_redteam_examples(ood_results)
```

## 9. Config Organization

### Model Configs

```text
configs/models/
├── qwen35_9b_vllm.py
├── qwen35_9b_boundary_sft.py
├── qwen35_9b_failure_alignment.py
└── mimo_v25_pro.py
```

Example:

```python
# configs/models/qwen35_9b_vllm.py

from rpnr.config.lazy import LazyCall as L
from rpnr.llm.vllm_client import VLLMClient

model = L(VLLMClient)(
    model_name="Qwen/Qwen3.5-9B",
    base_url="http://localhost:8000/v1",
    api_key_env="VLLM_API_KEY",
    temperature=0.0,
    max_tokens=2048,
)
```

### Benchmark Configs

```text
configs/benchmark/
├── github_mcp_main.py
├── github_mcp_clean.py
├── github_mcp_injected.py
├── github_mcp_ood.py
└── mcpbench_subset.py
```

Example:

```python
# configs/benchmark/github_mcp_ood.py

benchmark = dict(
    name="github_mcp_ood",
    task_file="data/tasks/ood.jsonl",
    trace_dir="data/traces/replay/ood",
    split="ood",
    attack_types=[
        "unseen_phrasing",
        "unseen_location",
        "multi_hop",
        "adaptive",
    ],
)
```

### Experiment Configs

```text
configs/experiments/
├── baseline_qwen_live_mcp.py
├── baseline_qwen_replay.py
├── prompt_defense_replay.py
├── boundary_sft_eval.py
├── failure_alignment_eval.py
├── mimo_reference.py
├── ood_boundary_sft.py
└── utility_eval.py
```

Each experiment config combines:

```text
model config
benchmark config
prompt config
tool backend
metrics
output path
```

## 10. README Commands

Final README should include commands like:

```bash
pip install -e .
```

Start Qwen through vLLM:

```bash
vllm serve Qwen/Qwen3.5-9B \
  --host 0.0.0.0 \
  --port 8000 \
  --dtype auto \
  --api-key "$VLLM_API_KEY"
```

Collect live GitHub MCP traces:

```bash
python scripts/run_mcp_trace_collection.py \
  --config configs/experiments/baseline_qwen_live_mcp.py
```

Run replay evaluation:

```bash
python scripts/run_agent_eval.py \
  --config configs/experiments/baseline_qwen_replay.py
```

Build SFT data:

```bash
python scripts/build_sft_data.py \
  --config configs/training/boundary_sft_data.py
```

Run notebooks:

```bash
jupyter lab notebooks/
```

## 11. Minimal Deliverable Version

最低限度：

```text
rpnr/
  llm/
  agent/
  tools/
  eval/
  training/

configs/
  experiments/
  models/
  benchmark/

data/
  tasks/
  traces/
  results/

notebooks/
  00_group_project_overview.ipynb
  01_member_boundary_sft.ipynb
  02_member_failure_alignment.ipynb
  03_member_tool_utility.ipynb
  04_member_ood_redteam.ipynb

scripts/
  run_mcp_trace_collection.py
  run_agent_eval.py
  build_sft_data.py
  run_sft.py
```

Do not overbuild abstractions at the start. First make sure:

```text
config can load
GitHub MCP backend can list and call read-only tools
agent can run one live example
trace can be saved
replay backend can reproduce the same observation
notebook can load results and render a table
```

## 12. Revised Development Order

Because this project is live-MCP-first, the development order should be:

### Day 1

```text
Create package skeleton
Implement minimal LazyConfig
Implement GitHubMCPBackend enough to list tools and call one read-only tool
Create one sandbox GitHub repo and issue
Save one live tool trace
```

### Day 2

```text
Implement VLLMClient
Implement JSON action parser
Implement AgentRunner
Run one end-to-end live GitHub-MCP agent example
```

### Day 3

```text
Implement trace logging
Implement ReplayBackend
Implement Evaluator skeleton
Create group notebook skeleton that loads one result
```

### Day 4-5

```text
Create 20-50 benchmark tasks
Run base and prompt-defense
Generate first results table
Create individual notebook skeletons
```

### Week 2

```text
Scale benchmark
Build SFT trajectories
Train Boundary-SFT
Evaluate tuned model with replayed live-MCP traces
Fill individual notebooks with results and analysis
```

## 13. Core Principle

The agent should be simple, controlled, and observable. The notebooks should be clean. The package should own the logic. The configs should describe experiments.

This makes the project easy to run from scripts, easy to inspect in notebooks, and easy to explain in the final report.
