---
layout: post
mathjax: true
title: You're up and running!
---

$$ N(x|\theta) = \frac{1}{\sqrt(2\pi\sigma^2}\exp{-\frac{(x-\mu)^2}{2\sigma^2}} $$

{% highlight python %}
μ = 35.
σ2 = 1.
σ = 1.
sample = np.random.normal(μ, σ, size=10*1000).reshape(10, -1)
{% endhighlight %}
