const got = require('got')
const cheerio = require('cheerio')
const { decode } = require('iconv-lite')

async function getStatus(objetos) {
	const url =
		'https://www2.correios.com.br/sistemas/rastreamento/ctrl/ctrlRastreamento.cfm'
	try {
		const buffer = await got.post(url, { form: { objetos } }).buffer()
		const text = decode(buffer, 'latin1')
		const dom = cheerio.load(text)
		const status = dom('.sroLbEvent').first().text().trim()
		return (
			status
				.replace('\n', ',')
				.replaceAll('\t', '')
				.replaceAll('\n', ' ')
				.replaceAll(/\s+/g, ' ') || 'not found'
		)
	} catch (e) {
		console.log(e)
		return "correios didn't respond"
	}
}

async function parse(text) {
	const pattern = /\p{L}{2}\d{9}\p{L}{2}/u
	const match = pattern.exec(text)
	if (match === null) return []

	const status = await getStatus(match[0])
	return [[`Pacote ${match[0]}`, status]]
}

module.exports = parse
