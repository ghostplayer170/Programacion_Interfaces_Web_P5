import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import ProjectsPage from "../components/ProjectsPage.tsx";
import { project } from "../types.ts";

type Data = {
  projects: project[];
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    const cookies = getCookies(_req.headers);
    const projects: project[] = JSON.parse(cookies.projects);
    return await ctx.render({ projects });
  },
};

const ProjectsHomePage = (props: PageProps<Data>) => {
  const projects = props.data.projects;
  return <ProjectsPage projects={projects} />;
};

export default ProjectsHomePage;
