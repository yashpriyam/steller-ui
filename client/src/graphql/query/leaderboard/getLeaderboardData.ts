import { gql } from "@apollo/client";


export const GET_LEADERBOARD_DATA = gql`
query {
    getLeaderBoardData {
        user {
            _id
            name
            email
            profileImage {
                secureUrl
            }
        }
        rank
        totalSubmissions
    }
}
`