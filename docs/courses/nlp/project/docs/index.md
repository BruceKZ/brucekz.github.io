# Docs Index

This folder is the project wiki for **Read the Prompt, Not the README**.

## Start Here

- [Project Structure](project-structure.md): how the repo should be organized, how notebooks call the package, and how LazyConfig-style configs work.
- [MCP Usage](mcp-usage.md): how to connect vLLM, the Python agent loop, and the real GitHub MCP server in read-only mode.

## Research Design

- [Proposal](proposal.md): project motivation, research questions, model choices, defenses, and risk control.
- [Benchmark](benchmark.md): GitHub sandbox repos, task types, attack locations, attack families, OOD/adaptive attacks, and data formats.
- [Eval Metrics](eval-metrics.md): metrics, result tables, and final comparison setup.
- [Timeline](timeline.md): phase plan, deadlines, and four-member technical responsibilities.

## Mental Model

The project has three layers:

```text
real GitHub MCP traces
        ↓
Python package + config-driven experiments
        ↓
five Jupyter notebooks for reporting and analysis
```

The notebooks should stay clean. Most logic should live in the `rpnr/` package and be selected through configs.
