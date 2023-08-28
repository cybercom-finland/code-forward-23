import type { Repo } from "../../../common/types";
import { pipe } from "rambda";
import capitalize from "capitalize";

export const GuildItem = (props: { repo: Repo }) => {
  const { repo } = props;

  const formattedName = pipe(
    (res) => res.replaceAll(/-/g, " "),
    capitalize,
  )(repo.name);

  const showStats = false;

  return (
    <li>
      <div>
        <h3>
          <a href={repo.html_url}>{formattedName}</a>
        </h3>
        <p>
          {repo.description ||
            "No description provided by the lazy guild master."}
        </p>
        <div class="button-container">
          <button onClick$={() => null}>Make favourite</button>
          <button onClick$={() => null}>
            {!showStats ? "Show" : "Hide"} commit stats
          </button>
        </div>
      </div>
      <div>
        {
          //showStats ? <RepoStats name={repo.name} /> : <p>Stats hidden</p>
        }
      </div>
    </li>
  );
};
