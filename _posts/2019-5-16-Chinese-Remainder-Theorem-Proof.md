---
layout: post
mathjax: true
title: Chinese Remainder Theorem Proof
---

### Chinese Remainder Theorem Proof

$$
\begin{cases}
x  & \equiv a \text{(mod m)} \\
x  & \equiv b \text{(mod n)}
\end{cases} 
$$

$$
\begin{align*}
\text{gcd}(m,n) &= 1  \\
\Rightarrow 1 &= mv+nw \text{ (1)} \\
nw &= 1 - mv \text{ (3)}\\
x& = b+nj\text{ (2)}
\end{align*} 
$$

$$
\begin{align*}
b+nj \equiv a\text{ (mod m)} \Rightarrow b+nj &= a + mk\\
nj &=a-b+mk
\end{align*}
$$

From(1):

$$n^{-1} =w$$

Hence:

$$j=w(a-b)+mkw$$

Substitution to (2) gives us:

$$
\begin{align*}
x &= b+n\left[w(a-b)+mkw\right]\\
&=b+nwa-nwb+mnkw\\
&=nwa+mvb+mnkw\\
\end{align*}
$$

𐬽 $$x\equiv nwa+mvb\text{ (mod mn)}$$
