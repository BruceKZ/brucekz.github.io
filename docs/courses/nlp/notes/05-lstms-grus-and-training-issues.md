# LSTMs, GRUs, and Training Issues in RNNs

Covered in: Week 2, Lecture 6 (`6-RNNs-continued+LSTMs+GRUs`) and Week 3 recap

## The vanishing gradient problem

When an RNN is unrolled over many time steps, gradients are multiplied through many Jacobians.
If these factors are often smaller than 1, the gradient shrinks exponentially.

Consequence:
- early tokens receive almost no learning signal
- long-range dependencies become very hard to learn

This is especially bad in vanilla RNNs with saturating activations.

## Why this matters

A vanilla RNN may technically have unbounded context, but practically it often cannot use it.

So there is a difference between:
- theoretical capacity
- effective trainability

## Gated recurrent networks

The general fix is to introduce gates that control information flow.

Instead of forcing all memory updates through one squashing nonlinearity, we let the model decide:
- what to keep
- what to overwrite
- what to expose

## LSTM

An LSTM introduces:
- forget gate `f_t`
- input gate `i_t`
- output gate `o_t`
- candidate content `\tilde{c}_t`
- cell state `c_t`

Core updates:

$$
c_t = i_t \odot \tilde{c}_t + f_t \odot c_{t-1}
$$

$$
h_t = o_t \odot \phi(c_t)
$$

### Intuition for each gate

- Forget gate: how much of old memory should remain?
- Input gate: how much new information should be written?
- Output gate: how much of memory should influence the current hidden state?

Short Chinese version:
- forget = 忘多少
- input = 写多少
- output = 露出多少

## Why LSTMs help

The cell state creates a more direct path for gradient flow.

In simplified form:

$$
\frac{\partial c_t}{\partial c_{t-1}} = f_t
$$

So if the forget gate stays open, information and gradients can survive much longer.

## GRU

The GRU is a simpler gated alternative.
It uses fewer components, usually:
- update gate
- reset gate

Compared with LSTM:
- simpler
- fewer parameters
- often faster
- sometimes performs similarly or even better

But it may be less expressive than a full LSTM in some settings.

## Trade-offs

Advantages of LSTM / GRU:
- better long-range learning than vanilla RNN
- reduced vanishing-gradient pain
- still sequential and natural for token-by-token processing

Disadvantages:
- more parameters than vanilla RNN
- harder to parallelize than transformer models
- still not perfect for very long contexts

## What the cell state can encode

An important conceptual point from the slides:
individual memory dimensions can end up tracking interpretable patterns,
such as:
- whether we are inside quotation marks
- indentation level in code
- other persistent latent signals

So recurrent memory is not just an abstract vector; it can develop structured behavior.

## One-sentence takeaway

LSTMs and GRUs make recurrent models trainable over longer spans by controlling memory flow with gates, reducing the vanishing-gradient problem that cripples vanilla RNNs.
