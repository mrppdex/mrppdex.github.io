---
layout: post
mathjax: true
title: Microsoft Interview Question 
---

## Solution to the Microsoft Interview Problem

*Find the span between the columns if the distance between the lowest point and the ground is 20m, the height of the poles is 50m and the length of the string spanned between them is 80m*

![alt text](/_posts/ms_span.png)


From the mechanics lessons, I remember that the chain spanned between two points under the gravitational force takes the shape of a $$cosh$$ function. Hence, we are trying to solve $$f(x) = a cosh(b x)$$, for $$a$$ and $$b$$.

We have three unknowns that we want to find, hence we need 3 equations:

1) $$f(0) = a cosh(0) = 20 \Rightarrow a = 20$$

2) Let $$l = \frac{L}{2}$$, then $$f(l) = 20 cosh(b l)=50 \Rightarrow bl = cosh^{-1}(2.5) \approx 1.5668$$

3) The length of a curve can be caluclated from:
$$l = \int^{l}_{0} ds = 40, \text{ where } ds = \sqrt{1 + \left( \frac{dy}{dx} \right)^2} dx$$

Fortunately, $$cosh$$ has the useful property, such that the area underneath it is equal to the length of the curve above. Therefore:

$$ \begin{align*}
20\int^{l}_{0} cosh(b x)\ dx &= 40 \\
\int^{l}_{0} cosh(bx)\ dx &= 2 \\
b^{-1} \left[ sinh(bx) \right]^l_0 &= 2 \\
b = \frac{sinh(bl)}{2} &= \frac{sinh(cosh^{-1}(2.5)}{2} = \sqrt{1.5 \times 3.5}\times0.5\\
\Rightarrow b=1.1456
\end{align*} $$

And,

$$1.456\times l = 1.5668 \Rightarrow l\approx \frac{1.5668}{1.1456} = 1.3677$$

So, $$\frac{L}{2}=1.3677 \Rightarrow L=2.7353$$

**Answer:**

*The span between the poles is around **2.7353** meters.*
