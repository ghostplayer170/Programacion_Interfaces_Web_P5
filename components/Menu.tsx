import { FunctionComponent } from "preact";

const Menu: FunctionComponent = () => {
  return (
    <div class="menu">
      <h1 class="menu-title">Disco 2k</h1>
      <ul class="menu-list">
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
