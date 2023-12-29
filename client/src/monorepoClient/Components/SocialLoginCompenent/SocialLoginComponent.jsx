import React, { useContext } from "react";
import useHttp from "../../CustomHooks/useHttp";
import { AppStateContext } from "../../AppState/appState.context";
import { GoogleLogin } from "react-google-login";
import { ButtonComponent } from "../Button/Button";
import ImageComponent from "../ImageComponent/ImageComponent";
import GoogleLogo from "../../assets/images/googleIcon.svg";
const SocialLoginComponent = ({ setOpenModal }) => {
  const { sendRequest } = useHttp();

  const { authenticateStateAndDispatch, getLoggedIn } =
    useContext(AppStateContext);
  const { 1: dispatch } = authenticateStateAndDispatch;

  const handleGoogleLogin = async (user) => {
    const { email, name, imageUrl } = user.profileObj;
    const userData = {
      email,
      name,
      imageUrl,
      accessToken: user.accessToken,
      provider: "google",
    };

    try {
      const response = await sendRequest(
        `/api/auth/socialLogin`,
        "post",
        userData
      );

      if (response) {
        dispatch({ type: "USER_LOGIN", payload: response.data.message });
        getLoggedIn();
        setOpenModal(false);
        return;
      }
    } catch (error) {
      console.log(error.error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
        onSuccess={handleGoogleLogin}
        onFailure={handleLoginFailure}
        render={(renderProps) => (
          <ButtonComponent
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="socialButton"
          >
            <ImageComponent
              className={"googleLogo"}
              src={GoogleLogo}
              alt={"google logo"}
            />
            <span>Login with google</span>
          </ButtonComponent>
        )}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </>
  );
};

export default SocialLoginComponent;
