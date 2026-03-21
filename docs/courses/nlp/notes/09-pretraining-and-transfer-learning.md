# Pretraining and Transfer Learning

Covered in: Week 4, Lectures 10-11 (`10-PLMs_1`, `11-PLMs_2`)

## Why static embeddings were not enough

Classic word embeddings assign one vector per word type.
But many words change meaning with context.

Example from the lecture:
- `play` in baseball
- `play` in theater

A single static vector cannot cleanly represent both senses.

## Contextualized representations

The modern idea is:
- pretrain a model on massive raw text
- use the model's contextual hidden states as representations
- then adapt the model to downstream tasks

This is the core of the pretrain-then-finetune paradigm.

## ELMo

ELMo uses bidirectional LSTMs trained as language models.

Main idea:
- train forward and backward LMs
- use hidden states as contextual token embeddings
- combine layers with learned weights

Strength:
- much better than static embeddings for many tasks

Weakness:
- bidirectionality is stitched together from two directional models
- not fully integrated bidirectional conditioning in one transformer-style encoder

## BERT

BERT is an encoder-only transformer pretrained with masked language modeling.

Instead of predicting the next token left-to-right, BERT masks part of the input and predicts masked tokens.

Typical setup from the lecture:
- 15% of tokens selected
- 80% replaced with `[MASK]`
- 10% replaced with a random token
- 10% kept unchanged

Why this matters:
- BERT learns bidirectional context
- very strong for classification and sequence labeling

### Fine-tuning BERT

For classification:
- prepend `[CLS]`
- use its output embedding
- attach a lightweight classifier
- update the full model during fine-tuning

Important course point:
full fine-tuning usually works better than using frozen BERT embeddings only.

## GPT

GPT is decoder-style transformer pretraining with causal language modeling:

$$
P(x_t \mid x_{<t})
$$

Strengths:
- natural for text generation
- scalable autoregressive modeling

Weakness compared with BERT:
- no bidirectional conditioning during pretraining

So:
- BERT is stronger for rich contextual encoding
- GPT is more natural for generation

## The paradigm shift

Old mindset:
- train a task-specific architecture
- maybe initialize with pretrained word embeddings

New mindset:
- pretrain a large full model
- fine-tune that model for many downstream tasks

This is one of the biggest conceptual transitions in modern NLP.

中文理解：
以前是“预训练词向量 + 自己搭模型”；
现在是“直接拿大模型本体继续训”。

## Transfer learning

The course contrasts:

Pretraining:
- simple objectives
- huge raw corpora
- expensive and slow

Fine-tuning:
- smaller labeled datasets
- task-specific supervision
- cheaper and easier to iterate

## BART

BART is an encoder-decoder transformer.
It combines:
- BERT-style corrupted input on the encoder side
- GPT-style autoregressive decoding on the decoder side

It is strong for:
- generation
- summarization
- translation
- and still many understanding tasks

## T5

T5 pushes the "everything is text-to-text" view.

Main idea:
- cast many tasks into a unified sequence-to-sequence format
- pretrain with span corruption / infilling-style objectives

This makes the framework very general.

## Quick comparison

- ELMo: contextual embeddings from biLSTMs
- BERT: encoder-only masked LM
- GPT: decoder-only causal LM
- BART: encoder-decoder denoising seq2seq
- T5: unified text-to-text seq2seq

## One-sentence takeaway

Modern NLP moved from learning isolated embeddings to pretraining whole contextual models, then transferring them to downstream tasks through fine-tuning.
