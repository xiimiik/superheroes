import React from "react";
import SuperheroCard from "./SuperheroCard";

const SuperheroList = ({ superheroes }) => {
  return (
    <ul className='movies mb-5 '>
      {superheroes.map((superhero) => (
        <li key={superhero.id} className='d-flex justify-content-center'>
          <SuperheroCard superhero={superhero} />
        </li>
      ))}
    </ul>
  );
};

export default SuperheroList;
