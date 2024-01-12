import React from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import RouteList from './routes/routeList';
import { Sidebar } from "./components/sidebar/sidebar";
import './App.scss';
import { useAppData } from "./AppData";
import { useLocation } from "react-router-dom";

const App = () => {
  const { sidebarData, monorepoPaths } = useAppData();
  const { pathname } = useLocation();
  return (
    <div className="app-container">
      {
        !monorepoPaths[pathname] && (<Sidebar {...sidebarData} />)
      }
      <div className="app-section">
        <RouteList />
        <MonorepoIndex />
      </div>
    </div>
  );
};
export default App;