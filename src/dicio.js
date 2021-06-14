const got = require('got')
const cheerio = require('cheerio')
const { clean } = require('diacritic')

async function getDefinition(word) {
	const term = clean(word.split(' ').join('-').toLowerCase())
	const url = `https://dicio.com.br/${clean(term)}`
	try {
		const text = await got(url).text()
		const dom = cheerio.load(text)
		return dom('.significado')
			.find('span:not(.tag)')
			.map((_, span) => dom(span).text())
			.get()
			.join('\n')
	} catch {
		return 'not found'
	}
}

async function parse(text) {
	const pattern = /^;d (.*)/
	const match = pattern.exec(text)
	if (match === null) return []

	const definition = await getDefinition(match[1])
	return [[match[1], definition]]
}

module.exports = parse
