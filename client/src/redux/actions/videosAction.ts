import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectVideos } from "../slices/videos/videosSlice";
import { GET_VIDEOS } from "../../graphql/query/videos/getAllVideos";
export const useVideos = () => {
    const dispatch = useDispatch();
    const videoData = useSelector(selectVideos);

    const getAllVideos = async ({
        title,
        description,
        dayNumber,
        videoNumber,
        topics,
        links,
        isActive,
        duration,
    }: VideoDataType) => {
        const response = await apolloClient.query({
            query: GET_VIDEOS,
            variables: {
                videoDataFilter: {
                    title,
                    description,
                    dayNumber,
                    videoNumber,
                    topics,
                    links,
                    isActive,
                    duration,
                },
            },
        });
        dispatch(actions.setVideos(response.data.getAllVideos));
        return response;
    };


    return { videoData, getAllVideos };
};