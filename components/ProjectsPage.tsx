import { FunctionComponent } from "preact";
import { project } from "../types.ts";
import Projects from "./Projects.tsx";
import ModalSelectProject from "../islands/ModalSelectProject.tsx";

type Data = {
  projects: project[];
};

const ProjectsPage: FunctionComponent<Data> = ({ projects }) => {
  return (
    <div>
      <h1>Projects</h1>
      <p>
        Here you can see all the projects and the films that are part of them.
      </p>
      <ModalSelectProject projects={projects} />
      <div class="cont-page-project">
        <Projects projects={projects} />
      </div>
    </div>
  );
};

export default ProjectsPage;
