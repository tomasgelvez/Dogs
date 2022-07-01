import axios from "axios";
import swal from 'sweetalert';
export const GET_DOGS = "GET_DOGS";

export function getDogs() {
  return function (dispatch) {
    return axios.get("/dogs").then((response) => {
      dispatch({
        type: GET_DOGS,
        payload: response.data,
      });
    });
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    var temp = await axios.get("/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temp.data,
    });
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function searchDogs(search) {
  return function (dispatch) {
    axios
      .get("/dogs?name=" + search)
      .then((dogs) => {
        dispatch({
          type: "SEARCH_DOGS",
          payload: dogs.data,
        });
      })
      .catch(() => {
        swal({
          title: "Ups ocurrio un error",
          text: "El perro que intentas buscar no existe",
          icon: "warning",
        });
      });
  };
}
export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("/post", payload);
    return response;
  };
}
//-------------------------ORDERS----------------------------
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}
//------------------------FILTERS----------------------------
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function filterTemperament(payload) {
  return {
    type: "FILTER_TEMPERAMENT",
    payload,
  };
}
