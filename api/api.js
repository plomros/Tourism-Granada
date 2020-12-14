
module.exports = (req, res) => {

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

	let restaurantes = [
		"El peruano",
		"Biggies",
		"Aliatar",
		"El poderio",
		"Los Diamantes",
		"La esquinita de Javi",
		"El pescaito de Carmela",
		"Palacio Los patos"]


	function elegirNSitios(tipo, nSitios) {
		let total = []
		let random = 0
		let array = []

		if(tipo == "monumentos")
			array = monumentos
		else
			array = restaurantes

		for (let i=0; i < nSitios; i++) {
			random = Math.floor(Math.random() * array.length)
			total.push(array[random])
			array.splice(random, 1)
		}
		return total
	}

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

}


/*
	switch (req.) {
		case CantidadSitios:

		break;
}

*/
