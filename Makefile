# Copyright (c) 2020, Cloudflare, Inc. All rights reserved.
# author: David Haynes <dhaynes@cloudflare.com>

# Dependecies
clean:
	rm -f src/txt/security.txt
	rm -rf ./worker/ ./dist/

sign:
	gpg --local-user security@cloudflare.com -o src/txt/security.txt --clearsign src/txt/security.txt.temp
	rm src/txt/security.txt.temp

expire:
	cp src/txt/security.txt.template src/txt/security.txt.temp
	node ./src/expires.js

build: clean expire sign

# Interfaces
dev: build
	wrangler dev

deploy: build
	wrangler publish

.PHONY: clean deploy sign expire dev