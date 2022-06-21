const { Router } = require("express");
const axios = require("axios");
const {  Temperament } = require("../db");

const router = Router();

router.get("/temperaments", async (req, res) => {
  try {
    const dataApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=2e35bf4e-3642-44e2-9dca-8edf8708f500`
    );
    //MAPEO LOS TEMPERAMENTOS DE LA API Y LOS GUARDO EN TEMPERAMENT
    let temperaments = dataApi.data.map((el) => el.temperament);
    //JUNTO EL ARRAY DE TERAMENTOS EN UN STRING Y LO VUELVO A DIVIDIR EN UN ARRAY
    temperaments = temperaments.join(", ").split(", ");
    //FILTRO LOS VACIOS
    temperaments = temperaments.filter((el) => el);
    //ELIMINO LOS DUPLICADOS
    temperaments = [...new Set(temperaments)].sort();
    // CREO UN NUEVO TEMPERAMENTO EN LA TABLA POR CADA ELEMENTO
    temperaments.forEach((el) => {
      Temperament.findOrCreate({
        where: { name: el },
      });
    });
    //TRAIGO TODOS LOS TEMPERAMENTOS
    const allTemperament = await Temperament.findAll();
    res.send(allTemperament);
  } catch {
    res.send("Error");
  }
});

module.exports = router;