const bandeco = require('./bandeco')
const calendar = require('./calendar')
const dolar = require('./dolar')
const euro = require('./euro')
const twitter = require('./twitter')

async function run({ text }) {
	const parsers = [bandeco, calendar, dolar, euro, twitter]
	const promisedResults = parsers.map(async parser => parser(text))
	const results = await Promise.all(promisedResults)
	return results.flat()
}

module.exports = run
