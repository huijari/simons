const { get } = require('got')

async function weather(location) {
	const url = `https://wttr.in/${location}?m&format=1`
	const { body } = await get(url, {
		timeout: 3000
	})
	return body
}

async function parse(text) {
	const pattern = /wttr@([a-zA-Z_]+)/g

	const matches = []
	let match
	while ((match = pattern.exec(text)) !== null) {
		try {
			const location = match[1]
			matches.push([`weather @ ${location}`, await weather(location)])
		} catch {
			matches.push(['wttr', 'request failed'])
		}
	}

	return matches
}

module.exports = parse
