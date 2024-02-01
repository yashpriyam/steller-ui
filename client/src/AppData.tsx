import React, { useEffect, useState } from 'react';
import { 
  AvatarIcon, DashboardIcon, HomeIcon, QuestionIcon, ScheduleIcon, MeetIcon, SearchIcon, VideoIcon,NameIcon, PaymentIcon
} from "./icons/index";
import { useTranslation } from 'react-i18next';
import { useUser } from './redux/actions/userAction';
import { useDispatch } from 'react-redux';
import { actions } from './redux/slices/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from './utils';
import { apolloClient } from './graphql/apolloClient/apolloClient';

export const useAppData = (): UseAppDataReturnType => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { user, getUserData } = useUser();
  const { isLoggedIn, userData } = user || {};
  const { name, profileImage } = userData || {};
  const { secureUrl } = profileImage || {};
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
    apolloClient.resetStore()
    navigate("/")
  }
  const getUserDataRequest = async()=>{
    try {
      await getUserData();
    } catch (error) {
      console.log(error);
    }
  }

  const sidebarData: SidebarProps = {
    profile : {
      text: name || t("profile"),
      image: secureUrl ? secureUrl : name ? 
            <NameIcon width='40px' height='40px' name={name} /> : 
            <AvatarIcon isDarkMode={true}/>,
      url: "/profile",
    },
    admin: user.isAdmin &&  {
      image: <PaymentIcon isDarkMode={true}/>,
      text: t('all_users_payments'),
      url: '/admin/usersPayments'
    },
    optionsAtFirst: [
      {
        text: t("search"),
        image: <SearchIcon isDarkMode={true} />,
      },
    ],
    options: [
      {
        text: t("payments"),
        image: <PaymentIcon isDarkMode={true} />,
        url: "/userPayment",
      },
      {
        text: t("dashboard"),
        image: <DashboardIcon isDarkMode={true} />,
        url: "/dashboard",
      },
      {
        text: t("schedule"),
        image: <ScheduleIcon isDarkMode={true} />,
        url: "/schedule",
      },
      {
        text: t("questions"),
        image: <QuestionIcon isDarkMode={true} />,
        url: "/questions",
      },
      {
        text: t("videos"),
        image: <VideoIcon isDarkMode={true} />,
        url: "/videos",
      },
      
    ],
    optionAtLast: {
      text: t(isLoggedIn ? "logout" : "login"),
      onClick: () => (isLoggedIn ? logOut() : setIsLoginModalOpen(true)),
    },
  };
  useEffect(()=>{
    isLoggedIn && getUserDataRequest();
  },[isLoggedIn])
  return { sidebarData, monorepoPaths, isLoginModalOpen, setIsLoginModalOpen, isLoggedIn, user: user }
}