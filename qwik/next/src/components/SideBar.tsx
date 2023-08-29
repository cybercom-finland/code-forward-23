"use client";
import { MainContext, MainDispatchContext } from "@/mainContext";
import React, { useContext } from "react";

export const SideBar = () => {
  const state = useContext(MainContext);
  const dispatch = useContext(MainDispatchContext);

  return (
    <aside>
      <h1>Js guilds!</h1>
      {state?.favouriteGuild ? (
        <section>
          My favourite guild so far has been{" "}
          <strong>
            {state?.favouriteGuild}
            🎉
          </strong>
        </section>
      ) : (
        <p>Set a favourite guild by clicking one of the buttons in the list</p>
      )}
      <button
        onClick={() =>
          dispatch({ type: "toggleStats", payload: !state?.showAllStats })
        }
      >
        {!state?.showAllStats ? "Show all stats" : "Hide all stats"}
      </button>
    </aside>
  );
};
