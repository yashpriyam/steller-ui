import React from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import RouteList  from './routes/routeList';
import { Dashboard } from "./pages/dashboard/dashboard";


const App = () => {
  return (
    <div>
      <RouteList />
      <MonorepoIndex />
    </div>
  );
};
export default App;
