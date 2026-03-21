# Evaluation of AI Systems

Covered in: Week 5 guest lecture (`angelika_romanou-nlp-evaluation-guest-lecture`)

## Core message

Evaluation is not just about reporting numbers.
It determines:
- what we optimize
- which models are considered "better"
- which research directions receive attention

So evaluation is part of the science, not an afterthought.

## Leaderboard illusion

One strong warning from the guest lecture:
small leaderboard differences often do not reflect real capability differences.

They may come from:
- prompt formatting
- implementation details
- contamination
- sampling variance
- benchmark selection

This means:
a `+0.5` gain is not automatically meaningful.

## There is no single best evaluation

Different stakeholders care about different things:
- researchers: capabilities
- users: usefulness and reliability
- product teams: real workflow performance
- policymakers: risks and harms

So evaluation must be question-driven.

## Evaluation pipeline

A real evaluation setup includes:
- inputs and task format
- prompting method
- inference strategy
- post-processing
- metrics
- interpretation

Examples of inference choices:
- chain-of-thought
- few-shot prompting
- RAG
- tool use

These choices can materially change scores.

## Intrinsic vs downstream evaluation

### Perplexity

Perplexity is useful for language modeling because it measures how much probability the model assigns to real text.

But it does **not** directly measure:
- reasoning
- factuality
- instruction following
- usefulness
- alignment

So perplexity is useful, but narrow.

### Lexical overlap metrics

Classic generation metrics:
- BLEU
- ROUGE
- METEOR

Why they can fail for LLMs:
- semantic equivalence is not lexical overlap
- many good answers exist
- paraphrases get unfairly penalized

## Modern capability evaluation

The lecture highlights several important axes:
- knowledge
- reasoning
- instruction following
- coding
- planning / agent behavior

Representative benchmark types:
- GSM8K / AIME / GPQA for reasoning
- HumanEval for coding
- IFEval / WildBench / AlpacaEval for instruction following

## Log-prob evaluation

For structured tasks, one can compare candidate answers by sequence log-probabilities rather than by free-form generations.

Advantages:
- deterministic
- often more comparable
- useful for multiple-choice-like tasks

Limit:
- less suitable for open-ended generation

## LLM-as-a-judge

A strong LLM can evaluate outputs from another model.

Useful because:
- human evaluation is expensive
- judge models are scalable and fast

But it introduces risks:
- position bias
- prompt sensitivity
- self-preference bias

So LLM-as-a-judge must be validated, not blindly trusted.

## Safety and robustness

Evaluation must include failure modes, not just average benchmark success.

Examples:
- red-teaming
- jailbreak resistance
- refusal/helpfulness trade-offs
- robustness to prompt perturbations

The guest lecture also emphasized meta-evaluation dimensions such as:
- consistency
- robustness
- sensitivity to benchmark design

## Practical workflow

When building an evaluation suite, ask:
- what capability do I actually care about?
- what benchmark represents that capability?
- is it already saturated?
- does it match my model type and deployment setting?
- are the results reproducible?

Good evaluation often combines:
- standard benchmarks
- human evaluation
- LLM-as-a-judge
- robustness tests
- system-level / agent-level evaluations

## Final takeaway

Benchmarks measure slices of behavior, not general intelligence.
A model that looks good on a leaderboard may still fail badly in realistic settings.

## One-sentence takeaway

Reliable evaluation requires multiple complementary methods, careful experimental design, and skepticism toward small benchmark gains or single-number claims.
