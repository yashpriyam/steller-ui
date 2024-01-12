import React from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import RouteList from './routes/routeList';
import { SideBar } from "./components/sidebar/sidebar";
import './App.scss';
import { useAppData } from "./AppData";

const App = () => {
  const { sidebarData } = useAppData();
  return (
    <div className="app-container">
      <SideBar {...sidebarData} />
      <div className="app-section">
        <RouteList />
        <MonorepoIndex />
      </div>
    </div>
  );
};
export default App;