import { FunctionComponent } from "preact";
import { project } from "../types.ts";
import { useState } from "preact/hooks";

type Data = {
  projects: project[];
};

// Modal to show a list of projects to select from cookies
const ModalSelectProject: FunctionComponent<Data> = ({ projects }) => {
  const [showModal, setShowModal] = useState(false);
  const onSelectProject = (projectName: string) => {
    window.location.href = `/project/${projectName}`;
    setShowModal(false);
  };
  return (
    <>
      <div class="ButtonSelect">
        <span class="select" onClick={() => setShowModal(true)}>
          Select Project
        </span>
      </div>
      {showModal && (
        <div class="modal">
          <div class="modal-content">
            <span class="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Select Project</h2>
            <div class="cont-projects">
              {projects.map((project) => (
                <div class="project" key={project._id}>
                  <div class="cont-btn-select">
                    <button onClick={() => onSelectProject(project.name)}>
                      Select {project.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSelectProject;
