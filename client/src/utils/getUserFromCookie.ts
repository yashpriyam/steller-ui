import { getCookie } from "./getCookie";
import {jwtDecode} from 'jwt-decode'; 

const getUserFromCookies = () => {
  try {
    const userCookie = getCookie(process.env.REACT_APP_JWT_SECRET_KEY ?? ''); 
    if (userCookie) {
      // Parse the JSON string stored in the cookie
      const userData: { user: User } = jwtDecode(userCookie);
      return userData.user;
    }

    return null;
  } catch (error) {
    console.error('Error while parsing user cookie:', error);
    return null;
  }
};

export default getUserFromCookies;