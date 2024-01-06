
interface QuestionResponseType {
    text: string;
    imageUrl: string;
  }
  
  function isCorrectAnswer(
    response: QuestionResponseType[],
    question: QuestionResponseType[]
  ) {
    const hasMatch = response.some((responseItem) =>
      question.some(
        (questionItem) =>
          responseItem.text === questionItem.text ||
          responseItem.imageUrl === questionItem.imageUrl
      )
    );
  
    return hasMatch;
  }

  export default isCorrectAnswer;