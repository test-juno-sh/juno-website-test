---
layout: post
title: "Running a notebook server with SSL"
description: "Follow these steps to prepare a self-signed SSL certificate for accessing Jupyter Notebook server from your iPad."
image: ""
lang: "en_GB"
date: 2017-09-01 10:00:00
author: Alex Staravoitau
---

In order to use Jupyter Notebook on your iPad or iPhone in both Juno and Safari, one needs to correctly configure SSL certificates. Since issuing a proper certificate from a trusted authority could be challenging in some cases, a self-signed certificate should suffice, provided it was signed by a CA that is trusted by device. 

Follow these steps to get it working on your iPhone or iPad.<!--more-->

### Prerequisites

The openssl library is required to generate your own certificate. Run the following command in your local environment to see if you already have openssl installed.

```bash
which openssl
# You should get something like /usr/bin/openssl if it's installed
```

If `which` command does not return a path then you will need to install openssl yourself.

| If you have... | Install with... |
| -------------- | --------------- |
| macOS          | [Homebrew](http://mxcl.github.com/homebrew/): `brew install openssl` |
| Windows        | [Windows complete package .exe installer](http://gnuwin32.sourceforge.net/packages/openssl.htm) |
| Ubuntu         | `apt-get install openssl` |

### Prepare configuration file

[Download configuration file](/assets/openssl.cnf) and put it in the folder, where you are going to store your SSH keys and certificates. 

Open configuration file in a text editor of your choice and put domain names and/or IP addresses of your servers at the bottom, in the **[ alt_names ]** section. If you connect to your server using its IP address (which happens to be **192.168.0.1**), your configuration file should end with:

```
...

[ alt_names ]
IP.1 	= 192.168.0.1
```

### Generate CA certificate

Open terminal and go to the directory with your configuration file, which will also be the root directory of where all your keys and certificates will be stored.

Create the directory structure for CA keys and certificates. The index.txt and serial files act as a flat file database to keep track of signed certificates.

```bash
mkdir ca ca/certs ca/crl ca/newcerts ca/private
chmod 700 ca/private
touch ca/index.txt
echo 1000 > ca/serial
```

Generate the CA root key, you will be asked to come up with a password to protect this key with.

```bash
openssl genrsa -aes256 -out ca/private/ca.key.pem 4096
chmod 400 ca/private/ca.key.pem
```

Use the root key (ca.key.pem) to create a root certificate (ca.cert.pem). Enter your private key pass phrase from the previous step and provide information that will be incorporated into your CA certificate (or hit Enter to use default value in square brackets).

```bash
openssl req -config openssl.cnf \
    -key ca/private/ca.key.pem \
    -new -x509 -days 7300 -sha256 -extensions v3_ca \
    -out ca/certs/ca.cert.pem
chmod 444 ca/certs/ca.cert.pem
```

### Generate SSL certificate

Assuming you are still in the directory where your configuration file is, create the directory structure and generate a new server key.

```bash
mkdir jupyter jupyter/csr jupyter/certs jupyter/private
chmod 700 jupyter/private
openssl genrsa -out jupyter/private/ssl.key.pem 2048
chmod 400 jupyter/private/ssl.key.pem
```

Request certificate for your server. Provide information that will be incorporated into your SSL certificate (or simply hit Enter to use defaults).

```bash
openssl req -config openssl.cnf \
    -key jupyter/private/ssl.key.pem \
    -new -sha256 -out jupyter/csr/ssl.csr.pem
```

Finally, issue your server SSL certificate. You will be asked to provide your CA private key pass phrase that you used earlier, and confirm your intention to sign SSL certificate.

```bash
openssl ca -config openssl.cnf \
    -extensions server_cert -days 1024 -notext -md sha256 \
    -in jupyter/csr/ssl.csr.pem \
    -out jupyter/certs/ssl.cert.pem
chmod 444 jupyter/certs/ssl.cert.pem
```

### Install CA certificate on your iPad

Install the **CA certificate** on your iPad (the one located at `ca/certs/ca.cert.pem`). You can e-mail it to yourself, share it via AirDrop or Dropbox — as soon as you open it on your iPad you will see installation popup.

![iOS certificate installation](/assets/img/install_cert_s.png)
{: style="text-align: center;"}

### Enable full trust for installed certificate

As of iOS 10.3 [you must manually turn on trust](https://support.apple.com/en-gb/HT204477) for SSL when you install a certificate. In order to turn on SSL trust for CA certificate, go to Settings > General > About > Certificate Trust Settings. Under "Enable full trust for root certificates", turn on trust for the certificate.

![iOS certificate installation](/assets/img/enable_cert_s.png)
{: style="text-align: center;"}

### Run Jupyter Notebook

Once CA certificate is trusted on the device, all certificates signed with it will be trusted too, including the one we generated for SSL, located at `jupyter/certs/ssl.cert.pem`. You can now use it when launching Jupyter Notebook by providing absolute paths to both key and certificate. If you generate all your certificate and keys in `~/.ssh/` folder, your paths will be:

```bash
jupyter notebook --certfile ~/.ssh/jupyter/certs/ssl.cert.pem --keyfile ~/.ssh/jupyter/private/ssl.key.pem
```

Alternatively, you can specify paths to key and certificate in [Jupyter configuration file](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html#running-a-public-notebook-server).

{:refdef: .notice}
<i class="fa fa-info-circle fa-2x" aria-hidden="true" style="color: #CCCCCC; vertical-align: middle;"></i><span style="display:inline-block; width: 8px;"></span> <span>This material was based on [OpenSSL Certificate Authority](https://jamielinux.com/docs/openssl-certificate-authority/) and [Creating a Self-Signed SSL Certificate](https://devcenter.heroku.com/articles/ssl-certificate-self) articles.</span>
{: refdef}
