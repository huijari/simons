const got = require('got')

let cachedPtax = null
async function getPtax() {
	if (cachedPtax !== null) return cachedPtax

	const url = 'https://www.bcb.gov.br/api/conteudo/pt-br/PAINEL_INDICADORES/cambio?2018091717'
	const response = await got(url, { json: true })
	const { valorVenda } = response.body.conteudo.find(
		({ moeda, tipoCotacao }) =>
			moeda === 'Dólar' && tipoCotacao === 'Fechamento'
	)

	cachedPtax = valorVenda
	return valorVenda
}

async function Converter() {
	const ptax = await getPtax()
	const spread = 1.04
	const iof = 1.0638
	return value => value * ptax * spread * iof
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
