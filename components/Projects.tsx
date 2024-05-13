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
            {projects.map((project, projIndex) => (
              <div class="project" key={`${project._id}-${projIndex}`}>
                <div class="header-project">
                  <h3>Project: {project.name}</h3>
                  <ModalDeleteProject
                    projectID={project._id}
                    projects={projects}
                  />
                </div>
                <p>Description: {project.description}</p>
                <p>Films:</p>
                <div class="cont-project-films">
                  {project.films.map((film, filmIndex) => (
                    <div class="cont-project-film-modal" key={`${project._id}-${film.film._id}-${filmIndex}`}>
                      <div class="cont-quantity-film">
                        <p>
                          Quantity: {film.quantity}
                        </p>
                        <ModalDeleteFilm
                          filmID={film.film._id}
                          projectID={project._id}
                          projects={projects}
                        />
                      </div>
                      <Film film={film.film} allInfo={false} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
        : <h1 class="no-projects">No projects yet</h1>}
    </>
  );
};

export default Projects;
