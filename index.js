const getRawBody = require('raw-body')

const run = require('./src/run')

async function json(request) {
  const body = await getRawBody(request, { encoding: true })
  return JSON.parse(body)
}

async function handler(request, response) {
  const { message } = await json(request)
  if (message && message.text) {
    const values = await run(message)
    console.table(values)
  }

  response.end()
}

module.exports = handler
