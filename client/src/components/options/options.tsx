import { CodeBlockInputType } from "../codeBlockInputType/codeBlockInputType";
import { InputComponent } from "../../components/input/inputComponent";
import Accordion from "../accordion/accordion";
import "./options.scss";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionActions } from "../../redux/slices/createQuestion/createQuestionSlice";
import { readFileAsDataURL } from "../../utils/readFileAsDataURL";
import { UploadImage } from "../uploadImage/uploadImage";
import { createImageePublicUrl } from "../../redux/actions/imageAction";
export const Options: React.FC<OptionsProps> = ({prevPath}) => {
  const { createQuestion } = useSelector((state): any => state);  
  const { questionType } = createQuestion as CreateQuestionInterface;
  const  dispatch = useDispatch();
  const { updateState } = createQuestionActions;
  const handleOnSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const path = `${prevPath}.text`;
    dispatch(updateState({path,value}))
  }
   const handleOnImageClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (files && Boolean(files.length)) {
       try {
         const image = await readFileAsDataURL(files[0]);
         if (typeof image === "string") {
           const { publicUrl, response } = await createImageePublicUrl(image);
           if (response.status === 200 && publicUrl) {
             const path = `${prevPath}.imageUrl`;
             dispatch(updateState({ path, value:publicUrl }));
           }
         }
       } catch (err) {
         console.error(err);
       }
     }
   };
  const handleOnSetIframe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const path = `${prevPath}.iframe`;
    dispatch(updateState({ path, value }));
  };
  return (
    <div className="option-container">
      <InputComponent
        type="text"
        onChange={handleOnSetTitle}
        placeholder="Text"
        backgroundColor="black"
        className="question-input-container"
      />
      {/* <InputComponent
        type="text"
        onChange={handleOnSetImageUrl}
        placeholder="image URL"
        backgroundColor="black"
        className="question-input-container"
      /> */}
      <UploadImage onChange={handleOnImageClick} text="upload image" className="upload-image-wrapper"/>
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
