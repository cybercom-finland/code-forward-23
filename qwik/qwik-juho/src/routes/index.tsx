import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { AppState, Repo } from "../../../common/types";
import guildListData from "../../../common/guildlist.json";
import GuildList from "~/components/GuildList";
import { SideBar } from "~/components/SideBar";

export const useGuildList = routeLoader$(async () => {
  return guildListData as Repo[];
});



export const CTX = createContextId<AppState>("appState");

export default component$(() => {
  const guildListSignal = useGuildList();
  const appData = useStore({ favouriteGuild: "", showAllStats: false });
  useContextProvider(CTX, appData);
  return (
    <main>
      <SideBar />
      <GuildList guilds={guildListSignal.value} />
    </main>
  );
});
