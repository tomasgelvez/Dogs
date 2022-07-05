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
} from "../../store/actions/dogsAction.js";
import { Link } from "react-router-dom";
import Card from "../Card/Card.js";
import s from "../../styles/Home.module.css";
import Paginated from "../Paginado/Paginado.js";
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
      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        currentPage={currentPage}
        paginado={paginado}
      />
      <div className={s.containerFilters}>
        <div>
          <div className={s.containerSelects}>
            <h3 className={s.title2}>BUSCA SEGUN:</h3>
            <span className={s.title2}>ORDEN ALFABETICO</span>
            <div className={s.row}>
              <select className={s.select} onChange={(e) => handleSort(e)}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
            <span className={s.title2}>PESO DEL PERRO</span>
            <div className={s.row}>
              <select
                className={s.select}
                onChange={(e) => handleSortWeight(e)}
              >
                <option value="weightasc">Pesado</option>
                <option value="weightdesc">Liviano</option>
              </select>
            </div>
            <span className={s.title2}>TEMPERAMENTO</span>
            <div className={s.row2}>
              <select
                className={s.select}
                onChange={(e) => handleFilterByTemperament(e)}
              >
                <option value="all">All</option>
                {allTemperaments.map((temp) => (
                  <option key={temp.id} value={temp.name}>
                    {temp.name}
                  </option>
                ))}
              </select>
            </div>
            <span className={s.title2}>POR CREACION</span>
            <div className={s.row2}>
              <select
                className={s.select}
                onChange={(e) => handleFilterCreated(e)}
              >
                <option value="all">All</option>
                <option value="api">
                  By API
                </option>
                <option value="created">By database</option>
              </select>
            </div>
            <button className={s.btn} onClick={(e) => handleClick(e)}>
              Reload dogs
            </button>
          </div>
        </div>
        <div className={s.card}>
          <ul className={s.grid}>
            {" "}
            {!currentDogs.length > 0 ? (
              <div className={s.div}>
                <p className={s.loading}>Loading...</p>
              </div>
            ) : (
              currentDogs.map((d) => {
                return (
                  <div className={s.card} key={d.id}>
                    <Link to={`/home/${d.id}`}>
                      <Card
                        className={s.card}
                        name={d.name}
                        img={
                          d.image
                            ? d.image
                            : "https://www.kienyke.com/sites/default/files/styles/amp_1200x675_16_9/public/2021-07/D%C3%ADa-Internacional-del-Perro-Callejero%20%281%29.jpg?itok=aAkFkVnj"
                        }
                        temperament={d.temperament}
                        weight_max={d.weight_max}
                        weight_min={d.weight_min}
                      />
                    </Link>
                  </div>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <div className={s.paginated}>
        <Paginated
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          currentPage={currentPage}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
