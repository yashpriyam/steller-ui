import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectBatch } from "../slices/batch/batchSlice";
import { GET_BATCH_CODE } from "../../graphql/query/batch/getBatchCode";
export const useBatch = () => {
    const dispatch = useDispatch();
    const batchData = useSelector(selectBatch);

    const getBatchCode= async () => {
        try {
            const response = await apolloClient.query({
                query: GET_BATCH_CODE,
                variables: {},
            });
            dispatch(actions.setBatchCode(response.data.getBatchCode));
            return response;
        } catch (err) {
            console.error(err);
        }
    };


    return { batchData, getBatchCode };
};