import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectTag } from "../slices/tags/tagsSlice";
import { GET_ALL_TAGS } from "../../graphql/query/tag/getAllTags";
export const useTag = () => {
    const dispatch = useDispatch();
    const tags = useSelector(selectTag);
    const getAllTags = async () => {
        try {
            const response = await apolloClient.query({
                query: GET_ALL_TAGS,
                variables: {},
            });
            dispatch(actions.setTag(response.data.getAllTags));
            return response;
        } catch (err) {
            console.error(err);
        }
    };


    return { tags, getAllTags };
};