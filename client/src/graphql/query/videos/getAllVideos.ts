import { gql } from "@apollo/client";

export const GET_VIDEOS = gql`
    query GetAllVideos($videoDataFilter: VideoInputFilterType) {
        getAllVideos(videoDataFilter: $videoDataFilter) {
            videoData {
                batchCode
                createdAt
                dayNumber
                description
                videoNumber
                updatedAt
                weekNumber
                topics
                title
                isActive
                duration
                links {
                  youtube
                  webmasters
                }
              }
            response {
                status
                message
            }
        }
    }
`;