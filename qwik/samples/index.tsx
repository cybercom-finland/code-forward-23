import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Repo } from "../../../common/types";
import guildList from "../../../common/guildlist.json";

export const useGuildList = routeLoader$(async () => {
  return guildList as Repo[];
});

export default component$(() => {
  const guildListSignal = useGuildList();
  return <code>{JSON.stringify(guildListSignal.value)}</code>;
});
