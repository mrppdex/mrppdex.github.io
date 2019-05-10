---
layout: post
mathjax: true
title: Finding MLE of Distribution's Parameters 
---

## Intro

Let's say, we count cars taking a right-hand turn at a road intersection during single sequences of the traffic lights controlling the intersection:

| No. of Cars|
| --- |
|4 9 0 5 8 10 6 8 5|

We know, that what we are looking for is a Random Variable (RV) which is distributed according to the Poisson Distribution with parameter \\(\lambda\\): 

$$ X \sim \mathcal{Poisson}(\lambda) = \frac{\lambda^x}{x!}e^{-\lambda} $$

What we don't know, is the value of the parameter $$\lambda$$. To find it, first we have to come up with our estimator, and then, to estimate the maximum likelihood value of the parameter, that is, the parameter, that maximizes the likelihood function for the given observations.

The likelihood function is a product of $$n$$ probability mass functions, where n is the sample size:

$$ L(x) = \prod_{i=1}^{n} \frac{\lambda^x}{x_i!}e^{-\lambda} $$

To simplify the operations, we will be maximizing log-likehood function:

$$ \mathscr{l}(x) = \log{L(x)} = \sum_{i=1}^{n} \log{\frac{\lambda^x}{x_i!}e^{-\lambda}}
                  = \frac{\sum x_i}{\lambda} - \log{\prod {x_i}!} -n\lambda $$
                  
Assuming, the function is concave, we can find the global maximum by differentiating the log-likelihood function w.r.t. λ and finding where does it equal to 0:

$$ \frac{\partial \mathscr{l}(\lambda)}{\partial \lambda} = \frac{\sum x_i}{\lambda} - n = 0 \Rightarrow \hat{\lambda} = \frac{\sum x_i}{n} $$

Hence, our MLE λ is the mean value of the observations.

Now, to find, let's say 95% Confidence Interval, we can calculate Fisher Information and use it to calculate the CI of interest, or we can use the technique called Bootstrapping.

### Fisher Information.

Fisher information is the expected value of the negative second derivative of the log-likelihood function w.r.t. the parameter of interest:

$$ I(\theta) = E\left[-\frac{\partial^2}{\partial \theta^2} \log {f(X; \theta)} | \theta \right] $$

Hence, 

$$ I(\lambda) = E_{\lambda} \left[-\frac{\partial^2}{\partial \lambda^2} \mathscr{l}(X)\right] = E_{\lambda} \left[ \frac{\sum x_i}{\lambda^2}\right] $$

Now, because we don't have the population parameter $$\lambda$$, we have to substitute it with our already calculated $$\hat{\lambda}$$ to get:

$$ I(\lambda) = E_{\lambda} \left[\frac{n}{\bar{x}}\right] = \frac{n}{\bar{x}} $$

Knowing that, we can construct the CI:

$$ \hat{\theta} \pm Z_{(1-\alpha)100\%} {I(\theta)}^{-\frac{1}{2}} $$

$$ \hat{\lambda} \pm Z_{95%} {I(\lambda)}^{-\frac{1}{2}} = 6.11 \pm 1.61 = (4.50, 7.73) $$

### Bootstrapping.

Bootstrapping IS simulation. 

1. First we calculate the MLE of the parameter of interest ($$\hat{\lambda}$$),
2. We poll n samples from the distribution with this parameter (n is the length of the original observation vector),
3. We calculate the MLE of the parameter, using simulated sample,
4. Calculate the variance of all the simulated MLEs!

{% highlight python linenos %}
import numpy as np
from scipy import stats 

original_sample = np.array([4, 9, 0, 5, 8, 10, 6, 8, 5])
mean_original_sample = np.mean(original_sample)

simulated_lambdas = np.mean(np.random.poisson(lam=mean_original_sample, size=(10000, len(s))), axis=1)
params = stats.norm.fit(simulated_lambdas)
stats.norm(*params).interval(0.95)

{% endhighlight %}

We get:
`(4.505783477364434, 7,712260967080009)`

## Outro

OK
