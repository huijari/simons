const getPtax = require('./ptax')
const { Converter, brl } = require('./dolar')

async function getRate() {
	const { dolar, euro } = await getPtax()
	return euro / dolar
}

async function parse(text) {
	const pattern = /([0-9]*\.[0-9]+|[0-9]+)\s*(eur)/g

	const rate = await getRate()
	const converter = await Converter()

	const matches = [...text.matchAll(pattern)].map(([match, value]) => [
		match,
		brl(converter(+value * rate))
	])

	return matches
}

module.exports = parse
