import { FunctionComponent } from "preact";
import { film } from "../types.ts";
import Film from "./Film.tsx";

type Data = {
  film: film;
};

const FilmPage: FunctionComponent<Data> = ({ film }) => {
  return (
    <div>
      <div class="header-film">
        <h2 >Film {film.name}</h2>
      </div>
      <Film film={film} allInfo={true} />
    </div>
  );
};

export default FilmPage;
