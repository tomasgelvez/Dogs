import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClean, getDetail } from "../../actions";
import { useEffect } from "react";
// import s from "../styles/dogDetail.module.css";

export default function DogDetail() {
  const myDog = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  const { id } = useParams();

  //console.log(id)

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getClean());
  }, [dispatch, id]);
  console.log(myDog);

  return (
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>

      {myDog.length > 0 ? (
        <div>
          <div>
            <div>
              {myDog[0].userCreated ? (
                <Link to="/delete/:id">
                  <button>Delete!</button>
                </Link>
              ) : null}
            </div>
            <div>
              {myDog[0].userCreated ? (
                <Link to="/edit/:id">
                  <button>Edit!</button>
                </Link>
              ) : null}
            </div>
          </div>
          <h1>{myDog[0].name}</h1>
          <img
            alt="img not found"
            src={
              myDog[0].image
                ? myDog[0].image
                : "https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg"
            }
          />
          <p>
            {!myDog[0].life_time_max
              ? `Their life span is approximately ${myDog[0].life_time_min}.`
              : `Their life span is between ${myDog[0].life_time_min} and ${myDog[0].life_time_max} years.`}{" "}
            <br />
            Their temperaments are{" "}
            {!myDog[0].userCreated
              ? myDog[0].temperament + " "
              : myDog[0].temperaments.map((el) => el.name + ", ")}
            . <br />
            {!myDog[0].height_max
              ? `These dogs can measure up to ${myDog[0].height_min} cm approximately`
              : `These dogs can measure between ${myDog[0].height_min} and ${myDog[0].height_max} cm.`}{" "}
            <br />
            and weight between {myDog[0].weight_min} and {myDog[0].weight_max}{" "}
            kg.
          </p>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
          <img
            src={
              "https://i0.wp.com/thumbs.gfycat.com/ThankfulPlushAtlanticspadefish-max-1mb.gif"
            }
            alt="imagen"
          />
        </div>
      )}
    </div>
  );
}
