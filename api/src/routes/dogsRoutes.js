const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------GET---------------------------

//traer la informacion desde la api
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=232bd982-32a3-43b7-a1e4-bbcb2bdf72bc`
    );
    const apiInfo = await apiUrl.data.map((e) => {
      return {
        name: e.name,
        id: e.id,
        height_min:
          e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],

        height_max:
          e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],

        weight_min:
          e.weight.metric.split(" - ")[0] !== "NaN"
            ? e.weight.metric.split(" - ")[0]
            : 6,

        weight_max:
          e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],

        life_time_min:
          e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],

        life_time_max:
          e.life_span.split(" - ")[1] &&
          e.life_span.split(" - ")[1].split(" ")[0],

        temperament: e.temperament ? e.temperament : "Unknown",

        image: e.image.url,
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("ERROR IN getApiInfo", error);
  }
};
//traer la informacion desde la db
const getDBinfo = async () => {
  try {
    const perros = await Dog.findAll({
      include: Temperament,
    });

    const info = perros.map((e) => {
      let temp = e.temperaments.map((e) => e.name);
      let aux = temp.join(", ");
      // console.log("ACA ESTOY", e.temperament)
      return {
        name: e.name,
        id: e.id,
        userCreated: e.userCreated,
        height_max: e.height_max,
        height_min: e.height_min,
        weight_max: e.weight_max,
        weight_min: e.weight_min,
        life_time_max: e.life_time_max,
        life_time_min: e.life_time_min,
        temperament: aux,
        image: e.image
          ? e.image
          : "https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg",
      };
    });
    //console.log(info)
    return info;
  } catch (error) {
    console.log("ERROR IN getDBInfo", error);
  }
};
//concateno ambas fuentes de informacion
const getAllDogs = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log("ERROR IN infoTotal", error);
  }
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(400).send("No se encontro el perro que estas buscando");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/dogs/:id", async (req, res, next) => {
  try {
    let dogBd = [];
    const id = req.params.id;
    if (typeof id === "string" && id.length > 6) {
      dogBd = await Dog.findAll({ where: { id: id }, include: Temperament });
    }
    if (dogBd.length) {
      res.send(dogBd);
    } else {
      const dogsTotal = await getAllDogs();
      let dogId = dogsTotal.filter((el) => el.id == id);
      
      if (dogId) {
        res.send(dogId);
      } else {
        res.send("El perro buscado no existe");
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/dogs", async (req, res, next) => {
  try {
    let {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      image,
      temperament,
    } = req.body;

    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      image
    });
    newDog.addTemperament(temperament);
    res.status(201).json(newDog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
