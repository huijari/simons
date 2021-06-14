const got = require('got')
const cheerio = require('cheerio')

async function getTime(age, state) {
	const url = 'https://quandovouservacinado.com'
	try {
		const text = await got.post(url, { form: { age, state } }).text()
		const dom = cheerio.load(text)
		return dom('.d-block strong').text()
	} catch (e) {
		console.log(e)
		return 'not found'
	}
}

function parseTime(string) {
	const years = /(\d+) a/.exec(string)
	const months = /(\d+) m/.exec(string)
	const days = /(\d+) d/.exec(string)

	const date = new Date()
	if (years) date.setFullYear(date.getFullYear() + Number(years[1]))
	if (months) date.setMonth(date.getMonth() + Number(months[1]))
	if (days) date.setDate(date.getDate() + Number(days[1]))

	return date.toLocaleDateString('pt-BR')
}

async function parse(text) {
	const pattern = /^vaxx (\d{1,2}) (\w{2})$/
	const match = pattern.exec(text)
	if (match === null) return []

	const time = await getTime(match[1], match[2])
	const date = parseTime(time)
	return [['vaxx', `${time} (${date})`]]
}

module.exports = parse
