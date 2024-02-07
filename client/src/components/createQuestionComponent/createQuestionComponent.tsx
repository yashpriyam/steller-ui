import { Select } from "../../components/select/select";
import { InputComponent } from "../../components/input/inputComponent";
import "./createQuestionComponent.scss";
import React from "react";
import Accordion from "../accordion/accordion";
import { Options } from "../options/options";
import { CloseCrossIcon } from "../../icons/closeCrossIcon";

export const CreateQuestionComponent: React.FC<CreateQuestionComponentProps> = ({onClose}) => {
  const bool = [
    {
      text: "true",
      value: "true",
    },
    {
      text: "false",
      value: "false",
    },
  ];
  const type = [
    {
      text: "timed",
      value: "timed",
    },
    {
      text: "recorded",
      value: "recorded",
    },
  ];
  const questionType = [
    { text: "single", value: "single" },
    {
      text: "multi",
      value: "multi",
    },
    { text: "fillup", value: "fillup" },
    { text: "codeblock", value: "codeblock" },
  ];
  return (
    <div className="create-question-component-wrapper">
      <div className="close-button" onClick={onClose}>
        <CloseCrossIcon />
      </div>
      <h1 className="create-question-component-header">Add Question</h1>
      <h3>Meta</h3>
      <div className="question-meta-container">
        <InputComponent
          className="create-question-input"
          type="text"
          onChange={() => {}}
          placeholder="Batch Code"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          onChange={() => {}}
          placeholder="Day Number"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          onChange={() => {}}
          placeholder="Week Number"
        />
        <InputComponent
          className="create-question-input"
          type="text"
          onChange={() => {}}
          placeholder="Topic"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          onChange={() => {}}
          placeholder="Expires Time"
        />
        <Select
          className="create-question-select"
          defaultSelected="Select Active"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select Archived"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select Openable"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select type"
          data={type}
          isRequired
          onSelect={() => {}}
        ></Select>
      </div>
      <InputComponent
        className="create-question-input"
        type="number"
        onChange={() => {}}
        placeholder="Marks"
        disabled={false}
      />
      <InputComponent
        className="create-question-input"
        type="number"
        onChange={() => {}}
        placeholder="Id"
        disabled={false}
      />
      <Select
        className="create-question-select"
        defaultSelected="Question type"
        data={questionType}
        isRequired
        onSelect={() => {}}
      ></Select>
      <Accordion title={"Title"} className="accordian-container">
        <Options />
      </Accordion>
    </div>
  );
};
