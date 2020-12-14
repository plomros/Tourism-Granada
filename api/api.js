
module.exports = (req, res) => {

	function elegirNMonumentos(monumentos, nMonumentos) {
		let total = []
		let random = 0
		for (let i=0; i < nMonumentos; i++) {
			random = Math.floor(Math.random() * monumentos.length)
			total.push(monumentos[random])
			monumentos.splice(random, 1)
		}
		return total
	}


	let monumentos = ["Alhambra",
	"Palacio CarlosV",
	"Catedral",
	"Mirador San Nicolas",
	"Jardines Generalife",
	"Fuente de las Granadas",
	"Mirador San Miguel Alto",
	"Paseo de Los tristes",
	"Monasterio de San Jerónimo",
	"Sacromonte",
	"Capilla Real"]

	try {
		// let nSitios = req.queryResult.parameters.pais.CantidadSitios
		//
		// let total = elegirNMonumentos(monumentos, nSitios)
		//
		// let cad = ""
		// total.forEach((elemento) => cad += elemento + ", ")

		let pais = req.queryResult.parameters.pais
		let salida = pais + " funcionaaaaaaaaa"
		return res.send({fulfillmentText: salida})
	}
	catch (err) {
		return res.send({fulfillmentText: "Ha habido algun error" + err})
	}

}
