import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import ProjectsPage from "../../components/ProjectsPage.tsx";
import { project } from "../../types.ts";

type Data = {
  projects: project[];
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    const name = ctx.params.name;
    const cookies = getCookies(_req.headers);
    const projects: project[] = [];
    // Filter cookies that are projects
    Object.keys(cookies).forEach((key) => {
      if (key.startsWith("project_")) {
        try {
          const projectData = JSON.parse(cookies[key]);
          projects.push(projectData);
        } catch (e) {
          console.error("Failed to parse project data from cookie:", key, e);
        }
      }
    });
    const project = projects.find((project) =>
      project.name === name
    );
    if (!project) {
      return new Response("", {
        status: 303,
        headers: {
          "Location": "/_404",
        },
      });
    }
    return await ctx.render({ projects: [project] });
  },
};

const ProjectPage = (props: PageProps<Data>) => {
  const project = props.data.projects;
  return <ProjectsPage projects={project} dinamicPage={true} />;
};

export default ProjectPage;
