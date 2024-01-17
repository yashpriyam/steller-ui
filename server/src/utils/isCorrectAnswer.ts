function isCorrectAnswer(
    response: QuestionResponseType[],
    answer: QuestionResponseType[]
) 
{
 
    const hasMatch = answer.length === response.length &&  answer.every((answerItem) =>
      response.some(
        (responseItem) =>
         (answerItem.text && answerItem.text === responseItem.text) ||
          (answerItem.imageUrl && answerItem.imageUrl === responseItem.imageUrl) ||
          (answerItem.iframe&&answerItem.iframe===responseItem.iframe)
      )
  );
  
  
    return hasMatch;
}

export default isCorrectAnswer;