/**
 * Copyright (c) 2020, Cloudflare, Inc. All rights reserved.
 * author: David Haynes <dhaynes@cloudflare.com>
 */
import pubKey from './txt/security-cloudflare-public-06A67236.txt'
import securityTxt from './txt/security.txt'

/**
 * Ensure the correct txt file is returned.
 * @param {string} url The url from the incoming request
 */
const handleRequest = async request => {
  const { url } = request
  if (url.includes('/.well-known/security.txt')) {
    return new Response(securityTxt, {
      headers: { 'content-type': 'text/plain; charset=utf-8' }, // security.txt
    })
  } else if (url.includes('/gpg/security-at-cloudflare-pubkey-06A67236.txt')) {
    return new Response(pubKey, {
      headers: { 'content-type': 'text/plain; charset=utf-8' }, // GPG Public key
    })
  }
  return new Response('', {
    status: 404,
  })
}

// main()
addEventListener('fetch', event => {
  event.passThroughOnException()
  event.respondWith(handleRequest(event.request))
})
