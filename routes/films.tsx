import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import FilmsPage from "../islands/FilmsPage.tsx";
import { film } from "../types.ts";

type Data = {
  films: film[];
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const url = "https://filmapi.vercel.app/api/films";
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Response("Error fetching profiles", { status: 500 });
      }
      const films: film[] = await response.json();
      return await ctx.render({ films });
    } catch (error) {
      return await ctx.render({ films: [] });
    }
  },
};

export default function FilmsHomePage(props: PageProps<Data>) {
  const films = props.data.films;
  return (
    <>
      <FilmsPage films={films} />
    </>
  );
}
