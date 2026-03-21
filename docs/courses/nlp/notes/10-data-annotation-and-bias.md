# Data Annotation and Bias

Covered in: Week 5, Lecture 13-14 (`13+14-data-artifacts`)

## Benchmark, dataset, task

The lecture distinguishes three levels:
- task: the abstract problem
- dataset: concrete input-output examples for that task
- benchmark: one dataset or a collection of datasets used for evaluation

This distinction matters because high benchmark score does not automatically mean broad real-world understanding.

## Why benchmarks matter

Benchmarks are useful because they:
- standardize comparison
- help measure progress
- force algorithms to face the same test data

But they also shape research incentives.
If the benchmark is biased, the field may optimize for the wrong thing.

## How a benchmark is built

A good benchmark pipeline includes:
1. define the task clearly
2. write annotation guidelines
3. run pilot studies
4. inspect early data
5. collect at scale

The pilot stage is important because bad instructions create bad labels.

## Annotation guidelines

Annotators need a precise operational definition of the task.
If the instructions are vague, workers will invent shortcuts.

So guideline design is not a boring admin task.
It is part of model quality.

## Quality control at scale

Typical tools:
- multiple labels per example
- inter-annotator agreement
- worker qualification
- filtering low-quality annotators

Agreement metrics mentioned in class:
- Cohen's kappa
- Fleiss' kappa
- Krippendorff's alpha

## Annotation artifacts

A major theme of the lecture is that datasets often contain spurious shortcuts.

Example from NLI-style settings:
- contradictions often contain negation
- neutral labels often contain added information

Then models can exploit label-specific patterns without really solving the intended task.

This is an annotation artifact.

## Why this is bad

If a model learns shortcuts:
- benchmark scores rise
- real understanding may not
- OOD generalization collapses

So a benchmark can reward exploitation instead of reasoning.

## Annotator bias

Another subtle issue:
- many datasets are created by relatively few annotators
- each annotator may have stylistic habits
- models can partially learn the annotator, not just the task

This is alarming because it means dataset construction details leak into model behavior.

## Mitigation strategies

The lecture discussed several responses:

### Re-balancing

Adjust the dataset so labels are less predictable from superficial patterns.

### Contrast sets

Create controlled perturbations that specifically test the capability you care about.

### Data augmentation

Add more diverse examples to reduce shortcut reliance.

### Adversarial filtering

Remove easy examples that weak shortcut models can solve.

### Bias-aware modeling

Use explicit bias models or ensembles to reduce reliance on shallow cues.

### Datasheets for datasets

Document:
- why the data was collected
- who created it
- how labels were obtained
- what risks and limitations exist

This is partly technical and partly governance.

## Final perspective

Model performance is inseparable from data quality.
A stronger model trained on flawed data may simply become a better shortcut learner.

## One-sentence takeaway

Benchmark quality depends on annotation design, worker behavior, and artifact control, so evaluating models without analyzing the dataset itself is fundamentally unsafe.
