# Copyright (c) 2020, Cloudflare, Inc. All rights reserved.
# author: David Haynes <dhaynes@cloudflare.com>

clean:
	rm -f src/txt/security.txt
	rm -rf ./worker/ ./dist/

sign:
	gpg --local-user 0E7BEF12E59AAB25416AF4A3222FDE8206A67236 -o src/txt/security.txt --clearsign src/txt/security.txt.template

deploy: clean sign
	wrangler publish

.PHONY: clean deploy sign