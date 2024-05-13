import { FunctionComponent } from "preact";
import { film, project } from "../types.ts";
import { useEffect, useState } from "preact/hooks";

type Props = {
  film: film;
};

const ModalAddFilm: FunctionComponent<Props> = ({ film }) => {
  const [projects, setProjects] = useState<project[]>([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectID, setSelectedProjectID] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");

  useEffect(() => {
    // Load projects from multiple cookies
    const projectsLoaded: project[] = [];
    document.cookie.split('; ').forEach(cookie => {
      if (cookie.startsWith('project_')) {
        projectsLoaded.push(JSON.parse(cookie.split('=')[1]));
      }
    });
    setProjects(projectsLoaded);
  }, []);

  const onAddFilmToProject = (projectID: string, film: film) => {
    // Add film to project
    const updatedProjects = projects.map((proj) => {
      if (proj._id === projectID) {
        const existingFilmIndex = proj.films.findIndex(f => f.film._id === film._id);
        if (existingFilmIndex !== -1) {
          proj.films[existingFilmIndex].quantity += 1;
        } else {
          proj.films.push({ film, quantity: 1 });
        }
        document.cookie = `project_${proj._id}=${JSON.stringify(proj)}; path=/;`;
      }
      return proj;
    });
    setProjects(updatedProjects);
  };

  const handleCreate = () => {
    const newProject: project = {
      _id: Date.now().toString(),
      name: projectName,
      description: projectDescription,
      films: [],
    };
    document.cookie = `project_${newProject._id}=${JSON.stringify(newProject)}; path=/;`;
    setProjects([...projects, newProject]);
    setSelectedProjectID(newProject._id);
    setProjectName("");
    setProjectDescription("");
    setShowCreateProjectModal(false);
  };

  return (
    <>
      <div class="ButtonAdd">
        <span class="add" onClick={() => setShowModal(true)}>+</span>
      </div>
      {showModal && (
        <div class="modal">
          <div class="modal-content">
            <span
              class="close"
              onClick={() => {
                setShowModal(false);
                window.location.reload();
              }}
            >
              &times;
            </span>
            <h2>Add Film to Project</h2>
            {projects.length > 0
              ? (
                <div>
                  <select
                    onChange={(e) =>
                      setSelectedProjectID(e.currentTarget.value)}
                    value={selectedProjectID}
                  >
                    {projects.map((proj) => (
                      <option key={proj._id} value={proj._id}>
                        {proj.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      onAddFilmToProject(selectedProjectID, film)}
                  >
                    Add {film.name} to Project
                  </button>
                </div>
              )
              : <p>No projects found. Create a new one.</p>}
            <button onClick={() => setShowCreateProjectModal(true)}>
              Create New Project
            </button>
          </div>
          {showCreateProjectModal && (
            <div class="modals">
              <div class="modal">
                <div class="modal-content">
                  <span
                    class="close"
                    onClick={() => {
                      setProjectName("");
                      setProjectDescription("");
                      setShowCreateProjectModal(false);
                    }}
                  >
                    &times;
                  </span>
                  <h2>Create New Project</h2>
                  <input
                    type="text"
                    value={projectName}
                    onBlur={(e) => setProjectName(e.currentTarget.value)}
                    placeholder="Project Name"
                  />
                  <textarea
                    value={projectDescription}
                    onBlur={(e) => setProjectDescription(e.currentTarget.value)}
                    placeholder="Project Description"
                  >
                  </textarea>
                  <button onClick={handleCreate}>Create Project</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ModalAddFilm;
