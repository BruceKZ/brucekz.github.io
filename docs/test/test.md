# LaTeX 示例文档

## 1. 行内公式

行内展示爱因斯坦质能方程：$E = mc^2$。  
再来一个二次公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$。

---

## 2. 块级公式

常见的高斯积分：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

勾股定理表示为：

$$
a^2 + b^2 = c^2
$$

---

## 3. 矩阵与向量

$$
\mathbf{A} =
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

列向量：

$$
\vec{v} =
\begin{pmatrix}
x \\
y \\
z
\end{pmatrix}
$$

---

## 4. 分数与极限

$$
\lim_{n \to \infty} \frac{1}{n} = 0
$$

级数：

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

---

## 5. 希腊字母与符号

行内：$\alpha, \beta, \gamma, \theta, \lambda, \pi, \Omega$。

块级：

$$
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
$$

---

## 6. （可选）化学式

如果在插件里启用了 `mhchem: true`，可以写化学方程式：

$$
\ce{2 H2 + O2 -> 2 H2O}
$$

---

## 7. 对照文字 + 公式

牛顿第二定律：力 $F$ 与质量 $m$ 和加速度 $a$ 的关系为：

$$
F = ma
$$
