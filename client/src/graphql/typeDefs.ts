import { gql } from "@apollo/client";

const typeDefs = gql`
    type Query {
        allItems: allBillingItemsData
     }

    type Mutation {
        login: String
    }

    scalar DateTime
    scalar JSON
`;

export default typeDefs;