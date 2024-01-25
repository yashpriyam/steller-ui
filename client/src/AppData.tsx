import React, { useState } from 'react';
import { 
  AvatarIcon, DashboardIcon, HomeIcon, QuestionIcon, ScheduleIcon, MeetIcon, SearchIcon, VideoIcon,NameIcon
} from "./icons/index";
import { useTranslation } from 'react-i18next';
import { useUser } from './redux/actions/userAction';
import { useDispatch } from 'react-redux';
import { actions } from './redux/slices/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from './utils';

export const useAppData = (): UseAppDataReturnType => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { user, getUserData } = useUser();
  getUserData();
  const { isLoggedIn, userData } = user || {};
  const { name } = userData || {};
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const monorepoPaths = {
    "/": true,
    "/register": true,
    "/privacy": true,
    "/privacy/concerns/whatsapp": true,
  }

  const logOut = () => {
    deleteCookie(process.env.REACT_APP_JWT_SECRET_KEY || "");
    dispatch(actions.setIsLoggedIn(false));
    navigate("/")
  }

  const sidebarData: SidebarProps = {
    optionsAtFirst: [
      {
        text: name || t("profile"),
        image: <NameIcon width='40px' height='40px' name={name} />,
        url: "/profile",
        isProfile: true,
      },
      // {
      //   text: t("search"),
      //   image: <SearchIcon isDarkMode={true} />,
      // },
    ],
    options: [
      {
        text: t("home"),
        image: <HomeIcon isDarkMode={true} />,
        url: "/",
      },
      // {
      //   text: t("dashboard"),
      //   image: <DashboardIcon isDarkMode={true} />,
      //   url: "/dashboard",
      // },
      {
        text: t("schedule"),
        image: <ScheduleIcon isDarkMode={true} />,
        url: "/schedule",
      },
      {
        text: "Meet",
        image: <MeetIcon isDarkMode={true} />,
        url: process.env.REACT_APP_CLASS_MEET_URL || "",
        openNewPage: true,
      },
      // {
      //   text: t("questions"),
      //   image: <QuestionIcon isDarkMode={true} />,
      //   url: "/questions",
      // },
      // {
      //   text: t("videos"),
      //   image: <VideoIcon isDarkMode={true} />,
      //   url: "/videos",
      // },
    ],
    optionAtLast: {
      text: t(isLoggedIn ? "logout" : "login"),
      onClick: () => (isLoggedIn ? logOut() : setIsLoginModalOpen(true)),
    },
  };
  return { sidebarData, monorepoPaths, isLoginModalOpen, setIsLoginModalOpen, isLoggedIn }
}