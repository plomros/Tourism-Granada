
const datos = require("./data.json")
const datosSintomas = require("./sintomas.json")
const entradas = require("./alhambra.js")
/******************************************************************************/
/***********************Variables globales*************************************/
/******************************************************************************/
const monumentos = datos.monumentos
const restaurantes = datos.restaurantes
let ultimoLugarVisitado = ""
let ruta = [];
/******************************************************************************/
/********************Funciones*************************************************/
/******************************************************************************/


/******************** Elige "nSitios" sitios del tipo "tipo" de datos**********/
/************************** obtenidos de los json******************************/
function elegirNSitios(tipo, nSitios) {
	try{
		let total = []
		let random = 0
		let array = []

		if(tipo == "monumentos") {
			if(nSitios > monumentos.length)
				nSitios = monumentos.length

			for (let i=0; i < nSitios; i++)
				array.push(monumentos[i])
		}

		else {
			if(nSitios > restaurantes.length)
				nSitios = restaurantes.length

			for (let i=0; i < nSitios; i++)
				array.push(restaurantes[i])
		}


		for (let i=0; i < nSitios; i++) {
			random = generarEntero(0, array.length)
			total.push(array[random])
			array.splice(random, 1)
		}

		return total
	}
	catch (err) {
		return res.send({fulfillmentText: "Ha habido algun error: " + err})
	}
}

function generarEntero(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
/******************************************************************************/
/*Llama a funcion que devuelve el precio de las entrdas de la Alhambra*********/
/***************y espera el resultado mediante await para evitar responder*****/
/**********************antes de obtener los datos******************************/
/******************************************************************************/
async function getPrecio(tipo) {
	const total = []

	await getEntradas().then((precio) => {total.push(precio);})

	return (total)
}
/******************************************************************************/
/****************Se obtienen los datos de DialogFlow en formato JSON***********/
/**************************** y se exporta la respuesta************************/
module.exports = (req, res) => {
	try {
		let query = req.body.queryResult.intent.displayName
		// Devuelve el nombre del intent y dependiendo del mismo se realiza
		//una u otra accion
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
		switch (query) {
			case "consultaSiguienteSitio":
				try {

					let cad = "El siguiente sitio a visitar de la ruta es: " + ruta[0]

					// Para devolver el siguiente dia
					let dia = new Date();
					let horaActual = (dia.getUTCHours() + 1); // En Madrid UTC+1

					if(horaActual > 13 && horaActual < 16)
						cad += "\n\nSegun tu ubicación son las " + horaActual
						+ ", ¿Quieres hacer un descanso para comer? "

					else if(horaActual > 20 && horaActual < 22)
						cad += "\n\nSegun tu ubicación son las " + horaActual
						+ ", ¿Quieres hacer un descanso para cenar? "

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
					let nSitiosVisitados = generarEntero(1, total.length)

					let cad = "Por ahora se han visitado los lugares: \n"

					for (let i=0; i < nSitiosVisitados; i++) {
						if(i+2 == nSitiosVisitados)
							cad += total[i] + " y ";						// Para unir el penultimo y
						else
							cad += total[i] + ", ";							// ultimo sitio con una "y"
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
					let km = generarEntero(1, MARGEN)
					let kmFaltantes = generarEntero(1, MARGEN)

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
					let nSitiosVisitados = generarEntero(1, total.length)

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
					ruta = []
					total.forEach((elemento) => {
						cad += elemento + ", "
						ruta.push(elemento)
					})

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
						let rand = generarEntero(1, monumentos.length);
						let total = elegirNSitios("monumentos", rand)

						let cad = "Segun tu ubicación el lugar más cercano al que puedes ir es: "
						+ total[0]

						return res.send({fulfillmentText: cad})
					}
					catch (err) {
						return res.send({fulfillmentText: "Ha habido algun error: " + err})
					}
				break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
			case "comprarEntradas":
				try {
					let precio = 0;
					let tipoTicket = req.body.queryResult.outputContexts[0].parameters.TipoCiudadano
					let monumento = req.body.queryResult.queryText

					if(monumento == "Alhambra") {
						(async () => {
							entradas.getEntradas().then(entrad => {
									for(let i=0; i < entrad.length; i++) {
										if(entrad[i].tipo == tipoTicket) {
											precio = entrad[i].precio
											return res.send({fulfillmentText: "El precio para "
											+ tipoTicket + " es de " + precio + "€"});
										}
									}
							});
						})();
					}

					else {
						return res.send({fulfillmentText: "El precio para "
						+ monumento + " es de " + generarEntero(0, 20) + "€"});
					}

				}
				catch (err) {
					return res.send({fulfillmentText: "Error: " + err})
				}
			break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
			case "respuestaAfirmativaConsejoSintomasSinRutaActiva":
				try {
					let sintoma = req.body.queryResult.outputContexts[0].parameters.sintomas
					let enfermedad = []

					for (let i in datosSintomas)
						enfermedad.push([i, datosSintomas[i]])

					for(let i=0; i < enfermedad.length; i++) {
						if(enfermedad[i][0] == sintoma)
							return res.send({fulfillmentText: "Consejo: " + enfermedad[i][1]})
					}
				}
				catch (err) {
					return res.send({fulfillmentText: "Error: " + err})
				}
			break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
			case "respuestaAfirmativaConsejoSintomasConRutaActiva":
				try {
					let sintoma = req.body.queryResult.outputContexts[0].parameters.sintomas
					let enfermedad = []

					for (let i in datosSintomas)
						enfermedad.push([i, datosSintomas[i]])

					for(let i=0; i < enfermedad.length; i++) {
						if(enfermedad[i][0] == sintoma)
							return res.send({fulfillmentText: "Consejo: " + enfermedad[i][1]})
					}
				}
				catch (err) {
					return res.send({fulfillmentText: "Error: " + err})
				}
			break;
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
		} // Fin switch
	} // Fin try
	catch (err) {
		return res.send({fulfillmentText: "Ha habido algun error: " + err})
	}
}
