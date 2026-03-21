# Sequence-to-Sequence Models and Attention

Covered in: Week 3, Lecture 7 (`7-Seq2seq`)

## Why seq2seq?

Language modeling predicts the next token in the same sequence.
But many NLP tasks map one sequence to another sequence with different structure:
- machine translation
- summarization
- code generation
- image captioning

This requires a more general architecture.

## Encoder-decoder idea

A sequence-to-sequence model has:
- an encoder that reads the source sequence
- a decoder that generates the target sequence autoregressively

The encoder compresses the input into a representation.
The decoder uses that representation to produce:

$$
y_1, y_2, \dots, y_T
$$

## Training objective

With paired data, training is still cross-entropy over target tokens:

$$
\mathcal{L} = \sum_{t=1}^{T} -\log P(y_t \mid y_{<t}, x_{1:n})
$$

So the decoder is trained as a conditional language model.

Key difference from plain LM training:
- we now need aligned input-output pairs
- data collection is much harder

## The temporal bottleneck

Early seq2seq models used a single final encoder state to seed the decoder.

That creates a bottleneck:
- all source information must fit into one vector
- long inputs become hard to compress faithfully
- long-range dependencies suffer

## Attention as the fix

Attention lets the decoder look back at all encoder states rather than only one summary vector.

At decoder step `t`:
- decoder state acts like a query
- encoder states act like keys and values

The decoder computes similarity scores, normalizes them with softmax, and forms a weighted average:

$$
\alpha_i = \text{softmax}(a_i)
$$

$$
\tilde{h}_t = \sum_i \alpha_i h_i^{enc}
$$

This context vector is then combined with the decoder state to predict the next token.

## What attention buys us

- direct access to source positions
- less temporal bottleneck
- better long-range modeling
- improved gradient flow
- interpretability through attention maps

## Query, key, value intuition

For classic encoder-decoder attention:
- query = "what the decoder currently needs"
- keys = "addresses" of encoder states
- values = "content" stored in encoder states

So attention is basically content-based retrieval.

中文理解：
解码器不是把源句子一次性背下来，而是每一步生成时都“回头看一眼”最相关的源位置。

## Remaining weakness

Even with attention, the encoder and decoder are still recurrent in classical seq2seq.
That means:
- hidden states are computed sequentially
- parallelization is limited

This motivates transformers.

## One-sentence takeaway

Sequence-to-sequence models generalize language modeling to input-output mappings, and attention removes the single-vector bottleneck by letting the decoder dynamically retrieve relevant encoder information.
