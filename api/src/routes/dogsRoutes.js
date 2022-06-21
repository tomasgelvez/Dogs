const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const router = Router();
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=2e35bf4e-3642-44e2-9dca-8edf8708f500`
    );
    const apiInfo = await apiUrl.data.map((e) => {
      return {
        //Son todos los valores.
        name: e.name,
        id: e.id,
        height_max:
          e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
        height_min:
          e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
        weight_max:
          e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
        weight_min:
          e.weight.metric.split(" - ")[0] !== "NaN"
            ? e.weight.metric.split(" - ")[0]
            : 6,
        life_time_min:
          e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
        life_time_max:
          e.life_span.split(" - ")[1] &&
          e.life_span.split(" - ")[1].split(" ")[0],
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("ERROR IN getApiInfo", error);
  }
};

const getDbInfo = async () => {
  try {
    const perros = await Dog.findAll({
      include: Temperament,
    });

    const info = perros.map((e) => {
      let temp = Temperament.map((e) => e.name);
      let aux = temp.join(", ");
      return {
        //Devuelvo toda la data creada db.
        name: e.name,
        id: e.id,
        weight_max: e.weight_max,
        weight_min: e.weight_min,
        height_max: e.height_max,
        height_min: e.height_min,
        life_time_max: e.life_time_max,
        life_time_min: e.life_time_min,
        temperament: aux,
        image: e.image,
      };
    });
    return info;
  } catch (error) {
    console.log("ERROR IN getDBInfo", error);
  }
};

const getAllDogs = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoFinal = apiInfo.concat(dbInfo);
    return infoFinal;
  } catch (error) {
    console.log("Error en function getAllDogs", error);
  }
};

// - [X] __GET /dogs__:
// - Obtener un listado de las razas de perro
// - Debe devolver solo los datos necesarios para la ruta principal
// - [X] __GET /dogs?name="..."__:
// - Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// - Si no existe ninguna raza de perro mostrar un mensaje adecuado

// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
router.get("/dogs", async (req, res) => {
  const { name } = req.params;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );

    dogsName.length
      ? res.status(200).send(dogsName)
      : res.status(400).send("No existe el nombre");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/dogs/:id", async (req, res, next) => {
  try {
    const dogBd = [];
    const id = req.params.id;
    if (typeof id === "string" && id.length > 6) {
      dogBd = await Dog.findAll({ where: { id: id }, include: Temperament });
    }
    if (dogBd.length) {
      res.send(dogBd);
    } else {
      const dogsTotal = await getAllDogs();
      const dogId = dogsTotal.filter((el) => el.id === id);
      if (dogId) {
        res.send(dogId);
      } else {
        res.send("El perro no existe.");
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/dogs", async (req, res, next) => {
  try {
    const {
      name,
      temperament,
      weight_max,
      weight_min,
      height_max,
      height_min,
      life_time_max,
      life_time_min,
      image,
    } = req.body;

    const newDog = await Dog.create({
      name,
      temperament,
      weight_max,
      weight_min,
      height_max,
      height_min,
      life_time_max,
      life_time_min,
      image,
    });
    newDog.addTemperament(temperament);
    res.status(201).json(newDog);
  } catch (error) {
    next(error);
  }
});
