import React from 'react';
import { AvatarIcon, DashboardIcon, HomeIcon, QuestionIcon, ScheduleIcon } from "./icons/index";
import { useTranslation } from 'react-i18next';

export const useAppData = (): UseAppDataReturnType => {
  const { t } = useTranslation();
  const monorepoPaths = {
    "/": true,
    "/register": true,
    "/privacy": true,
    "/privacy/concerns/whatsapp": true,
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
      /*TODO:@dhananjay - login is not implemented, will update logout logic after its implementation */
      text: t('log_out'),
      onClick: () => console.log('log out')
    }
  }
  return { sidebarData, monorepoPaths }
}