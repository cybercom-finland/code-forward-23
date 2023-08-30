import { Repo } from "../../../common/types";
import guildList from "../../../common/guildlist.json";
import { GuildApp } from "@/components/GuildApp";

async function getData() {
  //const res = await fetch(
  //  "https://api.github.com/orgs/knowit-finland-javascript-guild/repos",
  //  {
  //    headers: {
  //      authorization: `Bearer some_token`,
  //    },
  //  },
  //);

  // return res.json();
  return guildList;
}

export default async function Page() {
  const data: Repo[] = await getData();

  // params: ?showStats=repo-name ... showStats=all
  return (
    <main>
      <GuildApp data={data} />
    </main>
  );
}
