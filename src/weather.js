const { get } = require('got')

async function weather(location) {
	const url = `https://wttr.in/${location}?m&format=1`
	const { body } = await get(url, {
		timeout: 3000
	})
	return body.slice(0, -1)
}

async function parse(text) {
	const pattern = /w(?:eather)?@([a-zA-Z_]+)/g

	const matches = [...text.matchAll(pattern)].map(async ([_, location]) => {
		try {
			return [`weather @ ${location}`, await weather(location)]
		} catch {
			return ['wttr', 'request failed']
		}
	})

	return await Promise.all(matches)
}

module.exports = parse
