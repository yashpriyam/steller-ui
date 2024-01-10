import React from "react";
import { Route } from 'react-router-dom';
import HomePage from "../pages/homePage/homePage";
import SchedulingPage from "../pages/schedulingPage/schedulingPage";
import { Dashboard } from "../pages/dashboard/dashboard";

const unProtectedRoutesMap: RoutesMapInterface = Object.freeze({
  "/homePage": <HomePage />,
  "/scheduling": <SchedulingPage/>,
  "/dashboard":<Dashboard/>
});

export const getUnProtectedRoutes = (): React.ReactNode[] => Object.entries(unProtectedRoutesMap).map(([path, element]) => <Route key={path} path={path} element={element} />)
