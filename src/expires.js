/**
 * Copyright (c) 2020, Cloudflare, Inc. All rights reserved.
 * author: David Haynes <dhaynes@cloudflare.com>
 */
const dayjs = require('dayjs')
const fs = require('fs')

const main = async () => {
  fs.appendFile(
    './src/txt/security.txt.template',
    `\nExpires: ${dayjs()
      .add(365, 'day')
      .format()}\n`,
    function(err) {
      if (err) throw err
      console.log('Saved!')
    },
  )
}

main()
