const got = require('got')
const cheerio = require('cheerio')

async function getStatus(objetos) {
	const url =
		'https://www2.correios.com.br/sistemas/rastreamento/ctrl/ctrlRastreamento.cfm'
	try {
		const text = await got.post(url, { form: { objetos } }).text()
		const dom = cheerio.load(text)
		const status = dom('.sroLbEvent').first().text().trim()
		return status
			.replace('\n', ',')
			.replaceAll('\t', '')
			.replaceAll('\n', ' ')
			.replaceAll(/\s+/g, ' ')
	} catch (e) {
		console.log(e)
		return 'correios didn\'t respond'
	}
}

async function parse(text) {
	const pattern = /\w{2}\d{9}\w{2}/
	const match = pattern.exec(text)
	if (match === null) return []

	const status = await getStatus(match[0])
	return [[`Pacote ${match[0]}`, status]]
}

module.exports = parse
