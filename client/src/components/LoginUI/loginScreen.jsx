
export const LoginScreen = ({t,email,setEmail,password,setPassword,handleInputChange,handleLoginClick,handleLoginWithOTP}) => {
    return (
    <div className="screen1">
            <div className="text">
            <h1 className="h1">{t("login")}</h1>
            <h3 className="h3">{t("access")}</h3>
            </div>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)
                handleInputChange()}}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)
              handleInputChange()}}
              required
            />
            <button className="link">{t("forget-password")}</button>
            <button onClick={handleLoginClick} className="button">
              {t("login")}
            </button>
            <hr className="hr" />
            <button onClick={handleLoginWithOTP} className="link">
              {t("login-with-otp")}
            </button>
          </div>
  )
}