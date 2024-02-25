import { CodeBlockInputType } from "../codeBlockInputType/codeBlockInputType";
import { InputComponent } from "../../components/input/inputComponent";
import Accordion from "../accordion/accordion";
import "./options.scss";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionActions } from "../../redux/slices/createQuestion/createQuestionSlice";
import { readFileAsDataURL } from "../../utils/readFileAsDataURL";
import { UploadImage } from "../uploadImage/uploadImage";
import { createImageePublicUrl } from "../../redux/actions/imageAction";
import { useState } from "react";
import { Button } from "../button/button";
export const Options: React.FC<OptionsProps> = ({
  prevPath,
  optionQuestionType,
}: OptionsProps) => {
  const { createQuestion } = useSelector((state): any => state);
  const { questionType } = createQuestion as CreateQuestionInterface;
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { updateState } = createQuestionActions;
  const handleOnSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const path = `${prevPath}.text`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSelectImageClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && Boolean(files.length)) {
      try {
        const image = await readFileAsDataURL(files[0]);
        if (typeof image === "string") {
          setUploadedImageUrl(image);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleOnUploadImage = async () => {
    try {
      setIsImageUploading(true);
      const { publicUrl, response } = await createImageePublicUrl(
        uploadedImageUrl
      );
      setIsImageUploading(false);
      if (response.status === 200 && publicUrl) {
        alert("image uploaded successfully");
        const path = `${prevPath}.imageUrl`;
        dispatch(updateState({ path, value: publicUrl }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSetIframe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const path = `${prevPath}.iframe`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetQuestionLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const path = `${prevPath}.redirectLink`;
    dispatch(updateState({ path, value }));
  };
  return (
    <div className="option-container">
      <div className="create-question-input-wrapper">
        <label htmlFor="batch-code" className="create-question-label">
          Text :
        </label>
        <InputComponent
          type="text"
          onChange={handleOnSetTitle}
          placeholder="Text"
          backgroundColor="black"
          className="question-input-container"
        />
      </div>
      {optionQuestionType === "dsa" && (
        <div className="create-question-input-wrapper">
          <label htmlFor="-code" className="create-question-label">
            Leetcode Question Link :
          </label>
          <InputComponent
            className="question-input-container"
            type="text"
            key={"questionLink"}
            backgroundColor="black"
            onChange={handleOnSetQuestionLink}
            placeholder="Question Link"
          />
        </div>
      )}
      <div className="upload-image-conatiner-wrapper">
        <UploadImage
          onChange={handleOnSelectImageClick}
          text="Select image"
          className="upload-image-wrapper"
        />
        {uploadedImageUrl && (
          <div className="uploaded-mage-conatiner">
            <img
              className="image-container"
              src={uploadedImageUrl}
              alt="uploading"
            />
            <Button
              className="upload-image-button"
              onClick={handleOnUploadImage}
              text={isImageUploading ? "uploading" : "upload image"}
            />
          </div>
        )}
      </div>

      <InputComponent
        type="text"
        onChange={handleOnSetIframe}
        placeholder="iframe"
        backgroundColor="black"
        className="question-input-container"
      />
      {questionType && questionType === "codeblock" && (
        <Accordion title={"Code Block"} className="accordian-container">
          <CodeBlockInputType prevPath={`${prevPath}.codeBlock`} />
        </Accordion>
      )}
    </div>
  );
};
