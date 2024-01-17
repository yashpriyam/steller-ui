export const getCheckedOptions = (
  response: QuestionInfoType[],
  options?: QuestionInfoType[]
) => {
  const updatedResponse = options?.map((option) => {
    let updatedOption = { ...option };
    response.map((responseData) => {
      if (
        (option.text && option.text === responseData.text) ||
        (option.imageUrl && option.imageUrl === responseData.imageUrl) ||
        (option.iframe && option.iframe === responseData.iframe)
      ) {
        updatedOption.isChecked = true;
      }
    });
    return updatedOption;
  });
  return updatedResponse;
};
