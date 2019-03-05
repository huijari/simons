const getPtax = require('./ptax')

async function Converter() {
	const { dolar } = await getPtax()
	const spread = 1.04
	const iof = 1.0638
	return value => value * dolar * spread * iof
}

function brl(value) {
	const units = [
		'bagarote',
		'bolofofos',
		'bongos',
		'conto',
		'de cobre',
		'dinheiros',
		'merrecas',
		'mirréis',
		'pau',
		'reais',
		'tostão'
	]
	const unit = units[Math.floor(Math.random() * units.length)]
	return `${value.toFixed(2)} ${unit}`
}

async function parse(text) {
	const pattern = /([0-9]*\.[0-9]+|[0-9]+)\s*(d[oó]l[^\s]*|usd)/g
	const converter = await Converter()

	const matches = []
	let match
	while ((match = pattern.exec(text)) !== null) {
		const value = converter(+match[1])
		matches.push([match[0], brl(value)])
	}

	return matches
}

module.exports = parse
module.exports.Converter = Converter
module.exports.brl = brl
