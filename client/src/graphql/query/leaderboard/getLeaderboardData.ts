import { gql } from "@apollo/client";


export const GET_LEADERBOARD_DATA = gql`
query {
    getLeaderBoardData {
        user {
            name
            profileImage {
                secureUrl
            }
        }
        
        rank
        totalSubmissions

    }
}
`