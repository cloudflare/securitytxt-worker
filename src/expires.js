/**
 * Copyright (c) 2020, Cloudflare, Inc. All rights reserved.
 * author: David Haynes <dhaynes@cloudflare.com>
 */
const dayjs = require('dayjs')
const fs = require('fs')

const main = async () => {
  fs.appendFile(
    './src/txt/security.txt.temp',
    `\nExpires: ${dayjs()
      .add(365, 'day')
      // Thu, 31 Dec 2020 18:37:07 -0800
      .format('ddd, D MMM YYYY HH:mm:ss ZZ')}\n\n`,
    function(err) {
      if (err) throw err
      console.log('Wrote expiration field!')
    },
  )
}

main()
