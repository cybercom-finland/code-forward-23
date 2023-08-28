import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Repo } from "../../../common/types";
import guildListData from "../../../common/guildlist.json";
import GuildList from "~/components/GuildList";

export const useGuildList = routeLoader$(async () => {
  return guildListData as Repo[];
});

export default component$(() => {
  const guildListSignal = useGuildList();
  return (
    <main>
      <GuildList guilds={guildListSignal.value} />
    </main>
  );
});
