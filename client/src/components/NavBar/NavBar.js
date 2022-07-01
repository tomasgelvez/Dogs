import React from "react";
import { Link, NavLink } from "react-router-dom";
import s from "../../styles/NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar.js";
import home from "../../img/dog.png";
import icons from "../../img/menu.svg";

export default function NavBar() {
  return (
    <header>
      <nav className={s.nav}>
        <div className={s.nav__container}>
          <Link to="/">
            <img className={s.nav__logo} src={home} alt="" />
          </Link>
          <SearchBar></SearchBar>
          <label htmlFor="menu" className={s.nav__label}>
            <img src={icons} alt="" />
          </label>
          <input type="checkbox" id="menu" className={s.nav__input} />

          <div className={s.nav__menu}>
            <Link to="/home">
              <p className={s.nav__item}>Home</p>
            </Link>
            <Link to="/post">
              <p className={s.nav__item}>Create your dog</p>
            </Link>
            <Link to="/about">
              <p className={s.nav__item}>About</p>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
