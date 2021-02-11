const got = require('got')

let cachedPtax = null
async function getPtax() {
	if (cachedPtax === null) {
		const url =
			'https://www.bcb.gov.br/api/conteudo/pt-br/PAINEL_INDICADORES/cambio?2018091717'
		const {
			body: { conteudo },
		} = await got(url, { json: true })

		const dolar = conteudo.find(
			({ moeda, tipoCotacao }) =>
				moeda === 'Dólar' && tipoCotacao === 'Fechamento'
		)
		const euro = conteudo.find(
			({ moeda, tipoCotacao }) =>
				moeda === 'Euro' && tipoCotacao === 'Fechamento'
		)

		cachedPtax = { dolar: dolar.valorVenda, euro: euro.valorVenda }
	}
	return cachedPtax
}

module.exports = getPtax
