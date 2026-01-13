# Regression 回归

回归是一种建模方法，用来描述和预测**自变量（输入特征）与因变量（输出结果）之间的关系**。

Regression is to relate input variables to the output variable, to either predict outputs for new inputs and/or to understand the ef'fect of the input on the output

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
$$
{\mathcal{D}} = \{ (\mathbf{x}_n, y_n) \}_{n=1}^N
$$
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

  we wish to predict the output for a new input vector.

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

**注意: 相关性 $\neq$ 因果性**

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

# Loss functions 损失函数

## What is a loss function? 什么是损失函数？

损失函数量化了模型的表现，换句话说就是模型的错误代价有多高。

The loss function quantifies how well our model does - or in other words how costly nour mistakes are.

## Two desirable properties of loss functions 损失函数的两个理想特性

我们希望成本在 $0$ 周围是对称的，因为正误差和负误差应该受到同等惩罚。

When the target $y$ is real-valued, it is often desirable that the cost is symmetric around $0$, since both positive and negative errors should be penalized equally.

我们的成本函数应该以类似的方式惩罚较大的错误和非常大的错误。

Our cost function should penalize "large" mistakes and "very-large" mistakes similarly.

## Statistical vs computational trade-ff 统计与计算的权衡

二者不能兼得。如果想要更好的统计特性，那么必须放弃良好的计算特性。

If we want better statistical properties, then we have to give-up good computational properties.

## MSE - Mean square error 均方误差

$$
\text{MSE}(\mathbf{w}) := \frac{1}{N}\sum_{n=1}^{N}\big[y_n - f_\mathbf{w}(\mathbf{x}_n)\big]^2
$$
对于 $n$ 个数据点，求**每个点真实值减去预测值的平方**之和。再求平均。得到了均方误差。

均方误差对于异常值很敏感。因为平方会放大误差，所以异常值的影响会被极度放大。导致模型过于拟合异常点，整体表现变差。

所以当数据中有异常值时，MSE 不是一个理想的损失函数。考虑除去异常值再使用 MSE 或者对异常值用更加 robust 的损失函数例如 MAE。

## Outliers 异常值
- 异常值是那些在数据集中远离大部分数据点的样本。

虽然我们希望数据都干净整齐，但在现实里，异常值出现的频率比想象的要多。

异常值可能来源于测量误差、录入错误、或真实的极端情况。在建模时，异常值会对模型结果产生严重影响，尤其是回归模型。


**能够很好的处理异常值**是一种理想的统计特性。

Handling outliers well is a desired statistical property.

## Mean Absolute Error 平均绝对误差

$$
\text{MAE}(\mathbf{w}) := \frac{1}{N}\sum_{n=1}^{N} \big| y_n - f_\mathbf{w}(\mathbf{x}_n) \big|
$$
对于 $n$ 个数据点，求**每个点的真实值减去预测值的绝对值**之和。再求平均。得到了平均绝对误差。

平均绝对误差对误差越大的数据惩罚越大，对 outliers 不敏感。

## Convexity 凸性

如果一个函数是凸函数，那么它的图像应该像碗一样开口向上。任意两点之间连一条直线，这条线应该始终在图像上方或者重合。

Def:

A function $h(\mathbf{u})$ with $\mathbf{u}\in \mathbb{R}^{D}$ is ***convex***，if for any $\mathbf{u},\mathbf{v} \in \mathbb{R}^{D}$, and for any $\lambda\in [0,1]$, we have:
$$
h(\lambda\mathbf{u} + (1-\lambda)\mathbf{v}) \leq \lambda h(\mathbf{u}) + (1-\lambda)h(\mathbf{v})
$$

A function is strictly convex if the inequality is strict.

这个式子里面，左侧是对 x 加权，右侧对 y 加权。实际上线段 uv 上面点 p 的的构成可以表示为 $v+\lambda(u-v)$ 也就是 $\lambda u + (1-\lambda)v$，对应 $x_p=\lambda x_u + (1-\lambda)x_v$，$y_p=\lambda y_u + (1-\lambda)y_v$

这个线段是在函数图像之上的，这一点对应的函数值 $f(x_p)=f(\lambda x_u + (1-\lambda)x_v)$。所以得到了上面的式子。

## Importance of convexity 凸性的重要性

A strictly convex function has a unique global minimum $\mathbf{w}^\star$ . For convex functions, every local minimum is a global minimum.

严格凸函数有唯一的全局最小值。对于普遍的凸函数，每一个局部最小值（极小值）都是全局最小值。注：有一些函数在最小值部分一整段都是平的，那这平的一段每个点处的函数值都可以是最小值。

Sums of convex functions are also convex.

凸函数之和仍然为凸函数。

Convexity is a desired computational property.
**凸性**是一种理想的计算特性。
