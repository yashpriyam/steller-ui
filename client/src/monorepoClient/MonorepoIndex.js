import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppStateContextProvider } from "./AppState/appState.context";
import { ThemeProvider } from "./Components/Themecontext/ThemeContext"
import MonorepoApp from "./MonorepoApp";


const MonorepoIndex = () => {
  return (
    <AppStateContextProvider>
      <React.StrictMode>
        <ThemeProvider>
          <MonorepoApp />
        </ThemeProvider>
      </React.StrictMode>
    </AppStateContextProvider>
  )
}

export default MonorepoIndex
reportWebVitals();
