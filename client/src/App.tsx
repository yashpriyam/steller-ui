import React from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import RouteList from './routes/routeList';

const App = () => {
  return (
    <div>
      <RouteList />
      <MonorepoIndex />
    </div>
  );
};
export default App;
