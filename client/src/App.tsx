import React from 'react';
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import RouteList from './routes/routeList';
import { Sidebar } from "./components/sidebar/sidebar";
import './App.scss';
import { useAppData } from "./AppData";
import { useLocation } from "react-router-dom";
import { Modal } from "./components/Modal/modal";
import { Login } from "./components/Login/login";

const App = () => {
  const { sidebarData, monorepoPaths, isLoginModalOpen, setIsLoginModalOpen, isLoggedIn } = useAppData();
  const { pathname } = useLocation();
  const isNotMonorepoPath = !monorepoPaths[pathname];

  return (
    <div className="app-container">
      {
        isLoggedIn && isNotMonorepoPath && (<Sidebar {...sidebarData} />)
      }
      {
        isLoginModalOpen && (<Modal> <Login closeModal={() => setIsLoginModalOpen(false)} /> </Modal>)
      }
      <div className={`app-section ${isLoggedIn && isNotMonorepoPath && 'portal-app-section'} ${!isLoggedIn && 'app-log-out' }`}>
        <RouteList />
        <MonorepoIndex />
      </div>
    </div>
  );
};
export default App;