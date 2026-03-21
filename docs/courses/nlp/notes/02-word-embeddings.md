# Word Embeddings

Covered in: Week 1, Lecture 3 (`3-NeuralEmbeddings`)

## Sparse vs. dense representations

A one-hot vector says which word we have, but says nothing about similarity.

If:
- `enjoyed` and `loved` are different indices
- their one-hot vectors are orthogonal

then their cosine similarity is basically zero even though their meanings are close.

Dense embeddings solve this by learning:

$$
e_w \in \mathbb{R}^d
$$

with `d` much smaller than `|V|`, but rich enough to encode useful semantic structure.

## Distributional hypothesis

The core idea is Firth's line:

> You shall know a word by the company it keeps.

Meaning is inferred from context.
This is the foundation of distributional semantics.

中文理解：
词义不是靠字典硬塞给模型的，而是靠它在什么上下文里出现，被模型“倒推”出来。

## Why self-supervised learning?

Learning embeddings only from labeled tasks is data-inefficient.
Raw text is abundant, so we can train embedding objectives directly from unlabeled corpora.

The lecture focused on four classical families:
- CBOW
- Skip-gram
- GloVe
- fastText

## CBOW

Continuous Bag of Words predicts a missing center word from surrounding context.

Example:

`enjoyed the ___ we watched`

The context vectors are summed, then projected to a vocabulary distribution:

$$
P(x_t \mid \{x_s\}) = \text{softmax}\left(U \sum_{s \neq t} x_s \right)
$$

Characteristics:
- context -> target
- efficient
- tends to learn smoother representations

## Skip-gram

Skip-gram does the reverse:
- given the center word
- predict surrounding context words

Conceptually:

$$
\max \sum_{s \in \text{context}(t)} \log P(x_s \mid x_t)
$$

Characteristics:
- target -> context
- often uses larger windows
- closer context words matter more

CBOW vs Skip-gram:
- CBOW compresses many context words into one prediction
- Skip-gram expands one word into many local predictions

## GloVe

Word2Vec methods optimize local prediction objectives.
GloVe instead uses global co-occurrence statistics.

Main idea:
- build a word-context co-occurrence matrix
- learn embeddings whose dot products approximate log counts

This lets embedding differences capture meaningful probability ratios.

## fastText

fastText improves word vectors with subword information.
A word is represented using character n-grams.

Example:
- `where` can be broken into character chunks
- useful for morphology and rare words

This matters because:
- related word forms share pieces
- rare words get less hopeless representations

## What makes a good embedding?

A useful embedding should support:
- semantic similarity
- syntactic regularities
- transfer to downstream tasks
- robustness to some rare-word variation

But note:
static embeddings still give the same vector for a word in all contexts.
That becomes a big problem later for polysemy.

Example:
- `play` in baseball
- `play` in theater

Static embeddings blur these senses together.

## Practical trade-offs

- Larger dimension `d` can encode more information, but costs more parameters.
- Larger windows capture broader semantics, but may lose precise local syntax.
- Local objectives are simple and scalable, but not fully contextual.

## One-sentence takeaway

Word embeddings replace isolated symbol IDs with learned continuous vectors, allowing similarity and generalization to emerge from context statistics.
