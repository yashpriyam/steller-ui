import { createContext, useReducer } from "react";

import { globalObject, globalReducer } from "./reducers/gloabal.reducer";
import {
  authenticateObject,
  authenticateReducer,
} from "./reducers/authenticate.reducer";
import { useUser } from "../../redux/actions/userAction";
export const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {

  const { user, setIsLoggedIn } = useUser();
  const { isLoggedIn, userData } = user;

  const globalStateAndDispatch = useReducer(globalReducer, globalObject);

  const authenticateStateAndDispatch = useReducer(
    authenticateReducer,
    authenticateObject
  );

  return (
    <AppStateContext.Provider
      value={{
        globalStateAndDispatch,
        authenticateStateAndDispatch,
        isLoggedIn,
        setIsLoggedIn,
        userData,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
