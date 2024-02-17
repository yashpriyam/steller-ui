export const validateQuestionInput = ({
  marks,
  meta,
  title,
  answer,
  options,
  questionType,
}: CreateQuestionInterface): boolean => {
  if (!Boolean(questionType) || !Boolean(marks)) return false;
  if (meta) {
    const keys = Object.keys(meta);
    for (const key of keys) {
      if (
        meta[key as keyof QuestionMetaDataType] === null ||
        meta[key as keyof QuestionMetaDataType] === undefined ||
        meta[key as keyof QuestionMetaDataType] === ""
      ) {
        return false;
      }
    }
    }    
  if (title.length === 0) return false;
  if (answer.length === 0) return false;
  if (options.length === 0) return false;
    for (let i = 0; i < title.length; i++) {
      if (!title[i].text) {        
      return false;
    }
  }
  for (let i = 0; i < answer.length; i++) {
    if (!answer[i].text) {
      return false;
    }
  }
  for (let i = 0; i < options.length; i++) {
    if (!options[i].text) {
      return false;
    }
  }
  return true;
};
