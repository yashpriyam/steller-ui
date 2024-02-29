import { useState } from "react";
import { InputComponent } from "../../components/input/inputComponent";
import { Button } from "../../components/button/button";
import { useUserGoalsMutation } from "../../redux/actions/createUserGoal";

export const UserGoalResponseComponent = ({
  goalId,
  profileType,
  setIsGoalCompleted,
  responseData,
  id = "",
}: UserResponseInputType) => {
  const [userResponse, setUserResponse] = useState(responseData);
  const { createUserGoal, isLoading, updateUserGoal } = useUserGoalsMutation();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserResponse(value);
  };
  const buttonTextMap = {
    UPDATE: "Update",
    UPDATING: "Updating",
    SUBMIT: "Submit",
    SUBMITTING:"Submitting",
  };
  const handleOnSubmit = async () => {
    const response = await createUserGoal(userResponse || "",goalId,profileType );
    setIsGoalCompleted(true);
  };
  const handleOnUpdate = async () => {
    const response = await updateUserGoal(userResponse || "", id, profileType);
    const submittedLink =
      response?.data?.updateUserGoalCompletion?.userGoalCompletion?.userResponse
        ?.response;
    if (response?.data?.updateUserGoalCompletion?.response?.status === 200) {
      setUserResponse(submittedLink);
    }
    const message = response?.data?.updateUserGoalCompletion?.response?.message;
    window.alert(message);
  };
  return (
    <div>
      <div className="user-response-component">
        <InputComponent
          onChange={handleOnChange}
          value={userResponse || responseData}
          type="Text"
        />
        {responseData ? (
          <Button
            isDisabled={!userResponse}
            variant="contained"
            text={isLoading ? buttonTextMap.UPDATING : buttonTextMap.UPDATE}
            onClick={handleOnUpdate}
            isLoading={isLoading}
          />
        ) : (
          <Button
            isDisabled={!userResponse}
            variant="contained"
            text={isLoading ? buttonTextMap.SUBMITTING : buttonTextMap.SUBMIT}
            onClick={handleOnSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
