import type { Repo } from "../../../common/types";
import { pipe } from "rambda";
import capitalize from "capitalize";
import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { CTX } from "~/routes";
import { RepoStats } from "./RepoStats";
import { Link } from "@builder.io/qwik-city";

export const GuildItem = component$<{ repo: Repo }>((props) => {
  const { repo } = props;
  const state = useContext(CTX);

  const formattedName = pipe(
    (res) => res.replaceAll(/-/g, " "),
    capitalize,
  )(repo.name);

  const showStats = useSignal(false);

  useTask$(({ track }) => {
    track(() => state.showAllStats);
    showStats.value = state.showAllStats;
  });

  return (
    <li>
      <div>
        <h3>
          <Link href={`/guilds/${repo.name}`}>{formattedName}</Link>
        </h3>
        <p>
          {repo.description ||
            "No description provided by the lazy guild master."}
        </p>
        <div class="button-container">
          <button
            onClick$={() => {
              state.favouriteGuild = formattedName;
            }}
          >
            Make favourite
          </button>
          <button onClick$={() => (showStats.value = !showStats.value)}>
            {!showStats.value ? "Show" : "Hide"} commit stats
          </button>
        </div>
      </div>
      <div>
        {showStats.value ? <RepoStats name={repo.name} /> : <p>Stats hidden</p>}
      </div>
    </li>
  );
});
