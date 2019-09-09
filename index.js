require('dotenv').config()

const Telegram = require('telegraf/telegram')
const { json } = require('micro')

const run = require('./src/run')

const telegram = new Telegram(process.env.BOT_KEY)
function reply(chat, message, text) {
	if (process.env.DEBUG !== undefined) console.log({ text })
	else
		telegram.sendMessage(chat, text, {
			reply_to_message_id: message,
			parse_mode: 'HTML'
		})
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

	return ''
}

module.exports = handler
