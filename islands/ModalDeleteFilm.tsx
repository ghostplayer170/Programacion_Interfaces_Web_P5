import { FunctionComponent } from "preact";
import { project } from "../types.ts";
import { useState } from "preact/hooks";

type Props = {
  filmID: string;
  projectID: string;
  projects: project[];
};

// Modal to delete a film from a project and modify the project's cookie
const ModalDeleteFilm: FunctionComponent<Props> = (
  { filmID, projects, projectID },
) => {
  const [showModal, setShowModal] = useState(false);
  const onDeleteFilmFromProject = () => {
    // Update projects state with new film
    const updatedProjects = projects.map((p) => {
      if (p._id === projectID) {
        // Check if the film already exists in the project
        const existingFilmIndex = p.films.findIndex((f) =>
          f.film._id === filmID
        );
        if (existingFilmIndex !== -1) {
          // Remove film from project
          p.films.splice(existingFilmIndex, 1);
        }
      }
      return p; // Return project as is if it's not the selected project
    });
    document.cookie = `projects=${JSON.stringify(updatedProjects)}; path=/;`;
    window.location.href = "/projects";
    setShowModal(false);
  };

  return (
    <>
      <div class="ButtonDelete">
        <span class="delete" onClick={() => setShowModal(true)}>-</span>
      </div>
      {showModal && (
        <div class="modal">
          <div class="modal-content">
            <span class="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Delete Film</h2>
            <p>Are you sure you want to delete this film from the project?</p>
            <button class="btn-delete" onClick={onDeleteFilmFromProject}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDeleteFilm;
