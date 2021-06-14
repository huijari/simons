const { get } = require('got')

async function getTweet(id) {
	const url = `https://api.twitter.com/1.1/statuses/show.json?id=${id}`
	const token = process.env.TWITTER_TOKEN
	const body = await get(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).json()
	return body
}

function getQuoted({ quoted_status }) {
	if (quoted_status) {
		const {
			id_str,
			user: { screen_name },
		} = quoted_status
		return [['quoted', `https://twitter.com/${screen_name}/status/${id_str}`]]
	}
	return []
}

function getInReply({ in_reply_to_status_id_str, in_reply_to_screen_name }) {
	if (in_reply_to_status_id_str) {
		const [id_str, screen_name] = [
			in_reply_to_status_id_str,
			in_reply_to_screen_name,
		]
		return [['replying', `https://twitter.com/${screen_name}/status/${id_str}`]]
	}
	return []
}

async function parse(text) {
	const pattern = /twitter\.com\/\w*\/status\/(\d*)/
	let match = pattern.exec(text)
	if (match === null) return []

	const tweet = await getTweet(match[1])
	return [...getQuoted(tweet), ...getInReply(tweet)]
}

module.exports = parse
