import { FunctionComponent } from "preact";
import { film } from "../types.ts";
import Film from "./Film.tsx";

type Data = {
  film: film;
};

const FilmPage: FunctionComponent<Data> = ({ film }) => {
  return (
    <div>
      <h1>Film</h1>
      <Film film={film} />
    </div>
  );
};

export default FilmPage;