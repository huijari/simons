const bandeco = require('./bandeco')
const calendar = require('./calendar')
const dolar = require('./dolar')
const euro = require('./euro')

async function run({ text }) {
	const parsers = [bandeco, calendar, dolar, euro]
	const promisedResults = parsers.map(async parser => parser(text))
	const results = await Promise.all(promisedResults)
	return results.flat()
}

module.exports = run
