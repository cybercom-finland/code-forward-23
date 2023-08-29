import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { GuildItem } from "~/components/GuildItem";
import guildListData from "../../../../../common/guildlist.json";
import { CTX } from "~/routes";

export const useRepo = routeLoader$(async (req) => {
  const name = req.params.guildname;
  const repo = guildListData.find((repo) => repo.name === name);
  return repo;
});

export default component$(() => {
  const repoSignal = useRepo();
  const loc = useLocation();
  const appData = useStore({ favouriteGuild: "", showAllStats: false });
  useContextProvider(CTX, appData);

  if (!repoSignal.value) {
    return <div>Sorry, no such guild: {loc.params.guildname}</div>;
  }
  return (
    <div>
      <GuildItem repo={repoSignal.value} />
      <footer style={{ marginTop: "100px" }}>
        <Link href="/">Back to the main page</Link>
      </footer>
    </div>
  );
});
