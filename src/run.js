const bandeco = require('./bandeco')
const calendar = require('./calendar')
const dicio = require('./dicio')
const dolar = require('./dolar')
const euro = require('./euro')
const math = require('./math')
const stock = require('./stock')
const twitter = require('./twitter')
const vaccine = require('./vaccine')
const weather = require('./weather')

function parserRunner(text) {
	return async parser => {
		try {
			return await parser(text)
		} catch (error) {
			console.error(error)
			return [['error', 'I could not retrieve the data']]
		}
	}
}

async function run({ text }) {
	const runner = parserRunner(text)
	const parsers = [
		bandeco,
		calendar,
		dicio,
		dolar,
		euro,
		math,
		stock,
		twitter,
		vaccine,
		weather
	]
	const promisedResults = parsers.map(runner)
	const results = await Promise.all(promisedResults)
	return results.flat()
}

module.exports = run
