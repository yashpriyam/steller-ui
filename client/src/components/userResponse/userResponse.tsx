import { useState } from "react";
import { InputComponent } from "../../components/input/inputComponent";
import { Button } from "../../components/button/button";
import { useUserGoalsMutation } from "../../redux/actions/createUserGoal";

export const UserGoalResponseComponent = ({ goalId, profileType, setIsGoalCompleted }: { goalId: string, profileType?: string, setIsGoalCompleted: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  const [userResponse, setUserResponse] = useState("");
  const { createUserGoal, isLoading } = useUserGoalsMutation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserResponse(value);
  };

  const handleOnSubmit = async () => {
    const response = await createUserGoal(userResponse, goalId, profileType);
    setIsGoalCompleted(true)
  };

  return (
    <div>
      <div className="user-response-component">
        <InputComponent
          onChange={handleOnChange}
          value={userResponse}
          type="Text"
        />
        <Button
          isDisabled={!userResponse}
          variant="contained"
          text="Submit"
          onClick={handleOnSubmit}
          isLoading={isLoading}
          />
      </div>
    </div>
  );
};
