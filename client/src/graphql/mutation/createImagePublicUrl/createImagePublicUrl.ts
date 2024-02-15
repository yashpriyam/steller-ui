import { gql } from "@apollo/client";

export const CREATE_IMAGE_PUBLIC_URL = gql`
  mutation CreateImagePublicUrl($url: String!) {
    createImagePublicUrl(url: $url) {
      publicUrl
      response {
        message
        status
      }
    }
  }
`;