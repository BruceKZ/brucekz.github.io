# Course Backbone / 课程主线

这门课的主线可以压成一条方法升级链：

1. `one-hot / bag-of-words`
2. `word embeddings`
3. `n`-gram language models
4. `neural language models`
5. `RNN`
6. `LSTM / GRU`
7. `seq2seq + attention`
8. `transformer`
9. `pretraining`
10. `instruction tuning / preference optimization / post-training`

理解这门课时，最重要的不是单个公式，而是每一代方法在补什么缺口：

- `embedding` 补的是相似词之间的参数共享
- `RNN` 补的是固定窗口限制
- `LSTM / GRU` 补的是循环网络训练难题
- `attention` 补的是固定长度瓶颈
- `transformer` 补的是串行计算和长距离建模效率
- `pretraining` 补的是下游监督数据不足
- `post-training` 补的是“会续写”到“会按意图工作”的能力差距
