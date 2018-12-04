const getRawBody = require('raw-body')
const Telegram = require('telegraf/telegram')

const run = require('./src/run')

const telegram = new Telegram(process.env.BOT_KEY)
function reply(chat, message, text) {
	telegram.sendMessage(chat, text, {
		reply_to_message_id: message
	})
}

async function json(request) {
	const body = await getRawBody(request, { encoding: true })
	return JSON.parse(body)
}

async function handler(request, response) {
	const { message } = await json(request)
	if (message && message.text) {
		const values = await run(message)
		if (values.length !== 0) {
			const responses = values.map(([from, to]) => `${from} ↝ ${to}`)
			reply(message.chat.id, message.message_id, responses.join('\n'))
		}
	}

	response.end()
}

module.exports = handler
