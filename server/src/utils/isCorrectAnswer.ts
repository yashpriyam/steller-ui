function isCorrectAnswer(
    response: QuestionResponseType[],
    question: QuestionResponseType[]
) 
{
    const hasMatch = question.every((questionItem) =>
      response.some(
        (responseItem) =>
          questionItem.text === responseItem.text &&
          questionItem.imageUrl === responseItem.imageUrl
      )
    );
  
    return hasMatch;
}

export default isCorrectAnswer;