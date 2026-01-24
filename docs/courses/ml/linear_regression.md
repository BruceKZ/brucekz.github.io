# Linear Regression 线性回归

线性回归是最简单的回归模型，涉及到几乎所有机器学习的基础概念。

线性回归可以写成
$$
\begin{align*}
y_n &\approx f(\mathbf{x}_n) \\
    &= w_0 + w_1 x_{n1} + \cdots + w_D x_{nD} \\
    &= w_0 + \mathbf{x}_n^{\top} 
       \begin{pmatrix} w_1 \\ \vdots \\ w_D \end{pmatrix} \\
    &= \tilde{\mathbf{x}}_n^{\top}\tilde{\mathbf{w}},
\end{align*}
$$
我们在输入向量和权重上面加了一个波浪线以表示它们包括了偏置项。

Note that we add a tilde over the input vector, and also the weights, to indicate they now contain the additional offset term (a.k.a. bias term). 

其中，输入向量 $\tilde{\mathbf{x}}_n=(1,x_{n1},x_{n2},\cdots,x_{nD})^{\top}$ 权重 $\tilde{\mathbf{w}}=(w_0,w_1,\cdots,w_D)^{\top}$。

**Use an 'offset' term? 是否要包含偏置项？**

- 数量：

  当不包含偏置项时，只需要学习 $D$ 个参数。而包含偏置项以后需要学习 $D+1$ 个参数。但这只是线性回归模型的特例，例如在神经网络中，第一层可能就有几百上千个参数。

- 灵活性：

  无偏置项时，模型强制要求拟合的超平面经过原点，这会降低模型的表达能力。有偏置项的模型你和更灵活。

## Learning / Estimation / Fitting 学习/估计/拟合

给定数据，找出权重 $\tilde{\mathbf{w}}$ 的过程就叫做学习/估计参数，或者叫拟合模型。Given data, we would like to find $\tilde{\mathbf{w}}=[w_0,w_1,\cdots,w_D]$. This is called learning or estimating the parameters or fitting the model.

## Matrix multiplication 矩阵乘法

这是线性代数 (Linear Algebra) 的基础知识。

1. 一个大小为 $M\times N_1$ 的矩阵和一个大小为 $N_2\times D$ 的矩阵能做乘法，iff $N_1=N_2$ 。
2. 一个大小为 $M\times N$ 的矩阵和一个大小为 $N\times D$ 的矩阵相乘得到一个大小为 $M\times D$ 的矩阵。

## Overparameterization 过参数化

Overparameterization 是指参数数量 $D$ 大于数据样本数量 $N$ 的情况。对于很多模型（比如线性回归），这会导致问题**欠定 (under-determined)**。我们就说模型对于这个任务来说是 **过参数化 (over-parameterized)** 的。

使用**正则化 (regularization)** 是避免这种识别问题的方法之一。如果忽略这种识别问题，过参数化有时候也可能带来好处，比如在训练动态方面。

Using regularization is a way to avoid the identification issue described. If we ignore the identification issue, overparameterization can also have advantages, such as on the trining dynamics.

## 