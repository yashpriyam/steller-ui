import { SelectComp } from "./components/select/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t } = useTranslation();
    const dataList = [
      {
        text: "option1",
        value: "value1",
      },
      {
        text: "option2",
        value: "value2",
      },
      {
        text: "option3",
        value: "value3",
      },
      {
        text: "option4",
        value: "value4",
      },
      {
        text: "option5",
        value: "value5",
      },
      {
        text: "option6",
        value: "value6",
      },
      {
        text: "option7",
        value: "value7",
      },
      {
        text: "option8",
        value: "value8",
      },
      {
        text: "option1",
        value: "value1",
      },
      {
        text: "option2",
        value: "value2",
      },
      {
        text: "option3",
        value: "value3",
      },
      {
        text: "option4",
        value: "value4",
      },
      {
        text: "option5",
        value: "value5",
      },
      {
        text: "option6",
        value: "value6",
      },
      {
        text: "option7",
        value: "value7",
      },
      {
        text: "option8",
        value: "value8",
      },
    ];
    // const [dataList, setDataList] =
    //   useState<{ text: string; value: string }[]>(dataListArr);

  const handleOnSelect = ()=>{

  };
  return (
    <div>
      <h1>{t("greeting")}</h1>
      <SelectComp
        isDisabled={false}
        className="style"
        data={dataList}
        defaultSelected="Default option"
        onSelect={handleOnSelect}
        label = 'required'
        labelPosition = 'bottom'
        isRequired = {true}
        isError = {false}
        placeHolder = 'placeholder'
        maxSize = {4}
      />
    </div>
  );
};

export default App;
