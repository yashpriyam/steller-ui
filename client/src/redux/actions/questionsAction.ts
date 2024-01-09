import { useDispatch, useSelector } from "react-redux"
import { actions, selectQuestions } from "../slices/questions/questionsSlice";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { GET_QUESTIONS } from "../../graphql/query/questions/getAllQuestions";

export const useQuestions = () => {
    const dispatch = useDispatch();
    const questionData = useSelector(selectQuestions);

    const getAllQuestions = async ({
        topic,
        type,
        isArchived,
        isActive,
    }: filterInputType) => {
        const response = await apolloClient.query({
            query: GET_QUESTIONS,
            variables: {
                filterData: {
                    topic,
                    type,
                    isArchived,
                    isActive,
                }
            }
        });
        dispatch(actions.setQuestions(response.data.getAllQuestions));
        return response;
    }
    return { questionData, getAllQuestions };
}