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
    const projects: project[] = JSON.parse(cookies.projects);
    if (projects.length === 0) {
      return new Response("", {
        status: 303,
        headers: {
          "Location": "/_404",
        },
      });
    }
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
  return <ProjectsPage projects={project} />;
};

export default ProjectPage;
