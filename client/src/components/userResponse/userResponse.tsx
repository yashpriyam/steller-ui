import { useState } from "react";
import { InputComponent } from "../../components/input/inputComponent";
import { Button } from "../../components/button/button";
import { useUserGoalsMutation } from "../../redux/actions/createUserGoal";

export const UserGoalResponseComponent = ({ goalId, profileType, setIsGoalCompleted,responseData , id = "" }: { goalId: string, profileType?: string, setIsGoalCompleted: React.Dispatch<React.SetStateAction<boolean>>,responseData?:string , id ?:String}) => {
  const [userResponse, setUserResponse] = useState(responseData);
  const { createUserGoal, isLoading ,updateUserGoal } = useUserGoalsMutation();
  const [isUpdate, setIsUpdate] = useState<boolean>(responseData ? true : false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserResponse(value);
  };
  const handleOnSubmit = async () => {
    const response = isUpdate && responseData
      ? await updateUserGoal
      (userResponse||"",id ,profileType): await createUserGoal(userResponse || "", goalId, profileType);
    setIsGoalCompleted(true)
    
     const submittedLink= response?.data?.updateUserGoalCompletion?.userGoalCompletion?.userResponse?.response
    if (response?.data?.updateUserGoalCompletion?.response?.status===200) {
      setUserResponse(submittedLink)
    }
    const message = response?.data?.updateUserGoalCompletion?.response?.message;
    window.alert(message)
  };    
  return (
    <div>
      <div className="user-response-component">
        <InputComponent
          onChange={handleOnChange}
          value={userResponse||responseData}
          type="Text"
        />
        <Button
          isDisabled={!userResponse}
          variant="contained"
          text={responseData? isLoading?"Updating":"Update" : isLoading?"Submitting": "Submit"}
          onClick={handleOnSubmit}
          isLoading={isLoading}
          />
      </div>
    </div>
  );
};
