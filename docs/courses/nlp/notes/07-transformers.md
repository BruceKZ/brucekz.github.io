# Transformers

Covered in: Week 3, Lecture 8 (`8-Transformers`)

## Why transformers replaced recurrent models

RNNs have two major bottlenecks:
- temporal bottleneck: long-range credit assignment is hard
- parallelization bottleneck: hidden states must be computed in order

Transformers remove recurrence and rely on self-attention.

## Self-attention

In self-attention, every token representation can attend to every other token representation in the same sequence.

Each token is projected into:
- query `Q`
- key `K`
- value `V`

The attention score between two positions is:

$$
a_{st} = \frac{(W_Q h_s)^\top (W_K h_t)}{\sqrt{d}}
$$

Then:

$$
\alpha_{st} = \text{softmax}(a_{st})
$$

and the attended representation is a weighted sum of projected values.

## Intuition

For one token:
- query asks: what information am I looking for?
- keys say: what kind of information do other tokens offer?
- values carry the content to aggregate

This lets each token build a contextualized representation in one layer.

## Multi-head attention

Instead of one attention map, transformers use multiple heads.

Why?
- different heads can capture different relations
- syntax, semantics, coreference, position-like interactions, etc.

Then all head outputs are concatenated and projected back.

## Transformer block

A standard transformer block contains:
- multi-head attention
- residual connection
- layer normalization
- feedforward network

Residual connections help optimization.
LayerNorm stabilizes representations across modules.

## Encoder vs decoder

Transformer encoder:
- self-attention over the full sequence
- fully parallel

Transformer decoder:
- masked self-attention first
- cross-attention over encoder outputs
- feedforward layer

## Why masking is necessary

In generation, token `t` must not see future tokens.
So future attention scores are masked to `-\infty` before softmax.

That enforces causal generation.

## Cross-attention

Cross-attention is the transformer version of classic encoder-decoder attention:
- query comes from decoder state
- keys and values come from encoder outputs

So the decoder can both:
- model target-side history
- retrieve source-side information

## Position embeddings

Self-attention alone is permutation-invariant.
Without extra information, it does not know token order.

So transformers add positional information:
- sinusoidal position embeddings
- or learned position embeddings

Learned positions are simple and effective, but may generalize poorly beyond trained sequence lengths.

## Main advantages over RNNs

- fully parallel encoding
- direct long-range interactions
- easier scaling
- no recurrent hidden-state bottleneck

## Main caveats

- attention cost grows quadratically with sequence length
- positional modeling is not automatic
- long-context efficiency remains an active research area

## One-sentence takeaway

Transformers replace recurrence with self-attention, enabling parallel contextualization of all tokens while preserving sequence structure through masking and positional information.
