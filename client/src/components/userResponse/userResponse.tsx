import { useState } from "react";
import { InputComponent } from "../../components/input/inputComponent";
import { Button } from "../../components/button/button";
import { useUserGoals } from "../../redux/actions/createUserGoal";

export const UserGoalResponseComponent = ({ goalId }: { goalId: string }) => {
  const [userResponse, setUserResponse] = useState("");
  const { createUserGoal, isLoading } = useUserGoals();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserResponse(value);
  };

  const handleOnSubmit = async () => {
    const response = await createUserGoal(userResponse, goalId);
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
