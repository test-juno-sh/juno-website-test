---
layout: post
title: "Jupyter Notebook via HTTPS"
description: "Follow these steps to prepare a self-signed SSL certificate for accessing Jupyter Notebook server from your iPad."
image: ""
lang: "en_GB"
date: 2017-08-11 20:54:46
author: Alex Staravoitau
---

Do this.
<!--more-->
```bash
$ mkdir ca ca/certs ca/crl ca/newcerts ca/private
$ chmod 700 ca/private
$ touch ca/index.txt
$ echo 1000 > ca/serial
```
