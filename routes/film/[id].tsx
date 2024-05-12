import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import FilmPage from "../../components/FilmPage.tsx";
import { film } from "../../types.ts";

type Data = {
  film: film;
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    const id: string = ctx.params.id;
    try {
      const url = "https://filmapi.vercel.app/api/films";
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Response("Error fetching film", { status: 500 });
      }
      const films: film[] = await response.json();
      const film = films.find((film) => film._id === id);
      if (!film) {
        return new Response("", {
          status: 303,
          headers: {
            "Location": "/_404",
          },
        });
      }
      return await ctx.render({ film });
    } catch (error) {
      return new Response("Error fetching film", { status: 500 });
    }
  },
};

const FilmHomePage = (props: PageProps<Data>) => {
  const film = props.data.film;
  return <FilmPage film={film} />;
};

export default FilmHomePage;
