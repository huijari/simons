const got = require('got')

async function getDog() {
    const url = 'https://api.thedogapi.com/v1/images/search?mime_types=jpg,png&limit=1'
    const token = process.env.DOG_TOKEN
    const body = await got(url, {
        headers: {
            'x-api-key': `${token}`
        }
    })

    return `${body[0].url}`
}

async function parse(text) {
    const pattern = /^\/dog/
    const match = pattern.exec(text)

    if (match === null) return []

    try {
        const dog = await getDog()
        return dog
    }
    catch {
        return [['dog', 'request failed']]
    }
}

module.exports = parse