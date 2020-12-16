
const cheerio = require("cheerio");
const request = require("request-promise");

async function getEntradas() {

  const $ = await request({
      uri: "https://comprartickets.alhambra-patronato.es/reservarEntradas.aspx?opc=142&gid=426&lg=es&ca=0&m=GENERAL",
      transform: body => cheerio.load(body, {decodeEntities: false}), // decodeEntities: Para acentos
  });

  // const quoteEntera = $(".date").each((i, q) => {
  //   const c = $(q);
  //   const cad = c.find(".container");
	// 	console.log(cad.html())
  // });

	const precios = []
	const personas = ["Adultos", "Ciudadanos de la UE con carnet joven",
	"Personas con discapacidad igual o mayor al 33%", "Ciudadanos de la UE mayores de 65 años",
	"Menores de 12 a 15 años", "Menores 3 - 11 años"]

	const cad = $("p.prix").each((i, q) => {
		const precio = $(q)
		const reg = new RegExp("[0-9]+,[0-9]+")
		const total = reg.exec(precio)[0]
		precios.push({tipo: personas[i], precio: total})
	})

	return precios

}

module.exports = {
	getEntradas
}
