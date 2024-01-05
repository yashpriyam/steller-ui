import React from "react";
import { Route } from 'react-router-dom';
import HomePage from "../pages/homePage/homePage";
import SchedulingPage from "../pages/schedulingPage/schedulingPage";
import { DayPage } from "../pages/dayPage/dayPage";

const unProtectedRoutesMap: RoutesMapInterface = Object.freeze({
  "/homePage": <HomePage />,
  "/scheduling": <SchedulingPage/>,
  "/daypage" : <DayPage/>,
});

export const getUnProtectedRoutes = (): React.ReactNode[] => Object.entries(unProtectedRoutesMap).map(([path, element]) => <Route key={path} path={path} element={element} />)
