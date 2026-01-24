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







