import { createContext } from "react";
import { AppActions, AppState } from "./types";

export const initialState: AppState = {
  showAllStats: false,
  favouriteGuild: "",
};

export const MainContext = createContext<null | AppState>(null);
export const MainDispatchContext = createContext<React.Dispatch<AppActions>>(
  (state) => state,
);
