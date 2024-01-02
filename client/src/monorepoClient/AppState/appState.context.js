import { createContext, useReducer, useState, useLayoutEffect } from "react";

import { globalObject, globalReducer } from "./reducers/gloabal.reducer";
import {
  authenticateObject,
  authenticateReducer,
} from "./reducers/authenticate.reducer";
import { getCookie } from "../helpers/utils/cookieUtils";
export const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
setIsLoggedIn(!!getCookie(process.env.REACT_APP_JWT_SECRET_KEY));
  }, []);

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
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
