"use client";
import { Repo } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import { RepoStats } from "./RepoStats";
import { pipe } from "rambda";
import capitalize from "capitalize";
import { MainContext, MainDispatchContext } from "@/mainContext";

export const GuildItem = (props: { repo: Repo }) => {
  const { repo } = props;
  const [showStats, setShowStats] = useState(false);
  const dispatch = useContext(MainDispatchContext);
  const appState = useContext(MainContext);
  useEffect(() => {
    setShowStats(!!appState?.showAllStats);
  }, [appState?.showAllStats]);
  const formattedName = pipe(
    (res) => res.replaceAll(/-/g, " "),
    capitalize,
  )(repo.name);

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
        <div className="button-container">
          <button
            onClick={() =>
              dispatch({ type: "updateFavourite", payload: formattedName })
            }
          >
            Make favourite
          </button>
          <button onClick={() => setShowStats(!showStats)}>
            {!showStats ? "Show" : "Hide"} commit stats
          </button>
        </div>
      </div>
      <div>
        {showStats ? <RepoStats name={repo.name} /> : <p>Stats hidden</p>}
      </div>
    </li>
  );
};
