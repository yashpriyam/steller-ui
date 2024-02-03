import { UserInfoSubCard } from "../../components/userInfoSubCard/userInfoSubCard";

export const UserInfoCard : React.FC<UserInfoCardPropsInterface> = ({
    datalist,
    nonEditedableFields,
    editing,
    formTextValues,
    onChange,
})=>{
    return <>
    {
        Object.entries(datalist)?.map(([key, value], idx) => {
            if (!nonEditedableFields[key]) {
              return (
                <UserInfoSubCard
                  text={formTextValues ? `${formTextValues[key]}` : key}
                  value={value}
                  editing={editing}
                  userInputValue={datalist}
                  field={key}
                  onChange={onChange}
                  key={idx}
                  errorMessage={
                    key === "phoneNumber"
                      ? "phone number must contain 10 digits only"
                      : "error"
                  }
                />
              );
            } else {
              return (
                <UserInfoSubCard
                  text={formTextValues ? `${formTextValues[key]}` : key}
                  value={value}
                  key={idx}
                />
              );
            }
          })
    }
    </>
}