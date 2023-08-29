"use client";
import { AppActions, AppState, Repo } from "@/types";
import React, { useReducer } from "react";
import { GuildList } from "./GuildList";
import { SideBar } from "./SideBar";
import { initialState, MainContext, MainDispatchContext } from "@/mainContext";

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case "toggleStats":
      return { ...state, showAllStats: action.payload };
    case "updateFavourite":
      return { ...state, favouriteGuild: action.payload };
  }
}

export const GuildApp = (props: { data: Repo[] }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  return (
    <MainContext.Provider value={appState}>
      <MainDispatchContext.Provider value={dispatch}>
        <SideBar />
        <GuildList guilds={props.data} />
      </MainDispatchContext.Provider>
    </MainContext.Provider>
  );
};
