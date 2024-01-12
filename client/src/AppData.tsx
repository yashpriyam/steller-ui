import React, { useState } from 'react';
import { AvatarIcon, DashboardIcon, HomeIcon, QuestionIcon, ScheduleIcon } from "./icons/index";
import { useTranslation } from 'react-i18next';
import { useUser } from './redux/actions/userAction';
import { useDispatch } from 'react-redux';
import { actions } from './redux/slices/user/userSlice';

export const useAppData = (): UseAppDataReturnType => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { user } = useUser();
  const { isLoggedIn } = user;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const monorepoPaths = {
    "/": true,
    "/register": true,
    "/privacy": true,
    "/privacy/concerns/whatsapp": true,
  }

  const logOut = () => {
    dispatch(actions.setIsLoggedIn(false));
  }

  const sidebarData: SidebarProps = {
    options: [
      {
        text: t('profile'),
        image: <AvatarIcon isDarkMode={true} />,
        url: "/profile",
      },
      {
        text: t('home'),
        image: <HomeIcon isDarkMode={true} />,
        url: "/"
      }, {
        text: t('dashboard'),
        image: <DashboardIcon isDarkMode={true} />,
        url: "/dashboard"
      },
      {
        text: t('schedule'),
        image: <ScheduleIcon isDarkMode={true} />,
        url: "/schedule"
      },
      {
        text: t('questions'),
        image: <QuestionIcon isDarkMode={true} />,
        url: "/questions"
      },
    ],
    optionAtLast: {
      text: t(isLoggedIn ? 'logout' : 'login'),
      onClick: () => isLoggedIn ? logOut() : setIsLoginModalOpen(true)
    }
  }
  return { sidebarData, monorepoPaths, isLoginModalOpen, setIsLoginModalOpen }
}