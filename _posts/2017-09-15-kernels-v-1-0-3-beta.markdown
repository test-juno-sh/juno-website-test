---
layout: post
title: "Kernels v.1.0.3 beta"
description: "A new beta release of Kernels, a Jupyter Notebook client for iPad."
image: ""
lang: "en_GB"
date: 2017-09-15 12:00:00
author: Alex Staravoitau
---

Today we are releasing **Kernels v.1.0.3** update to our beta testers! It adds kernel-based code completion showing suggestions as you type, as well as includes a number of bug fixes and performance improvements. <!--more-->

![Kernels code completion](/assets/img/blog/autocorrect_v_1_0_3.png)
{: style="text-align: center;"}

#### What's new
* Code completion! Now it actually completes your code. It does that as you type, using the suggestions received from the kernel on your notebook server.
* A couple of bug fixes for issues reported by our beta testers.
* Various fixes and optimizations across handling web content.

#### Public beta
If you would like to participate and try out **Kernels** early, simply [sign up here](/#mce-EMAIL){:target="_blank"} and don't forget to confirm your e-mail address. We will then send you instructions on how to install **Kernels** build on your iPad. You will also get updates with new features as soon as they go live.

Please, keep in mind that you will need a remote Jupyter Notebook server to use the app, as it doesn't allow running notebooks locally. If you have a self-signed SSL certificate which doesn't work in Safari on iOS, take a look at our [step-by-step instructions](/ssl-self-signed-cert){:target="_blank"} on how to configure certificates and enable SSL, so that you are able to connect to your server from iPad. In case you still can't get it to work, please, check out [Jupyter documentation](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html){:target="_blank"} on running a notebook server, or send an e-mail to [help@kernels.io](mailto:help@kernels.io).
