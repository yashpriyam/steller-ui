import { useState } from "react";
import Accordion from "../accordion/accordion";
import "./questionAccordion.scss";
import { Checkbox } from "../checkbox/checkbox";
import { Button } from "../button/button";
import { InputComponent } from "../../components/input/inputComponent";
import CodeBlock from "../../components/codeBlock/codeBlock";
import { CheckedIcon } from "../../icons/CheckedIcon";
import { useUserCode } from "../../redux/actions/userCodeActions";
import { useUser } from "../../redux/actions/userAction";
import { EditzIcon, DeleteIcon } from "../../icons/index";
const QuestionAccordion = ({
  questionData,
  onSubmit,
  errorMsg,
  successMsg,
  isAnswered,
  isCorrect,
  className,
  questionNumber,
}: QuestionAccordionProps) => {
  const [selectedValues, setSelectedValues] = useState<CheckboxValueType[]>([]);
  const { title, options, questionType } = questionData;
  const [fillupValue, setFillupValue] = useState<CheckboxValueType[]>([]);
  const isFillupType = questionType === "fillup";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isSubmitBtnDisabled: boolean = isFillupType
    ? !fillupValue
    : !selectedValues.length || isLoading;
    // console.log({questionData})
  const handleOnSubmitQuestion = async () => {
    setIsLoading(true);
    await onSubmit(questionData, isFillupType ? fillupValue : selectedValues);
    setIsLoading(false);
  };
  const { userCodeData } = useUserCode();
  const questionId = questionData?._id;
  const codeBlockSubmittedDate = userCodeData?.userCode?.find(
    (element) => element.questionId === questionId
  );
  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImagePreviewOpen(true);
  };
  const closeImagePreview = () => {
    setSelectedImage(null);
    setIsImagePreviewOpen(false);
  };
  const { user } = useUser();
  const { isAdmin } = user;
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }
  return (
    <Accordion
      className={`question-title ${className}`}
      title={
        <div className="question-title-wrapper">
          <div className="question-title">
            {questionNumber
              ? `${
                  questionNumber < 10 ? `0${questionNumber}` : questionNumber
                }.`
              : ""}{" "}
            {`${title[0]?.text}`}
          </div>
          <div
            className={`checked-icon ${
              isAdmin || isAnswered || Boolean(codeBlockSubmittedDate)
                ? "checked-true"
                : "checked-false"
            }`}
          >
            {isAdmin ? (
              <div className="edit-delete-wrapper">
                <span onClick={handleEdit}>
                  <EditzIcon width="25px" height="25px" />
                </span>
                <span onClick={handleDelete}>
                  <DeleteIcon height="25px" width="25px" />
                </span>
              </div>
            ) : (
              <CheckedIcon />
            )}
          </div>
        </div>
      }
    >
      <div className="question-accordion-container">
        <div className="question-container">
          <div key={questionNumber} className="question-title-sub-container">
            {title.map((titleData: QuestionOptionType, index: number) => (
              <>
                {Boolean(index) && (
                  <div className="question-title-text">{titleData.text}</div>
                )}
                {titleData?.imageUrl && (
                  <img
                    className="question-title-img"
                    src={titleData.imageUrl}
                    alt=""
                    onClick={() => openImagePreview(titleData.imageUrl ? titleData.imageUrl : "")}
                  />
                )}
                {titleData?.iframe && (
                  <iframe
                    className="question-accordion-head-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    src={titleData.iframe}
                  ></iframe>
                )}
                {isImagePreviewOpen && (
        <div className="question-image-preview-modal" onClick={closeImagePreview}>
          <img
            className="question-preview-image"
            src={selectedImage || ""}
            alt="Image Preview"
          />
        </div>
      )}
              </>
            ))}
          </div>
          {questionData.questionType === "codeblock" && (
            <CodeBlock questionData={questionData} />
          )}
          <div className="question-option-container">
            {isFillupType ? (
              <InputComponent
                className="question-fillup-input"
                type="text"
                onChange={(e) => setFillupValue([{text: e.target.value}])}
                value={fillupValue[0]?.text}
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
