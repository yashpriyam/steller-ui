import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import SchedulingPage from "../pages/schedulingPage/schedulingPage";
import { Dashboard } from "../pages/dashboard/dashboard";
import DayPage from "../pages/dayPage/dayPage";
import DayContentPage from "../pages/dayContextPage/dayContextPage";
import QuestionPage from "../pages/questionPage/questionPage";
import VideosPage from "../pages/videosPage/videosPage";

const unProtectedRoutesMap: RoutesMapInterface = Object.freeze({
  "/homePage": <HomePage />,
  "/scheduling": <SchedulingPage/>,
  "/dashboard":<Dashboard/>,
  "/day/:dayNumber" : <DayPage/>,
  "/day/:dayNumber/:dayContent": <DayContentPage />,
  "/question": <QuestionPage/>
  "/VideoPage": <VideosPage />,
});

export const getUnProtectedRoutes = (): React.ReactNode[] =>
  Object.entries(unProtectedRoutesMap).map(([path, element]) => (
    <Route key={path} path={path} element={element} />
  ));
