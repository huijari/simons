const got = require('got')
const cheerio = require('cheerio')

const parse = async (text) => {
	const pattern = /^;covid$/
	if (!pattern.test(text)) return []

	const url = 'https://prefeitura.pbh.gov.br'
	const html = await got(`${url}/saude/coronavirus`).text()
	const dom = cheerio.load(html)
	const el = dom('dd a')[0]
	const href = `${url}${el.attribs.href}`
	const title = el.children[0].children[0].data.replace(/Epi.*n. /, '')
	return [[`<a href="${href}">${title}</a>`]]
}

module.exports = parse
