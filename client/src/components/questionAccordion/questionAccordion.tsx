import { useState } from "react";
import Accordion from "../accordion/accordion";
import "./questionAccordion.scss";
import { Checkbox } from "../checkbox/checkbox";
import { Button } from "../button/button";
import { InputComponent } from "../../components/input/inputComponent";
import CodeBlock from "../../components/codeBlock/codeBlock";

const QuestionAccordion = ({
  questionData,
  onSubmit,
  errorMsg,
  successMsg,
  isAnswered,
  isCorrect,
  className,
}: QuestionAccordionProps) => {
  const [selectedValues, setSelectedValues] = useState<CheckboxValueType[]>([]);
  const { title, options, questionType } = questionData;
  const [fillupValue, setFillupValue] = useState<string>("");
  const isFillupType = questionType === "fillup";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isSubmitBtnDisabled: boolean = isFillupType
    ? !fillupValue
    : !selectedValues.length || isLoading;
  const handleOnSubmitQuestion = async () => {
    setIsLoading(true);
    await onSubmit(questionData, selectedValues);
    setIsLoading(false);
  };

  return (
    <Accordion
      className={`question-title ${className}`}
      title={<div className="question-title">{title[0]?.text}</div>}
    >
      <div className="question-accordion-container">
        <div className="question-container">
          {title.map((titleData: QuestionOptionType, index: number) => (
            <div key={index} className="question-title-sub-container">
              {Boolean(index) && (
                <div className="question-title-text">{titleData.text}</div>
              )}
              {titleData?.imageUrl && (
                <img
                  className="question-title-img"
                  src={titleData.imageUrl}
                  alt=""
                />
              )}
              {titleData?.iframe && (
                <iframe
                  className="question-accordion-head-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  src={titleData.iframe}
                ></iframe>
              )}
            </div>
          ))}
          {questionData.questionType === "codeblock" && (
            <CodeBlock questionData={questionData} />
          )}
          <div className="question-option-container">
            {isFillupType ? (
              <InputComponent
                className="question-fillup-input"
                type="text"
                onChange={(e) => setFillupValue(e.target.value)}
                value={fillupValue}
              />
            ) : (
              questionData.questionType !== "codeblock" && (
                <Checkbox
                  onSelect={(index, selectedValues) =>
                    setSelectedValues(Object.values(selectedValues))
                  }
                  isIncorrect={isAnswered && !isCorrect}
                  options={options}
                  className="question-checkbox"
                  type={isFillupType ? "multi" : "single"}
                />
              )
            )}
          </div>
          {isAnswered &&
            !isFillupType &&
            (isCorrect ? (
              <div className="question-correct-ans">{successMsg}</div>
            ) : (
              <div className="question-incorrect-ans">{errorMsg}</div>
            ))}
          {isAnswered && isFillupType && <iframe src={fillupValue}></iframe>}
          {questionData.questionType !== "codeblock" && (
            <div className="question-submit-btn-wrapper">
              <Button
                isLoading={isLoading}
                isDisabled={isSubmitBtnDisabled}
                onClick={handleOnSubmitQuestion}
                iconPosition="center"
                className="question-submit-btn"
              />
            </div>
          )}
        </div>
      </div>
    </Accordion>
  );
};

export default QuestionAccordion;
