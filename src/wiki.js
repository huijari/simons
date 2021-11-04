const got = require('got')

async function getLink(srsearch) {
	const { query } = await got('https://en.wikipedia.org/w/api.php', {
		searchParams: {
			srsearch,
			action: 'query',
			list: 'search',
			srlimit: 1,
			format: 'json',
			srprop: '',
			utf8: '',
		},
	}).json()
	if (query.searchinfo.totalhits === 0) return null
	const { title } = query.search[0]
	return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`
}

async function parse(text) {
	const pattern = /^;w (.*)/
	const match = pattern.exec(text)
	if (match === null) return []

	const link = await getLink(match[1])
	if (link === null) return []
	return [[match[1], link]]
}

module.exports = parse
