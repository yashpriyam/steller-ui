import { gql } from "apollo-server-express";

export const CreateNotesInputType = gql`
  input CreateNotesInputType {
    link: String!
    title: String!
    dayNumber: Int!
    topics: [String]!
    noOfPages: Int
    description: String
    estimatedReadingTime: String
  }
`;
const NotesDataType = gql`
  type NotesDataType {
    id: String!
    link: String!
    title: String!
    dayNumber: Int!
    topics: [String]!
    noOfPages: Int
    description: String 
    estimatedReadingTime: String
  }
`;

 const CustomResponseType = gql`
  type CustomResponseType {
    status: Int
    message: String
  }
`;
export const CreateNotesOutputType = gql`
  type CreateNotesOutputType {
    notesData: NotesDataType
    response: CustomResponseType
  }
  ${NotesDataType}
  ${CustomResponseType}
`;

