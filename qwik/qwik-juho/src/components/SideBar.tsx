import { component$, useContext } from "@builder.io/qwik";
import { CTX } from "~/routes";

export const SideBar = component$(() => {
  const state = useContext(CTX);

  return (
    <aside>
      <h1>Js guilds!</h1>
      {state.favouriteGuild ? (
        <section>
          My favourite guild so far has been{" "}
          <strong>
            {state.favouriteGuild}
            🎉
          </strong>
        </section>
      ) : (
        <p>Set a favourite guild by clicking one of the buttons in the list</p>
      )}
      <button
        onClick$={() => {
          state.showAllStats = !state.showAllStats;
        }}
      >
        {!state.showAllStats ? "Show all stats" : "Hide all stats"}
      </button>
    </aside>
  );
});
