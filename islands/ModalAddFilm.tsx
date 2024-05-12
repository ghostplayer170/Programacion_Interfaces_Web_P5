import { FunctionComponent } from "preact";
import { film, filmItem, project } from "../types.ts";
import { useEffect, useState } from "preact/hooks";

type Props = {
  film: film;
};

const ModalAddFilm: FunctionComponent<Props> = ({ film }) => {
  const [projects, setProjects] = useState<project[]>([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");

  useEffect(() => {
    // Get projects from cookie
    const projectsCookie = document.cookie.split("; ").find((c) =>
      c.startsWith("projects=")
    );
    // If projects cookie exists, set projects state
    if (projectsCookie) {
      setProjects(JSON.parse(projectsCookie.split("=")[1]));
    }
  }, []);

  const onAddFilmToProject = (projectID: string) => {
    // Update projects state with new film
    const updatedProjects = projects.map((p) => {
      if (p._id === projectID) {
        // Check if the film already exists in the project
        const existingFilmIndex = p.films.findIndex((f) =>
          f.film._id === film._id
        );
        if (existingFilmIndex === -1) {
          // Add new film if it doesn't exist
          const newFilmItem: filmItem = {
            film: film,
            quantity: 1,
          };
          return { ...p, films: [...p.films, newFilmItem] }; // Return project with new film
        } else {
          // Increment quantity if film already exists
          const newFilms = p.films.map((item, index) => {
            if (index === existingFilmIndex) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          return { ...p, films: newFilms }; // Return project with updated films
        }
      }
      return p; // Return project as is if it's not the selected project
    });
    setProjects(updatedProjects);
    document.cookie = `projects=${JSON.stringify(updatedProjects)}; path=/;`;
  };

  // Create new project
  const handleCreate = () => {
    const newProject: project = {
      _id: Date.now().toString(),
      name: projectName,
      description: projectDescription,
      films: [],
    };
    setProjects([...projects, newProject]);
    document.cookie = `projects=${
      JSON.stringify([...projects, newProject])
    }; path=/;`;
    setSelectedProject(newProject._id);
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
                    onChange={(e) => setSelectedProject(e.currentTarget.value)}
                    value={selectedProject}
                  >
                    {projects.map((proj) => (
                      <option key={proj._id} value={proj._id}>
                        {proj.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => onAddFilmToProject(selectedProject)}>
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
