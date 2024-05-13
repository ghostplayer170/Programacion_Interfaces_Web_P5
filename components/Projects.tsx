import { FunctionComponent } from "preact";
import { project } from "../types.ts";
import Film from "./Film.tsx";
import ModalDeleteFilm from "../islands/ModalDeleteFilm.tsx";
import ModalDeleteProject from "../islands/ModalDeleteProject.tsx";

type Data = {
  projects: project[];
};

const Projects: FunctionComponent<Data> = ({ projects }) => {
  return (
    <>
      {projects.length > 0
        ? (
          <div class="cont-Projects">
            {projects.map((project) => (
              <div class="project" key={project._id}>
                <div class="header-project">
                  <h3>{project.name}</h3>
                  <ModalDeleteProject
                    projectID={project._id}
                    projects={projects}
                  />
                </div>
                <p>{project.description}</p>
                <p>Number of films: {project.films.length}</p>
                <div class="cont-project-films">
                  {project.films.map((film) => (
                    <div class="cont-project-film-modal">
                      <Film film={film.film} />
                      <p>Quantity: {film.quantity}</p>
                      <ModalDeleteFilm
                        filmID={film.film._id}
                        projectID={project._id}
                        projects={projects}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
        : <h1>No projects</h1>}
    </>
  );
};

export default Projects;
