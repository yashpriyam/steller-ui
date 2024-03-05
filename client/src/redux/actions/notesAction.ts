import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { GET_NOTES } from "../../graphql/query/notes/getAllNotes";
import { actions, selectNotes } from "../slices/notes/notesSlice";
export const useNotes = () => {
    const dispatch = useDispatch();
    const noteData = useSelector(selectNotes);

    const getAllNotes = async ({
        link,
        title,
        dayNumber,
        weekNumber,
        topics,
        noOfPages,
        description,
        estimatedReadingTime,
    }: NotesFilterDataType) => {
        try {
        dispatch(actions.setIsNotesLoading(true));
        const response = await apolloClient.query({
            query: GET_NOTES,
            variables: {
                filterData: {
                    link,
                    title,
                    dayNumber,
                    weekNumber,
                    topics,
                    noOfPages,
                    description,
                    estimatedReadingTime,
                },
            },
        });  
        dispatch(actions.setNotes(response.data.getAllNotes));
        return response;
    } catch (err){
        console.error(err);
    } finally {
        dispatch(actions.setIsNotesLoading(false));
    }
    };


    return { noteData, getAllNotes };
};