
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
		// let nSitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
		//
		// let total = elegirNMonumentos(monumentos, nSitios)
		//
		// let cad = "La ruta creada es: \n"
		// total.forEach((elemento) => cad += elemento + ", ")

		return res.send({fulfillmentText: JSON.stringify(req.body.queryResult.outputContexts[0].parameters)})
	}
	catch (err) {
		return res.send({fulfillmentText: "Ha habido algun error: " + err})
	}

}


/*
	switch (req.) {
		case CantidadSitios:

		break;
}

*/
