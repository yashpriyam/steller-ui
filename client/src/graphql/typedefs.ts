import { gql } from "@apollo/client";

const typeDefs = gql`
  type Query {
    getAllVideos(videoDataFilter: VideoInputFilterType): AllVideoOutputDataType
  }

  type Mutation {
    registerUser(data: RegistrationInputType!): RegistrationOutputDataType
  }
  
  type CustomResponseType {
    status: Int!
    message: String!
  }

  input RegistrationInputType {
    name: String!
    email: String!
    phoneNumber: String!
    isJobSeeker: Boolean!
    occupation: String!
    sessionPreference: SessionPreferenceEnum!
    expectedSalary: String!
  }

  type RegistrationOutputDataType {
    name: String!
    email: String!
    phoneNumber: String!
    isJobSeeker: Boolean!
    occupation: String!
    sessionPreference: SessionPreferenceEnum!
    expectedSalary: String!
  }

  input VideoInputFilterType {
    title: String
    description: String
    dayNumber: Int
    videoNumber: Int
    topics: [String]
    links: OptionalLinksInput
    isActive: Boolean
    duration: String
  }

  input OptionalLinksInput{
    webmasters: String
    youtube: String
  }

  type AllVideoOutputDataType {
    videoData: [videoDataType]
    response: CustomResponseType!
  }
  type videoDataType {
    title: String
    description: String
    dayNumber: Int
    videoNumber: Int
    topics: [String]
    links: Links
    isActive: Boolean
    duration: String
    createdAt: String
    updatedAt: String
  }

  type Links {
    webmasters: String
    youtube: String
  }
  
  scalar DateTime
  scalar JSON
`;

export default typeDefs;