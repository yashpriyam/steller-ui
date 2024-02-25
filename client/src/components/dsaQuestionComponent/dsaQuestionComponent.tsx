import { Text } from "../text/text";
import Accordion from "../accordion/accordion";
import { InputComponent } from "../input/inputComponent";
import "./dsaQuestionComponent.scss";
import { Select } from "../select/select";
import { useState } from "react";
import { Button } from "../button/button";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";

export const DsaQuestionComponent: React.FC<DsaQuestionComponentProps> = ({
  attemptResponse,
  meta,
  questionId,
  title,
  description,
}) => {
  const submissionStatusType = [
    {
      text: "submitted",
      value: "submitted",
    },
    {
      text: "rejected",
      value: "rejected",
    },
  ];
  const { dsaQuestionAttemptApi } = useQuestionAttempt();
  const [submissionLink, setSubmissionLink] = useState<string>(
    attemptResponse?.dsaResponse?.submissionLink || ""
  );
  const [submissionStatus, setSubmissionStatus] = useState<string>(
    attemptResponse?.dsaResponse?.questionSubmissionStatus || ""
  );
  const [testCases, setTestCases] = useState<TestCasesType>({
    totalTestCases: 0,
    passedTestCases: 0,
  });
  const handleOnSetSubmissionLink = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubmissionLink(e.target.value);
  };
  const handleOnSetSubmissionStatus = (option: SelectOptionType) => {
    setSubmissionStatus(option.value);
  };
  const handleOnSetTotalTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestCases({ ...testCases, totalTestCases: Number(e.target.value) });
  };
  const handleOnSetPassedTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestCases({
      ...testCases,
      passedTestCases: Number(e.target.value),
    });
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { response, dsaResponseData } = await dsaQuestionAttemptApi({
        questionId,
        dsaResponse: {
          submissionLink,
          questionSubmissionStatus: submissionStatus,
          testCases,
        },
      });
      setIsLoading(false);
      const message = response?.message;
      const status = response?.status;
      if (status === 201) {
        window.alert(message);
      } else {
        window.alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Accordion
      className="dsa-question-accordian"
      title={
        <span className="title-container">
          <span className="title-text">{title[0]?.text}</span>
          <span className="question-link-container">
            <a href={title[0]?.redirectLink} target="_blank">
              Link
            </a>
          </span>
        </span>
      }
    >
      <div className="dsa-content-container">
        <Text textType="h3">Pseudocode</Text>
        <div className="pseudocode-container">
         {description.type==="html"?<div dangerouslySetInnerHTML={{ __html: description.value }} />:description.value}
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Submission Status :
          </label>
          <Select
            className="create-question-select"
            key={"submission-status"}
            data={submissionStatusType}
            isRequired
            defaultSelected={submissionStatus}
            onSelect={handleOnSetSubmissionStatus}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Submission Link :
          </label>
          <InputComponent
            className="create-question-input"
            type="text"
            key={"submission-link"}
            onChange={handleOnSetSubmissionLink}
            placeholder="Enter submission link"
            disabled={false}
            value={submissionLink}
          />
        </div>
        {submissionStatus === "rejected" && (
          <div className="test-cases-conatiner">
            <div className="create-input-wrapper">
              <label htmlFor="batch-code" className="create-question-label">
                Total Test Cases :
              </label>
              <InputComponent
                className="create-question-input"
                type="number"
                key={"total-test-cases"}
                onChange={handleOnSetTotalTest}
                placeholder="Total test cases"
                disabled={false}
                value={testCases.totalTestCases.toFixed()}
              />
            </div>
            <div className="create-input-wrapper">
              <label htmlFor="batch-code" className="create-question-label">
                Passed Test Cases :
              </label>
              <InputComponent
                className="create-question-input"
                type="number"
                key={"Passed-test-cases"}
                onChange={handleOnSetPassedTest}
                placeholder="Passed test cases"
                disabled={false}
                value={testCases.passedTestCases.toString()}
              />
            </div>
          </div>
        )}
        <div className="dsa-attempt-button-container">
          <Button
            className="dsa-attempt-button"
            text={isLoading ? "submiting" : "submit"}
            onClick={onSubmit}
          />
        </div>
      </div>
    </Accordion>
  );
};
