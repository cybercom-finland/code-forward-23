import { component$ } from "@builder.io/qwik";
import type { Repo } from "../../../common/types";
import { GuildItem } from "./GuildItem";
// import { GuildItem } from "./GuildItem";

interface Props {
  guilds: Repo[];
}

export default component$<Props>((props) => {
  if (!Array.isArray(props.guilds)) return null;
  return (
    <ul>
      {props.guilds.map((repo) => <GuildItem repo={repo} key={repo.id} />)}
    </ul>
  );
});
