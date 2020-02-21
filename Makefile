# Copyright (c) 2020, Cloudflare, Inc. All rights reserved.
# author: David Haynes <dhaynes@cloudflare.com>

clean:
	rm -f src/txt/security.txt
	rm -rf ./worker/ ./dist/

sign: clean
	gpg --local-user 06A67236 -o src/txt/security.txt --clearsign src/txt/security.txt.template

deploy: sign
	wrangler publish

.PHONY: clean deploy sign