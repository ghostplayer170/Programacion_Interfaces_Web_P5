import { FunctionComponent } from "preact";
import { film } from "../types.ts";

type Data = {
  film: film;
};

const Film: FunctionComponent<Data> = ({ film }) => {
  return (
    <div class="cont-films">
      <div class="cont-film">
        <div class="film" key={film._id}>
          <img src={film.staticImageUrl} alt={film.name} />
          <h3>{film.name}</h3>
          <p>{film.description}</p>
          <p>Brand: {film.brand}</p>
          <p>Color: {film.color ? "Yes" : "No"}</p>
          <p>ISO: {film.iso}</p>
          <p>Process: {film.process}</p>
          <ul>
            {film.keyFeatures.map((feature) => (
              <li key={feature._id}>{feature.feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Film;
