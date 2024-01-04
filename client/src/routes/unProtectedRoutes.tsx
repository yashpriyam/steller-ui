import React from "react";
import { Route } from 'react-router-dom';
import HomePage from "../pages/homePage/homePage";
import VideosPage from "../pages/videosPage/videosPage";

const unProtectedRoutesMap: RoutesMapInterface = Object.freeze({
  "/homePage": <HomePage />,
  "/": <VideosPage/>
});

export const getUnProtectedRoutes = (): React.ReactNode[] => Object.entries(unProtectedRoutesMap).map(([path, element]) => <Route key={path} path={path} element={element} />)
