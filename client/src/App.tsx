import React, { ChangeEvent, useState } from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import { InputComponent } from "./components/input/inputComponent";


const App = () => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };
  return (
    <div>
      <InputComponent placeholder="password" type="password" value={value} onChange={onChange}/>
    </div>
  );
};
export default App;
