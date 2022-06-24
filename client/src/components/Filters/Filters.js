import React from "react";
import s from '../../styles/Filters.module.css'
import icons from '../../img/menu.svg'


function Filters() {
 

  return (
    <>
      <nav className={s.nav}>
        <div className={s.nav__container}>
          <h1 className={s.nav__logo}>JAZMIN GILASTRUNASA</h1>
          <label for="menu" className={s.nav__label}>
            <img src={icons} alt="" />
          </label>
          <input type="checkbox" id="menu" className={s.nav__input} />

          <div className={s.nav__menu}>
             <a href="#" className={s.nav__item}>
              {" "}
              Inicio{" "}
            </a>
            <a href="#" className={s.nav__item}>
              {" "}
              Contacto{" "}
            </a>
            <a href="#" className={s.nav__item}>
              {" "}
              Iniciar sesion{" "}
            </a>
          </div>
        </div>
      </nav>



      <section>
        <h2>Soy kike</h2>
      </section>
    </>
  );
}

export default Filters;
