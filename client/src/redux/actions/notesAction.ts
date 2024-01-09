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
        topics,
        noOfPages,
        description,
        estimatedReadingTime,
    }: NotesFilterDataType) => {
        const response = await apolloClient.query({
            query: GET_NOTES,
            variables: {
                filterData: {
                    link,
                    title,
                    dayNumber,
                    topics,
                    noOfPages,
                    description,
                    estimatedReadingTime,
                },
            },
        });  
        dispatch(actions.setVideos(response.data.getAllNotes));
        return response;
    };


    return { noteData, getAllNotes };
};