# Tokenization

Covered in: Week 3, Lecture 9 (`9-Tokenization`)

## Why tokenization exists

Raw text is not directly a sequence of model-ready discrete units.
Tokenization decides how text is chopped into units before modeling.

A token can be:
- a word
- a subword
- a character
- a byte
- sometimes something more specialized

## Word tokenization

The most intuitive approach is to split text into words and punctuation.

Example:

`We all love the modern NLP course!`

becomes:

`["We", "all", "love", "the", "modern", "NLP", "course", "!"]`

### Problems with word tokenization

- punctuation and abbreviations are tricky
- many languages do not use whitespace cleanly
- morphology causes huge vocabularies
- OOV words are painful

Examples from the lecture:
- `Prof.`
- `don't`
- `3-year-old`
- Chinese / Thai without whitespace

## Character tokenization

Character-level tokenization solves OOV much better because vocabulary is tiny.

Advantages:
- small vocabulary
- robust to noise
- no unknown word problem in the usual sense

Disadvantages:
- sequences become much longer
- learning semantic composition becomes harder

## Subword tokenization

Subword tokenization is the compromise between word and character levels.

Desired behavior:
- frequent words stay intact
- rare words get decomposed into meaningful pieces

This reduces vocabulary size while preserving more semantic structure than plain characters.

## BPE

Byte Pair Encoding is one of the most important subword methods.

Training procedure:
1. Split words into characters.
2. Build an initial vocabulary of characters.
3. Count adjacent pair frequencies.
4. Merge the most frequent pair.
5. Add the merged unit to the vocabulary.
6. Repeat until reaching the token budget.

Key property:
BPE is greedy and frequency-driven.

## Pre-tokenization

BPE usually assumes some earlier rough segmentation into "word-like" units.
That preliminary step is called pre-tokenization.

Examples:
- whitespace splitting
- punctuation splitting
- unicode normalization

This matters because tokenization quality depends partly on what happens before BPE even starts.

## Other subword methods

### WordPiece

Similar spirit to BPE, but merge decisions depend not only on raw pair frequency.

### SentencePiece

Designed to work directly on raw text without classic pre-tokenization.
It also treats whitespace as part of the modeling process.

This is useful for multilingual settings and scripts where word boundaries are less obvious.

## Byte-level tokenization

Byte-level methods represent text as UTF-8 bytes.

Advantages:
- essentially no OOV problem
- robust to noisy text
- avoids huge word vocabularies

Disadvantage:
- sequences get even longer
- training and inference become slower

The lecture mentioned ByT5 as a tokenizer-free direction.

## How big should the vocabulary be?

There is no universal answer.
Vocabulary size depends on:
- data size
- number of languages
- number of domains
- task mix

Rule of thumb from the slides:
- smaller datasets usually want smaller subword vocabularies
- large corpora can support larger vocabularies

## Important limitations

Subwords are not the same as linguistic morphemes.
So tokenization is a modeling convenience, not a perfect theory of language.

It can still behave poorly on:
- agglutinative morphology
- non-concatenative morphology
- scripts with hard segmentation problems
- noisy informal text

## One-sentence takeaway

Tokenization is the design choice that defines the model's input alphabet, and modern NLP usually uses subword methods because they balance vocabulary size, generalization, and robustness.
