# Neural Language Models and RNN Foundations

Covered in: Week 2, Lectures 4-6 (`4+5-EarlyLMs+RNNs-Start`, `6-RNNs-continued+LSTMs+GRUs`)

## Why move beyond n-grams?

N-grams fail to share meaning across similar contexts.
They also need explicit smoothing and still have a fixed context horizon.

Neural language models try to fix this by replacing discrete context tables with learned continuous representations.

## Fixed-context neural language model

The Bengio-style neural LM takes a fixed window of previous words:

$$
x = [e_{w_{t-n+1}}; \dots; e_{w_{t-1}}]
$$

Then applies:

$$
h = \tanh(Wx + b)
$$

and predicts the next token with a softmax over the vocabulary.

Important idea:
- embeddings allow similar contexts to share statistical strength
- the model no longer memorizes only exact symbolic matches

## Why this is better than n-grams

- dense embeddings encode similarity
- all probabilities stay non-zero through the neural parameterization
- the model can generalize across related contexts

Example intuition:
if the model learned from `students opened their books`,
it can transfer some knowledge to `pupils opened their ___`.

## But the model is still limited

This architecture is called fixed-context for a reason:
- only the last `n` words are visible
- increasing `n` increases parameter cost
- position-specific weights make sharing inefficient

So it still cannot naturally capture long dependencies.

## Recurrent neural networks

RNNs replace a fixed window with a recurrent state:

$$
h_t = \sigma(W_{hx}x_t + W_{hh}h_{t-1} + b_h)
$$

Now the hidden state summarizes previous context.

Main conceptual upgrade:
- same recurrent weights are reused at every time step
- context length is no longer explicitly bounded by a window size

中文理解：
RNN 的核心不是“记住所有历史细节”，而是用一个不断更新的 hidden state 去压缩历史。

## Why weight sharing matters

With RNNs:
- model size does not grow with sequence length
- the same transformation is reused through time
- the model can in principle process arbitrarily long sequences

This is much more elegant than expanding a fixed input window.

## Training with backpropagation through time

Because each hidden state depends on previous hidden states, gradients must be propagated through the unrolled computation graph over time.

This is called:

$$
\text{BPTT} = \text{Backpropagation Through Time}
$$

So an RNN is trained like a deep network whose depth is sequence length.

## What RNNs solve and what they do not

Solved:
- fixed context bottleneck, in theory
- better parameter sharing

Not fully solved:
- long-range dependency learning is still difficult in practice
- gradient flow across many steps becomes unstable

That leads directly to the next topic: vanishing gradients, LSTMs, and GRUs.

## One-sentence takeaway

Neural language models improve over n-grams by using continuous representations, and RNNs further generalize this by replacing fixed windows with a recurrent state shared across time.
