---
title: Regression
date: 2025-09-17 08:34:01
katex: true
tags:
  - EPFL
  - CS-433
  - Machine Learning
---

# Regression 回归

回归是一种建模方法，用来描述和预测**自变量（输入特征）与因变量（输出结果）之间的关系**。

Regression is to relate input variables to the output variable, to either predict outputs for new inputs and/or to understand the effect of the input on the output

## Dataset for regression 回归的数据集

数据集被分为若干个输入-输出对：

$$
(\mathbf{x}_n, y_n)
$$

其中：

- $\mathbf{x}_n$ 是维度为 $D$ 的向量，表示第 $n$ 个样本的输入特征。
- $y_n$ 是对应的输出标量。
- 一共有 $N$ 对这样的样本对，构成数据集。

因此，数据集可以写成：
$${\mathcal{D}} = \{ (\mathbf{x}_n, y_n) \}_{n=1}^N$$

进一步，所有输入和输出可以分别写成矩阵和向量形式：

- 输入矩阵（设计矩阵）：

$$
X = \begin{bmatrix}
\mathbf{x}_1^T \\
\mathbf{x}_2^T \\
\vdots \\
\mathbf{x}_N^T
\end{bmatrix} \in \mathbb{R}^{N \times D}
$$

- 输出向量：

$$
\mathbf{y} =
\begin{bmatrix}
y_1 \\
y_2 \\
\vdots \\
y_N
\end{bmatrix} \in \mathbb{R}^{N \times 1}
$$

## Two goals of regression 回归的两个目标

- Prediction 预测

  用模型对新的输入向量预测其输出。利用数据学到的函数关系来对未知数据进行估计

  we wish to predict the output for a new input vector

- Interpretation 解释

  理解输入变量对输出变量的影响。强调变量之间的因果或统计关系。

  we wish to understand the effect of inputs on output.

## The regression function 回归函数

找到一个函数
$$
f: \mathbb{R}^D\to \mathbb{R}
$$
然后期望它把输入 $\mathbf{x}_n$ 映射到输出 $y_n$ 并且与真实输出接近，也即 $y_n\approx f(\mathbf{x}_n)$

那么对于上述的两个目标而言，可以通过 $f(\mathbf{x}_n)$ 对某个新的输入进行预测。也可以通过 $f(\mathbf{x}_n)$ 的形式（例如大小）理解输入对输出的影响。

**注意: 相关性 $\neq$ 因果性 **