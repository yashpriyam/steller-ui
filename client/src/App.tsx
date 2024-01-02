import React, { useEffect } from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import { useUser } from "./redux/actions/userAction";


const App = () => {
  const { users, registerUser } = useUser();
  useEffect(() => {
    registerUser({
      name: 'dadad',
      email: 'abcd@gmail.coma',
      phoneNumber: '1234567890',
      occupation: 'SDE-1',
      sessionPreference: 'online',
      expectedSalary: '2CR',
      isJobSeeker: false,
    })
  }, [])
  return (
    <div>
      <MonorepoIndex />
    </div>
  );
};
export default App;
