# Count-Based Language Models

Covered in: Week 2, Lectures 4-5 (`4+5-EarlyLMs+RNNs-Start`)

## What is a language model?

A language model assigns probability to a token sequence:

$$
P(w_1, w_2, \dots, w_n)
$$

This is the formal version of "how likely is this sentence?"

## Chain rule

By probability chain rule:

$$
P(w_1, \dots, w_n) = \prod_{i=1}^{n} P(w_i \mid w_1, \dots, w_{i-1})
$$

This means language modeling can be reduced to repeated next-token prediction.

中文理解：
整句话的概率，本质上就是“前面都已经给定时，下一个词出现的概率”一路乘下去。

## Why exact modeling is impossible

If we condition on the full prefix exactly, the parameter space explodes.
Most long contexts are never observed in finite corpora.

So classical models add an approximation.

## Markov assumption and n-grams

The `k`-th order Markov assumption keeps only the recent past:

$$
P(w_i \mid w_1, \dots, w_{i-1}) \approx P(w_i \mid w_{i-k}, \dots, w_{i-1})
$$

This gives us n-gram models:
- unigram: independent words
- bigram: depends on previous word
- trigram: depends on previous two words
- and so on

## What n-grams are good at

- simple
- interpretable
- surprisingly effective with enough data
- easy to train from counts

## Perplexity

Perplexity is the standard intrinsic evaluation metric for classical language models.

Intuition:
- lower perplexity = less uncertainty about the next token
- high perplexity = the model is confused

It is closely related to exponentiated average negative log-likelihood.

You can read it as:
"On average, how many equally likely choices does the model behave as if it is choosing among?"

## The sparsity problem

The biggest issue:
many n-grams never appear in training.

Then:

$$
P(\text{unseen n-gram}) = 0
$$

and once one factor is zero, an entire sentence probability becomes zero.

That also breaks perplexity.

## Smoothing

Smoothing redistributes probability mass so unseen events are not impossible.

Main strategies from the lecture:
- additive / Laplace smoothing
- discounting
- back-off
- interpolation

### Laplace smoothing

For a bigram:

$$
P(w_i \mid w_{i-1}) = \frac{C(w_{i-1}, w_i) + \alpha}{C(w_{i-1}) + \alpha |V|}
$$

Simple, but usually not the best in practice.

### Back-off

If a higher-order n-gram is too sparse, use a lower-order one.

### Interpolation

Combine several n-gram orders with learned weights:

$$
P = \lambda_1 P_{\text{unigram}} + \lambda_2 P_{\text{bigram}} + \cdots
$$

## Main weaknesses

Even with smoothing, n-grams have structural limits:
- context window is fixed
- no semantic similarity between different but related words
- parameter/data requirements grow quickly with `n`

Example:
- `students opened their`
- `pupils opened their`

Humans know these prefixes are similar.
Plain n-grams do not.

## One-sentence takeaway

Count-based language models turn sequence probability into local count estimation, but they struggle with sparsity, fixed context windows, and lack of semantic sharing.
