const { get } = require('got')

async function stock(symbol, date) {
	const url = `https://arquivos.b3.com.br/apinegocios/ticker/${symbol}/${date}`
	const response = await get(url, {
		responseType: 'json',
		timeout: 15000
	})
	const body = JSON.parse(response.body)
	return body.values[0][2]
}

const timezone = -3
function removeWeekend(date) {
	if (date.getDay() === 6) date.setDate(date.getDate() - 1)
	if (date.getDay() === 0) date.setDate(date.getDate() - 2)
}
function getDate(offset = 0) {
	const date = new Date()
	date.setHours(date.getHours() + timezone)
	removeWeekend(date)
	date.setDate(date.getDate() + offset)
	removeWeekend(date)
	return date
}

function renderNumber(number) {
	if (number > 0) return `+${number.toFixed(2)}`
	return `${number.toFixed(2)}`
}

async function parse(text) {
	const pattern = /\$(\w{5,6})/g

	const date = getDate()
		.toISOString()
		.split('T')[0]
	const yesterday = getDate(-1)
		.toISOString()
		.split('T')[0]

	const matches = [...text.matchAll(pattern)].map(async ([_, symbol]) => {
		try {
			const prices = await Promise.all([
				stock(symbol, date),
				stock(symbol, yesterday)
			])
			const delta = renderNumber(prices[0] - prices[1])
			const change = prices[0] / prices[1]
			const percent = renderNumber((change < 0 ? 1 - change : change - 1) * 100)

			return [`${symbol}`, `${prices[0]} ${delta} ${percent}%`]
		} catch {
			return ['b3', 'request failed']
		}
	})

	return await Promise.all(matches)
}

module.exports = parse
