import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  orderByName,
  filterCreated,
  orderByWeight,
  getTemperaments,
  filterTemperament,
} from "../../actions";
import { Link } from "react-router-dom";
// import Card from "./card";
import s from "../../styles/Home.module.css";
// import Paginated from "./paginated";
import NavBar from "../NavBar/NavBar.js";

export default function Home() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  //-PAGINADO----------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  //-------Recargar--------------------------------------
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  //-ORDENAMIENTOS----------------------------------------
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  //-Por peso--------------------------------------------
  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  //-FILTRADOS-------------------------------------------
  //-Por creacion----------------------------------------
  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  //-Por temperamento------------------------------------
  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={s.conteiner}>
       <NavBar />
      <div className={s.title}>
        <h1>El mundo de los Perros</h1>
      </div>
      <div>
        <div className={s.row}>
          <select className={s.select} onChange={(e) => handleSort(e)}>
            <option value="" disabled selected>
              Alphabetical order
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select className={s.select} onChange={(e) => handleSortWeight(e)}>
            <option value="" disabled selected>
              Order by weight
            </option>
            <option value="weightasc">Heavier</option>
            <option value="weightdesc">Lighter</option>
          </select>
        </div>
        <div className={s.row2}>
          <select
            className={s.select}
            onChange={(e) => handleFilterByTemperament(e)}
          >
            <option value="" disabled selected>
              Filter by temperament
            </option>
            <option value="all">All</option>
            {allTemperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <select className={s.select} onChange={(e) => handleFilterCreated(e)}>
            <option value="" disabled selected>
              Filter by create
            </option>
            <option value="all">All</option>
            <option option value="api">
              By API
            </option>
            <option value="created">By database</option>
          </select>
        </div>

        <button className={s.btn} onClick={(e) => handleClick(e)}>
          Reload dogs
        </button>
      </div>
      {/* <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        currentPage={currentPage}
        paginado={paginado}
      /> */}
      <div className={s.card}>
        <ul className={s.grid}>
          {" "}
          {!currentDogs.length > 0 ? (
            <div className={s.div}>
              <p className={s.loading}>Loading...</p>
              <img
                src={
                  "https://i0.wp.com/thumbs.gfycat.com/ThankfulPlushAtlanticspadefish-max-1mb.gif"
                }
              />
            </div>
          ) : (
            currentDogs.map((d) => {
              return (
                <div className={s.card}>
                  <Link to={`/home/${d.id}`}>
                    {/* <Card
                      className={s.card}
                      name={d.name}
                      img={
                        d.image
                          ? d.image
                          : "https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg"
                      }
                      temperament={d.temperament}
                      weight_max={d.weight_max}
                      weight_min={d.weight_min}
                    /> */}
                  </Link>
                </div>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
