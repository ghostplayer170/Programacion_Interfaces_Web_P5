import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { film } from "../types.ts";
import Films from "../components/Films.tsx";

type Data = {
  films: film[];
};

type Format = {
  formatOneTwenty: boolean;
  formatThirtyFive: boolean;
};

type Filter = {
  name: string;
  brand: string;
  iso: number;
  format: Format | null;
  color: boolean | null;
};

const FilmsPage: FunctionComponent<Data> = ({ films }) => {
  const [filteredFilms, setFilteredFilms] = useState<film[]>(films);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    brand: "",
    iso: 0,
    format: null,
    color: null,
  });

  useEffect(() => {
    const newFilteredFilms = films.filter((film) => {
      return (
        (filter.name === "" || film.name.includes(filter.name)) &&
        (filter.brand === "" || film.brand === filter.brand) &&
        (filter.iso === 0 || film.iso === filter.iso) &&
        (filter.format === null ||
          film.formatThirtyFive === filter.format.formatThirtyFive ||
          film.formatOneTwenty === filter.format.formatOneTwenty) &&
        (filter.color === null || film.color === filter.color)
      );
    });
    setFilteredFilms(newFilteredFilms);
  }, [filter, films]);

  return (
    <div class="cont-films-filter">
      <h2>Films</h2>
      <div class="cont-filters">
        <div class="filter">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) =>
              setFilter({ ...filter, name: e.currentTarget.value })}
          />
          <label for="brand">Brand</label>
          <select
            id="brand"
            onChange={(e) =>
              setFilter({ ...filter, brand: e.currentTarget.value })}
          >
            <option value="">All</option>
            {["fujifilm", "wolfman 35", "foma", "ilford", "kodak", "kentmere"]
              .map((brand) => <option value={brand}>{brand}</option>)}
          </select>
          <label for="iso">ISO</label>
          <select
            id="iso"
            onChange={(e) =>
              setFilter({
                ...filter,
                iso: parseInt(e.currentTarget.value, 10) || 0,
              })}
          >
            <option value="">All</option>
            {[100, 200, 400, 800].map((iso) => (
              <option value={iso}>{iso}</option>
            ))}
          </select>
          <label for="format">Format</label>
          <select
            id="formatThirtyFive"
            onChange={(e) =>
              setFilter({
                ...filter,
                format: {
                  ...filter.format,
                  formatThirtyFive: e.currentTarget.value === "formatThirtyFive" ? true : false,
                  formatOneTwenty: e.currentTarget.value === "formatOneTwenty" ? true : false,
                },
              })}
          >
            <option value="">All</option>
            <option value="formatOneTwenty">formatOneTwenty</option>
            <option value="formatThirtyFive">formatThirtyFive</option>
          </select>
          <label for="color">Color</label>
          <select
            id="color"
            onChange={(e) =>
              setFilter({
                ...filter,
                color: e.currentTarget.value === "true" ? true : e.currentTarget.value === "false" ? false : null,
              })}
          >
            <option value="">All</option>
            <option value="true">Color</option>
            <option value="false">Black & White</option>
          </select>
        </div>
      </div>
      <Films films={filteredFilms} />
    </div>
  );
};

export default FilmsPage;
