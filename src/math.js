const { evaluate } = require('mathjs')

async function parse(text) {
	const pattern = /\$\$([^$]*)\$\$/gm

	const matches = [...text.matchAll(pattern)].map(async ([_, expression]) => {
		try {
			const result = evaluate(expression)
			return [`${expression}`, `${result}`]
		} catch {
			return ['math', 'could not evaluate expression']
		}
	})

	return await Promise.all(matches)
}

module.exports = parse
