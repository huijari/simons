const { get } = require('got')

async function getQuoted(id) {
	const url = `https://api.twitter.com/1.1/statuses/show.json?id=${id}`
	const token = process.env.TWITTER_TOKEN
	const { body } = await get(url, {
		json: true,
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return body.quoted_status
}

function view({ id_str, user }) {
	return ['quoted', `https://twitter.com/${user.screen_name}/status/${id_str}`]
}

async function parse(text) {
	const pattern = /twitter\.com\/\w*\/status\/(\d*)/
	let match = pattern.exec(text)
	if (match === null) return []

	const quoted = await getQuoted(match[1])
	if (quoted) return [view(quoted)]
	return []
}

module.exports = parse
