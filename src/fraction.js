function getFraction(number) {
	let floor = Math.floor(number)
	let a = [floor, 1]
	let b = [1, 0]
	while (number - floor > Number.EPSILON * Math.pow(b[0], 2)) {
		number = 1 / (number - floor)
		floor = Math.floor(number)
		a = [a[1] + floor * a[0], a[0]]
		b = [b[1] + floor * b[0], b[0]]
	}
	return `${a[0]}/${b[0]}`
}

function parse(text) {
	const pattern = /(\d+\.\d+)f/g
	if (!pattern.test(text)) return []
	pattern.lastIndex = 0

	const matches = [...text.matchAll(pattern)].map(([match, value]) => [
		match,
		getFraction(+value),
	])

	return matches
}

module.exports = parse
