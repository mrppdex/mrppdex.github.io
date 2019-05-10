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

The likelihood function is a product of $$n$$ probability mass functions, where n is the sample size:

$$ L(x) = \prod_{i=1}^{n} \frac{\lambda^x}{x_i!}e^{-\lambda} $$

To simplify the operations, we will be maximizing log-likehood function:

$$ \mathcal{l}(x) = \log{L(x)} = \sum_{i=1}^{n} \log{\frac{\lambda^x}{x_i!}e^{-\lambda}}
                  = \frac{\sum x_i}{\lambda} - \log{\prod {x_i}!} -n\lambda $$

## Outro

OK
