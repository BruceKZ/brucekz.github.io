# Neural Text Classification Basics

Covered in: Week 1, Lectures 1-2 (`1-Intro`, `2-NeuralClassifier`)

## What problem are we solving?

A simple NLP system takes a sequence of discrete tokens and predicts something useful about it.
Typical example in class: sentiment classification for a movie review.

In abstract form:

$$
S = (x_1, x_2, \dots, x_T) \rightarrow y
$$

where `S` is the input sequence and `y` is the label.

## Core pipeline

1. Define a vocabulary `V`.
2. Map each token to an embedding vector.
3. Compose token embeddings into a sequence representation.
4. Feed that representation into a prediction layer.
5. Compute loss and update parameters with backpropagation.

Quick intuition:
- Words start as IDs.
- IDs become vectors.
- Vectors become one sentence-level representation.
- That representation becomes a decision.

中文理解：
这就是从 `word ids -> vectors -> sentence meaning -> label` 的最基础流水线。

## Vocabulary and `<UNK>`

Language is messy:
- huge vocabulary
- many rare words
- typos, emojis, multilingual text, special symbols

So we usually define a manageable vocabulary `V`.
Tokens outside `V` are mapped to a special unknown token:

$$
\texttt{<UNK>}
$$

This is a practical approximation, not a perfect linguistic decision.

## Embedding lookup

Instead of treating words as isolated symbols, we assign each token a dense vector from a shared embedding matrix:

$$
\mathbb{E} \in \mathbb{R}^{|V| \times d}
$$

Every token type points to one row of this matrix.
Repeated words reuse the same embedding parameters.

## Sequence composition

The simplest composition function shown in class is sum-pooling:

$$
h_T = \sum_{t=1}^{T} x_t
$$

Other simple variants:
- average pooling
- max pooling

Important point:
the model is not yet "understanding syntax" here; it is just compressing token vectors into one sequence vector.

## Prediction layer

For binary classification, we can use logistic regression:

$$
P(y) = \sigma(W_o h_T)
$$

For multi-class prediction over a label set:

$$
P(y) = \text{softmax}(W_o h_T)
$$

If the label set is the whole vocabulary, the same pattern becomes next-word prediction.

## Loss and learning

Training means:
- compare prediction with gold label
- compute a loss
- backpropagate gradients
- update parameters

The key insight is:
we are not only learning the classifier weights, we are also learning the embeddings.

Learnable parameters in the simple setup:
- embedding matrix `E`
- output matrix `W_o`

## Why embeddings matter even in this simple model

If two words behave similarly in many tasks, gradient updates may move their vectors into similar regions.
That is the beginning of semantic generalization.

Example intuition:
- `great` and `excellent` may become close
- `terrible` and `awful` may become close

## Limitations

This simple pipeline is useful, but weak:
- pooling loses word order
- long-range structure is ignored
- syntax is mostly invisible
- all tokens contribute in a crude way

This is why the course moves from simple composition to recurrent models, attention, and transformers.

## One-sentence takeaway

The first modern NLP lesson is that a text model is built by turning tokens into vectors, composing those vectors into a sequence representation, and learning both the representation and the classifier end-to-end.
