import React from 'react'
export const CreatePasswordScreen = ({t,newPassword,setNewPassword,handelSkip}) => {
  return (
    <div className="screen3">
            <h1 className="h1">{t("create-password")}</h1>
            <input
            className="input"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button className="button">{t("confirm-password")}</button>
            <button onClick={handelSkip} className="link">{t("skip")}</button>
            <button className="button2">{t("create-password")}</button>
          </div>
  )
}
