import { FunctionComponent } from "preact";
import { film } from "../types.ts";

type Data = {
  film: film;
  allInfo: boolean;
};

const Film: FunctionComponent<Data> = ({ film, allInfo }) => {
  return (
    <div class="cont-films">
      <div class="cont-film">
        <div class="film" key={film._id}>
          <img src={film.staticImageUrl} alt={film.name} />
          <div class="cont-film-info">
            <h3>{film.name}</h3>
            <p>{film.description}</p>
            <p>Brand: {film.brand}</p>
            <p>Color: {film.color ? "Color" : "Black & White"}</p>
            <p>ISO: {film.iso}</p>
            <p>Process: {film.process}</p>
            <p>Format 35mm: {film.formatThirtyFive ? "Yes" : "No"}</p>
            <p>Format 120: {film.formatOneTwenty ? "Yes" : "No"}</p>
            {allInfo && (
              <>
                <p>Added on: {film.dateAdded}</p>
                <p>Custom Descriptions:</p>
                <ul>
                  {film.customDescription.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
                <p>Key Features:</p>
                <ul>
                  {film.keyFeatures.map((feature) => (
                    <li key={feature._id}>{feature.feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Film;
