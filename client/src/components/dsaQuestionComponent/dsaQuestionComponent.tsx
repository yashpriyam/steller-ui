import { Text } from "../text/text";
import Accordion from "../accordion/accordion";
import { InputComponent } from "../input/inputComponent";
import "./dsaQuestionComponent.scss";
import { Select } from "../select/select";
import { useState } from "react";
import { Button } from "../button/button";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import { CheckedIcon } from "../../icons/CheckedIcon";

export const DsaQuestionComponent: React.FC<DsaQuestionComponentProps> = ({
  attemptResponse,
  meta,
  questionId,
  title,
  description,
  questionIndex
}) => {
  const submissionStatusType = [
    {
      text: "Submitted",
      value: "Submitted",
    },
    {
      text: "Rejected",
      value: "Rejected",
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
    totalTestCases: attemptResponse?.dsaResponse?.testCases?.totalTestCases || 0,
    passedTestCases: attemptResponse?.dsaResponse?.testCases?.passedTestCases || 0,
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
          <span className="title-text">{`${questionIndex}. ${title[0]?.text}`}</span>
          <span className="question-link-container">
            <span className="question-submitted-icon">{submissionLink && <CheckedIcon height="25" width="25"/>}</span>
            <a href={title[0]?.redirectLink} target="_blank">
              Link
            </a>
          </span>
        </span>
      }
    >
      <div className="dsa-content-container">
        {description.value && <Text className="description-header" textType="h3">Pseudocode</Text>}
        {description.value && <div className="pseudocode-container">
         {description.type==="html"?<div dangerouslySetInnerHTML={{ __html: description.value }} />:description.value}
        </div>}
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
        {(submissionStatus.toLowerCase()) === "rejected" && (
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
            text={isLoading ? "Submiting" : "Submit"}
            onClick={onSubmit}
          />
        </div>
      </div>
    </Accordion>
  );
};
