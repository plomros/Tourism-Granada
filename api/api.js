
const datos = require("./data.json")
const entradas = require("./alhambra.js")

const monumentos = datos.monumentos
const restaurantes = datos.restaurantes
let ultimoLugarVisitado = ""
let ruta = [];


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


async function getPrecio(tipo) {
	const total = []

	await getEntradas().then((precio) => {total.push(precio);})


	return (total)
}

/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

module.exports = (req, res) => {
	try{
return res.send({fulfillmentText: "Hola " })}catch (err) {
				return res.send({fulfillmentText: "Ha habido algun error: " + err})
			}
// try {
// 	let query = req.body.queryResult.intent.displayName
// /******************************************************************************/
// /******************************************************************************/
// /******************************************************************************/
// 	switch (query) {
// 		case "consultaSiguienteSitio":
// 			try {
//
// 				let cad = "El siguiente sitio a visitar de la ruta es: " + ruta[0]
//
// 				return res.send({fulfillmentText: cad})
// 			}
// 			catch (err) {
// 				return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 			}
// 		break;
// /******************************************************************************/
// /******************************************************************************/
// /******************************************************************************/
// 		case "consultaLugaresVisitados":
// 			try {
// 				let sitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
// 				let tipo = req.body.queryResult.outputContexts[0].parameters.LugaresInteres
// 				let nSitios = parseInt(sitios)
// 				let total = elegirNSitios(tipo, nSitios)
// 				let nSitiosVisitados = generarEntero(1, total.length)
//
// 				let cad = "Por ahora se han visitado los lugares: \n"
//
// 				for (let i=0; i < nSitiosVisitados; i++) {
// 					if(i+2 == nSitiosVisitados)
// 						cad += total[i] + " y ";
// 					else
// 						cad += total[i] + ", ";
// 				}
//
// 				return res.send({fulfillmentText: cad})
// 			}
// 			catch (err) {
// 				return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 			}
// 		break;
// /******************************************************************************/
// /******************************************************************************/
// /******************************************************************************/
// 		case "consultaKilometrosPorRecorrer":
// 			try {
// 				let MARGEN = 20
// 				let km = generarEntero(1, MARGEN)
// 				let kmFaltantes = generarEntero(1, MARGEN)
//
// 				let cad = "Llevas andados " + km + " km y quedan todavia "
// 				+ kmFaltantes + " km por andar"
//
// 				return res.send({fulfillmentText: cad})
// 			}
// 			catch (err) {
// 				return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 			}
// 		break;
// /******************************************************************************/
// /******************************************************************************/
// /******************************************************************************/
// 		case "consultaLugaresPorVisitar":
// 			try {
// 				let sitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
// 				let tipo = req.body.queryResult.outputContexts[0].parameters.LugaresInteres
// 				let nSitios = parseInt(sitios)
// 				let total = elegirNSitios(tipo, nSitios)
// 				let nSitiosVisitados = generarEntero(1, total.length)
//
// 				let cad = "Quedan por visitar: \n"
//
// 				for (let i=0; i < nSitiosVisitados; i++) {
// 					if(i+2 == nSitiosVisitados)
// 						cad += total[i] + " y ";
// 					else
// 						cad += total[i] + ", ";
// 				}
//
// 				return res.send({fulfillmentText: cad})
// 			}
// 			catch (err) {
// 				return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 			}
// 		break;
// /******************************************************************************/
// /******************************************************************************/
// /******************************************************************************/
// 		case "generarRecorrido":
// 			try {
// 				let sitios = req.body.queryResult.outputContexts[0].parameters.CantidadSitios
// 				let tipo = req.body.queryResult.outputContexts[0].parameters.LugaresInteres
// 				let nSitios = parseInt(sitios)
// 				let total = elegirNSitios(tipo, nSitios)
//
// 				let cad = "La ruta creada es: \n"
// 				ruta = []
// 				total.forEach((elemento) => {
// 					cad += elemento + ", "
// 					ruta.push(elemento)
// 				})
//
// 				return res.send({fulfillmentText: cad})
// 			}
// 			catch (err) {
// 				return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 			}
// 			break;
// /******************************************************************************/
// /******************************************************************************/
// /******************************************************************************/
// 			case "recomendacionLugarCercano":
// 				try {
// 					let rand = generarEntero(1, monumentos.length);
// 					let total = elegirNSitios("monumentos", rand)
//
// 					let cad = "Segun tu ubicación el lugar más cercano al que puedes ir es: "
// 					+ total[0]
//
// 					return res.send({fulfillmentText: cad})
// 				}
// 				catch (err) {
// 					return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 				}
// 			break;
// /******************************************************************************/
// /******************************************************************************/
// /******************************************************************************/
// 		case "comprarEntradas":
// 			try {
// 				let tipo = "Adulto"//req.body.queryResult.outputContexts[0].parameters.TipoCiudadano
//
// 				(async () => {
// 					const reg = new RegExp(tipo)
// 					let precio = 0;
//
// 					entradas.getEntradas(tipo).then(res => {
// 							for(let i=0; i < res.length; i++) {
// 								const t = reg.exec(res[i].tipo)
// 								if(t != null) {
// 									precio = res[i].precio
// 									return res.send({fulfillmentText: "El precio para " + "Adulto" + " es de "+ precio + "€"});
// 								}
// 							}
// 					});
// 				})();
// 			}
// 			catch (err) {
// 				return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 			}
// 		}
// 	}
// 	catch (err) {
// 		return res.send({fulfillmentText: "Ha habido algun error: " + err})
// 	}
}
