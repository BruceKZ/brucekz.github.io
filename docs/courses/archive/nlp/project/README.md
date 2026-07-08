# Read the Prompt, Not the README

Evaluating and Exploring Post-training for GitHub-MCP Agents under Indirect Prompt Injection.

本仓库用于维护 NLP project 的 proposal、benchmark 设计、实验计划、成员分工、时间线和后续 wiki 文档。

## Abstract

本项目构建一个真实的 GitHub-MCP benchmark，研究 LLM agent 在读取 repo、issue、PR、README 和代码注释时是否会被 indirect prompt injection 操纵，并评估 Qwen3.5-9B 通过 Boundary-SFT 和 failure-based defense 后，能否在保持 MCP tool-use utility 的同时降低攻击成功率，缩小与 MiMo-V2.5-Pro 等大模型参考的差距。

## 核心文档

- [Docs Index](docs/index.md)
- [Project Structure](docs/project-structure.md)
- [MCP Usage](docs/mcp-usage.md)
- [Proposal](docs/proposal.md)
- [Benchmark](docs/benchmark.md)
- [Eval Metrics](docs/eval-metrics.md)
- [Timeline](docs/timeline.md)

## 研究问题

1. GitHub-MCP 场景下模型是否会受到 repo 内容中的 indirect prompt injection 影响？
2. 大模型在这样的场景下，是否比小模型更鲁棒？
3. 对小模型做 post-training / defense 是否能改善 GitHub-MCP tool-use 安全性？
4. 调优后的模型是否真的泛化，还是只记住了训练攻击模板？

## 最低最终配置

- Qwen3.5-9B base
- Qwen3.5-9B + trust-boundary prompt defense
- Qwen3.5-9B + Boundary-SFT
- MiMo-V2.5-Pro reference
