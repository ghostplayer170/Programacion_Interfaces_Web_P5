import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import ProjectsPage from "../components/ProjectsPage.tsx";
import { project } from "../types.ts";

type Data = {
  projects: project[];
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    // Get all the projects from cookies
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
    if (projects.length === 0) {
      return await ctx.render({ projects: [] });
    }
    return await ctx.render({ projects });
  },
};

const ProjectsHomePage = (props: PageProps<Data>) => {
  const projects = props.data.projects;
  return <ProjectsPage projects={projects} dinamicPage={false} />;
};

export default ProjectsHomePage;
