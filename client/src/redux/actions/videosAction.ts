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
        weekNumber,
        videoNumber,
        topics,
        links,
        isActive,
        duration,
    }: VideoDataType) => {
        try {
        dispatch(actions.setIsLoading(true))
        const response = await apolloClient.query({
            query: GET_VIDEOS,
            variables: {
                videoDataFilter: {
                    title,
                    description,
                    weekNumber,
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
    } catch (error) {
       console.error(error);
    } finally {
        dispatch(actions.setIsLoading(false));
    }
    };


    return { videoData, getAllVideos };
};