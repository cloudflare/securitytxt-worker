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
      // 2022-10-25T15:51:04.223Z
      .toISOString()}\n\n`,
    function(err) {
      if (err) throw err
      console.log('Wrote expiration field!')
    },
  )
}

main()
