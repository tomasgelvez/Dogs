import React from "react";
import { NavLink } from "react-router-dom";
import github from "../../img/github.png";
import linkedin from "../../img/linkedin.png";
import s from "../../styles/About.module.css";

export default function About() {
  return (
    <div className={s.container}>
      <div></div>
      <div className={s.btnDiv}>
        <NavLink to="/home">
          <button className={s.btn}> Back to home</button>
        </NavLink>
      </div>

      <div className={s.about}>
        <h1 className={s.text}>Hola a todos!</h1>
        <h3 className={s.text}>
          Soy Tomás Gelvez, desarrollador Full Stack Developer! <br />
          Hice esta pagina como proyecto individual de Soy Henry Bootcamp <br />
        </h3>
        <h3 className={s.text}>
          Puedes visitar mis redes sociales para conectar!
        </h3>

        <a href="https://github.com/tomasgelvez">
          {" "}
          <img
            className={s.img}
            id="about"
            src={github}
            width="50"
            height="50"
            alt="img not found"
          />
        </a>

        <a href="https://www.linkedin.com/in/tomasgelvez/">
          <img
            className={s.img}
            id="linkedin"
            src={linkedin}
            width="50"
            height="50"
            alt="img not found"
          />
        </a>
      </div>
    </div>
  );
}
