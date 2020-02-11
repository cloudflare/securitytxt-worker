# security.txt as a service -- Built on Cloudflare workers

- In order to save cost, we will deploying this one worker on two routes.

```
/.well-known/security.txt
/gpg/my-public-key.txt
```

Flow:

- Get a security.txt
- Get a PGP keypair
  - Generate one?
- Put the pubkey in a place
  - Tell us where that place is
- Sign the security.txt
- Deploy
