const bandeco = require('./bandeco')
const calendar = require('./calendar')
const covid = require('./covid')
const dicio = require('./dicio')
const dolar = require('./dolar')
const euro = require('./euro')
const fraction = require('./fraction')
const math = require('./math')
const stock = require('./stock')
const twitter = require('./twitter')
const weather = require('./weather')
const wiki = require('./wiki')

function parserRunner(text) {
	return async (parser) => {
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
		covid,
		dicio,
		dolar,
		euro,
		fraction,
		math,
		stock,
		twitter,
		weather,
		wiki,
	]
	const promisedResults = parsers.map(runner)
	const results = await Promise.all(promisedResults)
	return results.flat()
}

module.exports = run
