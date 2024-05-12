import { FunctionComponent } from "preact";
import { film } from "../types.ts";
import ModalAddFilm from "../islands/ModalAddFilm.tsx";

type Data = {
  films: film[];
};

const Films: FunctionComponent<Data> = ({ films }) => {
  return (
    <div class="cont-films">
      <div class="cont-film">
        {films.map((film) => (
          <div class="film" key={film._id}>
            <img src={film.staticImageUrl} alt={film.name} />
            <h3>{film.name}</h3>
            <p>{film.description}</p>
            <p>Brand: {film.brand}</p>
            <p>Color: {film.color ? "Yes" : "No"}</p>
            <p>ISO: {film.iso}</p>
            <p>Process: {film.process}</p>
            <ModalAddFilm film={film} />
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Films;
