# security.txt as a service -- Built on Cloudflare Workers

This is the worker that serves [security.txt](https://securitytxt.org) on [cloudflare.com](https://cloudflare.com)

## Background

From https://securitytxt.org,

```
When security risks in web services are discovered by independent security researchers who
understand the severity of the risk, they often lack the channels to disclose them properly.
As a result, security issues may be left unreported. security.txt defines a standard to help
organizations define the process for security researchers to disclose security vulnerabilities
securely.
```

Many reporters have difficulty finding our disclosure page (https://www.cloudflare.com/disclosure) and often submit tickets to our support staff who then inform them about our HackerOne program. The security.txt standard was submitted to the IETF to address this problem: https://tools.ietf.org/html/draft-foudil-securitytxt-08

We wanted to open source this code to allow anyone to easily deploy security.txt onto their Cloudflare zone.

## Steps for deployment

Deploying should take about 5 minutes or less.

The `Expires` field introduced in Draft-9 is appended to the template
automatically at a default value of 1 year after deployment.

### Dependencies

**Debian based systems**

```sh
sudo apt-get install build-essential gnupg -y
```

**macOS**

Please have [homebrew](https://brew.sh/) installed.

```sh
brew install gnupg
```

⚠️ Additionally, this project requires [wrangler](https://github.com/cloudflare/wrangler) to be installed for builds/deploys. In turn, this means that you'll need [Node installed](https://nodejs.org/en/download/package-manager/).

### Publishing on your zone

#### 1. Setup wrangler

You will need to configure wrangler.toml:

```sh
mv wrangler.toml.template wrangler.toml
```

and fill in the following values (account_id and zone_id are found on your Cloudflare zone dashboard):

- account_id
- zone_id
- routes

#### 2. Setup GPG

You will need to have a pre-existing GPG key in your keyring that's additionally uploaded to some public key server (tutorial here: [https://wiki.debian.org/Keysigning]()).

1. Export the public key and replace the one in this repo:

```sh
mv src/txt/security-cloudflare-public-06A67236.txt src/txt/my-pub-key.txt
gpg --export --armor your@email.com > src/txt/my-pub-key.txt
```

2. Then, update the path within the workers script to the new name of the public key file:

```js
import pubKey from './txt/my-pub-key.txt'

// and later ...

} else if (url.includes('/gpg/my-pub-key.txt')) {
```

3. Finally, update the email within the Makefile:

```
sign: clean
	gpg --local-user your@email.com -o src/txt/security.txt --clearsign src/txt/security.txt.template
```

#### 3. Deploy

With that, you're ready to go!

```sh
make deploy
```
