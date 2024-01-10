import React from "react";
import { Route } from 'react-router-dom';
import HomePage from "../pages/homePage/homePage";
import SchedulingPage from "../pages/schedulingPage/schedulingPage";
import { DayPage } from "../pages/dayPage/dayPage";
import DayContextPage from "../pages/dayContextPage/dayContextPage";
import QuestionPage from "../pages/questionPage/questionPage";

const unProtectedRoutesMap: RoutesMapInterface = Object.freeze({
  "/homePage": <HomePage />,
  "/scheduling": <SchedulingPage/>,
  "/day/:dayNumber" : <DayPage/>,
  "/day/:dayNumber/:dayContent": <DayContextPage />,
  "/question": <QuestionPage/>
});

export const getUnProtectedRoutes = (): React.ReactNode[] => Object.entries(unProtectedRoutesMap).map(([path, element]) => <Route key={path} path={path} element={element} />)
