import { FunctionComponent } from "preact";

const Menu: FunctionComponent = () => {
  return (
    <div>
      <h1>Disco 2k</h1>
      <ul>
        <li>
          <a href="/films">Films</a>
        </li>
        <li>
          <a href="/projects">Projects</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
