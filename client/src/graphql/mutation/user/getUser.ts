import { gql } from "@apollo/client";

export const GET_USER = gql`
query {
    getUser {
      userData {
        email
        name
        phoneNumber
        password
        isJobSeeker
        occupation
        sessionPreference
        expectedSalary
        IST
        collegeName
        location
        courseYear
        course
        branch
        batchCode
        feePlan
        profileImage {
          publicId
          secureUrl
        }
      }
      response {
        message
        status
      }
      isAdmin
      isPaidUser {
        isPaidUser
        accessWeeks
      }
    }
  }
`;
