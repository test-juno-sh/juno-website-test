---
layout: post
title: "Juno v.1.0.4 beta"
description: "A new beta release of Juno, a Jupyter Notebook client for iPad."
image: /assets/img/blog/keyboard_v_1_0_4.png
lang: "en_GB"
date: 2017-10-04 12:00:00
author: Alex Staravoitau
---

Today we are releasing **Juno v.1.0.4** update to our beta testers! It adds on-screen keyboard extension and 1Password integration, as well as includes a number of bug fixes and performance improvements. <!--more-->

![Juno keyboard extension](/assets/img/blog/keyboard_v_1_0_4.png)
{: style="text-align: center;"}

#### What's new
* On-screen keyboard! It now features extension that lets you navigate the code and perform quick actions on cells, as well as provides access to special characters you may need.
* This version adds a couple of new keyboard shortcuts to match desktop behaviour.
* You can now create new notebooks and terminals, which should open automatically.
* 1Password integration. If your server is secured with a password, you can now use 1Password to authenticate seamlessly.
* Fixes a number of smaller bugs and issues reported by our beta testers.

#### Public beta
If you would like to participate and try out **Juno** early, simply [sign up here](/juno#mce-EMAIL){:target="_blank"} and don't forget to confirm your e-mail address. We will then send you instructions on how to install **Juno** build on your iPad. You will also get updates with new features as soon as they go live.

Please, keep in mind that you will need a remote Jupyter Notebook server to use the app, as it doesn't allow running notebooks locally. If you have a self-signed SSL certificate which doesn't work in Safari on iOS, take a look at our [step-by-step instructions](/ssl-self-signed-cert){:target="_blank"} on how to configure certificates and enable SSL, so that you are able to connect to your server from iPad. In case you still can't get it to work, please, check out [Jupyter documentation](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html){:target="_blank"} on running a notebook server, or send an e-mail to [help@kernels.io](mailto:help@kernels.io).
