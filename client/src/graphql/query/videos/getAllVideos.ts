import { gql } from "@apollo/client";

export const GET_VIDEOS = gql`
    query GetAllVideos($videoDataFilter: VideoInputFilterType) {
        getAllVideos(videoDataFilter: $videoDataFilter) {
            videoData {
                title
                description
                dayNumber
                videoNumber
                topics
                links {
                    webmasters
                    youtube
                }
                isActive
                duration
                createdAt
                updatedAt
            }
            response {
                status
                message
            }
        }
    }
`;