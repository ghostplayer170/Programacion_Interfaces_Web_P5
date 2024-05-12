import { FunctionComponent } from "preact";
import { project } from "../types.ts";
import { useState } from "preact/hooks";

type Data = {
  projectID: string;
  projects: project[];
};

// Modal to delete a project and modify the projects cookie
const ModalDeleteProject: FunctionComponent<Data> = (
  { projectID, projects },
) => {
  const [showModal, setShowModal] = useState(false);

  const onDeleteProject = () => {
    const updatedProjects = projects.filter((p) => p._id !== projectID);
    document.cookie = `projects=${JSON.stringify(updatedProjects)}; path=/;`;
    window.location.href = "/projects";
    setShowModal(false);
  };

  return (
    <>
      <div class="ButtonDelete">
        <span class="delete" onClick={() => setShowModal(true)}>Delete</span>
      </div>
      {showModal && (
        <div class="modal">
          <div class="modal-content">
            <span class="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Delete Project</h2>
            <p>Are you sure you want to delete this project?</p>
            <button class="btn-delete" onClick={onDeleteProject}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDeleteProject;
