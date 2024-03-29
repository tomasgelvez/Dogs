import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../../store/actions/dogsAction.js";
import s from "../../styles/postDog.module.css";

//---------------VALIDACION DE ERRORES EN LOS INPUTS------------------------


function validate(input) {
  let errors = {};


  if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)){
    errors.name = "❌ La primera letra debe estar en mayúscula";
} else {
  errors.name = "✅Hecho!";
}

if(!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)){
    errors.height_min = '❌ Only numbers';
}else {
  errors.height_min = "✅Hecho!";
}
if(!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)){
    errors.height_max = '❌ Solo numeros';
} else {
  errors.height_max = "✅Hecho!";
}
if(input.height_max <= input.height_min){
    errors.height_min = '❌ El valor mínimo no puede ser mayor que el máximo';
}

if(!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)){
    errors.weight_min = '❌ Solo numeros';
}
if(!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)){
    errors.weight_max = '❌ Solo numeros';
}
if(input.weight_max <= input.weight_min){
    errors.weight_min = '❌ El valor mínimo no puede ser mayor que el máximo';
}
if(!input.life_time_min || !/^[1-9]\d*(\.\d+)?$/.test(input.life_time_min)){
    errors.life_time_min = '❌ Solo numeros';
}
 if(!input.life_time_max || !/^[1-9]\d*(\.\d+)?$/.test(input.life_time_max)){
errors.life_time_max = '❌ Solo numeros';
} 
if(input.life_time_max <= input.life_time_min){
    errors.life_time_min = '❌ El valor mínimo no puede ser mayor que el máximo';
}
 if (input.img && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.img) ){
    errors.img = '❌ Debe ser una URL o estar vacio.';
} 
if (input.temperament.length <= 2){
    errors.temperament = "❌ El perro no puede tener más de tres temperamentos.!";
}
return errors;
}


//-------------------------------------------------------------------------------

export default function PostDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_time_min: "",
    life_time_max: "",
    temperament: [],
    img: "",
  });

 
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.name,
      })
    );
  }

  function handleSelect(e) {
    if (input.temperament.length === 3) {
      alert('¡El perro no puede tener más de tres temperamentos!')
      
    } else if (input.temperament.length < 3) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name !== "" &&
      input.height_min !== "" &&
      input.height_max > input.height_min &&
      input.weight_min !== "" &&
      input.weight_max > input.weight_min &&
      input.life_time_min !== "" &&
      input.weight_max > input.weight_min &&
      input.temperament.length !== 0
    ){
      dispatch(postDog(input));
      alert("El perro fue creado con exito!")
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_time_min: "",
        life_time_max: "",
        image: "",
        temperaments: [],
      });
      history.push("/home");
    } else {
      alert("¡Faltan los elementos necesarios!")
    };
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={s.conteiner}>
      <Link to="/home">
        <button className={s.btn}> Back to home</button>
      </Link>
      <div className={s.containerFormsAndErrors}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
      <h1 className={s.title}>Crea a tu nuevo perro!</h1>
        <p className={s.obligatorio}>* : Requerido</p>
        <div className={s.row}>
          <label className={s.labell}>*Raza:</label>
          <input
            className={s.inputl}
            type="text"
            value={input.name}
            name="name"
            id="name"
            required
            placeholder="Coloca la raza..."
            onChange={(e) => handleChange(e)}
          />
          <div className={s.row}>
            <label className={s.label}>*Tamaño:</label>
            <br />
            <div className={s.coso}>
              <div>
                <input
                  className={s.input}
                  type="number"
                  min="1"
                  max="100"
                  value={input.height_min}
                  name="height_min"
                  id="height_min"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />
                cm.
              </div>
              <div>
                <input
                  className={s.input}
                  type="number"
                  min="1"
                  max="100"
                  value={input.height_max}
                  name="height_max"
                  id="height_max"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />
                cm.
              </div>
            </div>
          </div>
          <div className={s.row}>
            <label className={s.label}>*Peso:</label>
            <br />
            <div className={s.coso}>
              <div>
                <input
                  className={s.input}
                  type="number"
                  min="1"
                  max="100"
                  value={input.weight_min}
                  name="weight_min"
                  id="weight_min"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />
                kg.
              </div>
              <div>
                <input
                  className={s.input}
                  type="number"
                  min="1"
                  max="100"
                  value={input.weight_max}
                  name="weight_max"
                  id="weight_max"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />
                kg.
              </div>
            </div>
          </div>
          <div className={s.row}>
            <label className={s.label}>*Años de vida:</label>
            <br />
            <div className={s.coso}>
              <div>
                <input
                  className={s.input}
                  min="1"
                  max="100"
                  type="number"
                  value={input.life_time_min}
                  name="life_time_min"
                  id="life_time_min"
                  required
                  placeholder="Min"
                  onChange={(e) => handleChange(e)}
                />{" "}
                años.
              </div>
              <div>
                <input
                  className={s.input}
                  min="1"
                  max="100"
                  type="number"
                  value={input.life_time_max}
                  name="life_time_max"
                  id="life_time_max"
                  required
                  placeholder="Max"
                  onChange={(e) => handleChange(e)}
                />{" "}
                años.
              </div>
            </div>
          </div>
         
          <label className={s.labell}>Imagen:</label>
          <input
            type="imagen"
            className={s.inputl}
            value={input.image}
            name="image"
            placeholder="URL"
            onChange={(e) => handleChange(e)}
          />
          <label className={s.label}>*Temperaments:</label>
          <select className={s.select} onChange={(e) => handleSelect(e)}>
            {temperaments.map((temperament) => (
              <option value={temperament.name} key={temperament.id}>
                {temperament.name}
              </option>
            ))}
          </select>
          <ul className={s.ul}>
              {input.temperament.map((el) => (
            <li className={s.li} key={el}>
                <button
                  className={s.botonTemp}
                  type="button"
                  onClick={() => handleDelete(el)}
                >
                  {el}
                </button>
            </li>
              ))}
          </ul>
        </div>

        <button className={s.btn} type="submit">
          Create!
        </button>
      </form>
      <div className={s.danger}>
        <h3 className={s.titleDangers}>Debes cumplir con los siguientes requisitos:</h3>
        {errors.name && <p className={s.error}>{errors.name}</p>}
        {errors.height_min && <p className={s.error}>{errors.height_min}</p>}
        {errors.height_max && <p className={s.error}>{errors.height_max}</p>}
        {errors.weight_min && <p className={s.error}>{errors.weight_min}</p>}
        {errors.weight_max && <p className={s.error}>{errors.weight_max}</p>}
        {errors.life_time_min && (
          <p className={s.error}>{errors.life_time_min}</p>
        )}
        {errors.life_time_max && (
          <p className={s.error}>{errors.life_time_max}</p>
        )}
      </div>
      </div>
    </div>
  );
}
