function weekStart(date) {
	let start = new Date(date.getTime())
	while (start.getDay() !== 0) start.setDate(start.getDate() - 1)
	return start
}

function dates(year, month) {
	const weeks = []

	let date = weekStart(new Date(year, month, 1))
	do {
		let week = new Array(7)
		for (i = 0; i < 7; i++) {
			week[i] = date.getMonth() === month ? date.getDate() : 0
			date.setDate(date.getDate() + 1)
		}
		weeks.push(week)
	} while (date.getMonth() <= month && date.getFullYear() === year)

	return weeks
}

async function parse(text) {
	if (text !== 'cal') return []

	const today = new Date()
	const raw = dates(today.getFullYear(), today.getMonth())

	const weekView = week =>
		week.map(day => (day === 0 ? '  ' : `${day}`.padStart(2))).join(' ')

	const result = `\n\`\`\`\n${raw.map(weekView).join('\n')}\n\`\`\``

	return [[today.toString().slice(4, 7), result]]
}

module.exports = parse
