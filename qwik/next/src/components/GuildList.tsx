"use client";
import { Repo } from "@/types";
import { FC } from "react";
import { GuildItem } from "./GuildItem";

interface Props {
  guilds: Repo[];
}

export const GuildList: FC<Props> = (props) => {
  if (!Array.isArray(props.guilds)) return;
  return (
    <ul>
      {props.guilds?.map((repo) => <GuildItem repo={repo} key={repo.id} />)}
    </ul>
  );
};
