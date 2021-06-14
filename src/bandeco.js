const { post } = require('got')

async function getCardapios(names) {
	const url = 'http://minha.fump.ufmg.br/fumpWs/cardapioRU'
	const token = process.env.FUMP_TOKEN
	const body = await post(url, {
		timeout: 3000,
		headers: {
			Authorization: `Basic ${token}`,
		},
	}).json()
	return body.filter(({ restaurante }) => names.includes(restaurante))
}

function restaurants(param) {
	const names = ['RU Setorial I', 'RU Setorial II']
	if (param === '') return names
	if (param === 'i') return [names[0]]
	if (param === 'ii') return [names[1]]
	return []
}

function view({ restaurante, tipoRefeicao, pratos }) {
	return [`${restaurante} (${tipoRefeicao})`, ['', ...pratos, ''].join('\n')]
}

async function parse(text) {
	const pattern = /^\/ru(i*)/
	const match = pattern.exec(text)
	if (match === null) return []

	try {
		const cardapios = await getCardapios(restaurants(match[1]))
		return cardapios.map(view)
	} catch {
		return [['fump', 'request failed']]
	}
}

module.exports = parse
