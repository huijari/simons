require('dotenv').config()

const Telegram = require('telegraf/telegram')
const { json } = require('micro')

const run = require('./src/run')
const events = require('./src/events')

const debug = process.env.DEBUG !== undefined

const telegram = new Telegram(process.env.BOT_KEY)
function reply({ message_id, chat }, text) {
	telegram.sendMessage(chat.id, text, {
		reply_to_message_id: message_id,
		parse_mode: 'HTML'
	})
}

async function handler(request) {
	const { message } = await json(request)

	if (message?.text !== undefined) {
		const values = await run(message)
		if (values.length !== 0) {
			const responses = values.map(([from, to]) => `${from} ↝ ${to}`).join('\n')
			if (debug) {
				console.log({ responses })
				return responses
			} else reply(message, responses)
		}
	}

	if (message?.event !== undefined) {
		const event = events[message.event]
		if (event !== undefined) reply(message, event)
	}

	return ''
}

module.exports = handler
