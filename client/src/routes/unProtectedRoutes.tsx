import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";

const unProtectedRoutesMap: RoutesMapInterface = Object.freeze({
  "/homePage": <HomePage />,
});

export const UnProtectedRoutes = () => {
  return <Routes>
    {
      Object.entries(unProtectedRoutesMap).map(([path, element]) => (
        <Route key={path} path={path} element={element} />
      ))
    }
  </Routes>;
}
