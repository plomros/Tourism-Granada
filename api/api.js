
const datos = require("./data.json")
const monumentos = datos.monumentos
const restaurantes = datos.restaurantes


function elegirNSitios(tipo, nSitios) {
	try{
		let total = []
		let random = 0
		let array = []

		if(tipo == "monumentos")
			array = monumentos
		else
			array = restaurantes

		if(nSitios > array.length)
			nSitios = array.length

		for (let i=0; i < nSitios; i++) {
			random = Math.floor(Math.random() * array.length)
			total.push(array[random])
			array.splice(random, 1)
		}
		return total
	}
	catch (err) {
		return res.send({fulfillmentText: "Ha habido algun error: " + err})
	}
}
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

module.exports = (req, res) => {

try {
	let query = req.body.queryResult.intent.displayName
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
	switch (query) {
		case "consultaSiguienteSitio":
			try {
				let sitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
				let tipo = req.body.queryResult.outputContexts[0].parameters.LugaresInteres
				let nSitios = parseInt(sitios)
				let total = elegirNSitios(tipo, nSitios)

				let cad = "El siguiente sitio a visitar de la ruta es: " + total[0]

				return res.send({fulfillmentText: cad})
			}
			catch (err) {
				return res.send({fulfillmentText: "Ha habido algun error: " + err})
			}
		break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
		case "consultaLugaresVisitados":
			try {
				let sitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
				let tipo = req.body.queryResult.outputContexts[0].parameters.LugaresInteres
				let nSitios = parseInt(sitios)
				let total = elegirNSitios(tipo, nSitios)
				let nSitiosVisitados = Math.floor(Math.random() * total.length)

				let cad = "Por ahora se han visitado los lugares: \n"

				for (let i=0; i < nSitiosVisitados; i++) {
					if(i+2 == nSitiosVisitados)
						cad += total[i] + " y ";
					else
						cad += total[i] + ", ";

				}

				return res.send({fulfillmentText: cad})
			}
			catch (err) {
				return res.send({fulfillmentText: "Ha habido algun error: " + err})
			}
		break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
		case "consultaKilometrosPorRecorrer":
			try {
				let MARGEN = 20
				let km = Math.floor(Math.random() * MARGEN)
				let kmFaltantes = Math.floor(Math.random() * MARGEN)

				let cad = "Llevas andados " + km + " km y quedan todavia "
				+ kmFaltantes + " km por andar"

				return res.send({fulfillmentText: cad})
			}
			catch (err) {
				return res.send({fulfillmentText: "Ha habido algun error: " + err})
			}
		break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
		case "consultaLugaresPorVisitar":
			try {
				let sitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
				let tipo = req.body.queryResult.outputContexts[0].parameters.LugaresInteres
				let nSitios = parseInt(sitios)
				let total = elegirNSitios(tipo, nSitios)
				let nSitiosVisitados = Math.floor(Math.random() * total.length)

				let cad = "Quedan por visitar: \n"

				for (let i=0; i < nSitiosVisitados; i++) {
					if(i+2 == nSitiosVisitados)
						cad += total[i] + " y ";
					else
						cad += total[i] + ", ";

				}

				return res.send({fulfillmentText: cad})
			}
			catch (err) {
				return res.send({fulfillmentText: "Ha habido algun error: " + err})
			}
		break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
		case "generarRecorrido":
			try {
				let sitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
				let tipo = req.body.queryResult.outputContexts[0].parameters.LugaresInteres
				let nSitios = parseInt(sitios)
				let total = elegirNSitios(tipo, nSitios)

				let cad = "La ruta creada es: \n"
				total.forEach((elemento) => cad += elemento + ", ")

				return res.send({fulfillmentText: cad})
			}
			catch (err) {
				return res.send({fulfillmentText: "Ha habido algun error: " + err})
			}
			break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
			case "recomendacionLugarCercano":
				try {
					let total = elegirNSitios("monumentos", Math.floor(Math.random() * monumentos.length))

					let cad = "Según tu ubicación el lugar más cercano al que puedes ir es: "
					+ total[0].json()

					return res.send({fulfillmentText: cad})
				}
				catch (err) {
					return res.send({fulfillmentText: "Ha habido algun error: " + err})
				}
				break;
		}
	}
	catch (err) {
		return res.send({fulfillmentText: "Ha habido algun error: " + err})
	}
}
