//
import guildList from "../../../../../common/guildlist.json";
import { GuildItem } from "@/components/GuildItem";
import Link from "next/link";

async function getData(guildname: string) {
  return guildList.find((repo) => repo.name === guildname);
}

export default async function Page({
  params,
}: {
  params: { guildname: string };
}) {
  const repo = await getData(params.guildname);
  // const [appState, dispatch] = useReducer(appReducer, initialState);
  if (!repo) return <div>Sorry, did not find {params.guildname}</div>;
  return (
    <div>
      <GuildItem repo={repo} />
      <footer style={{ marginTop: "100px" }}>
        <Link href="/">Back to the main page</Link>
      </footer>
    </div>
  );
}
