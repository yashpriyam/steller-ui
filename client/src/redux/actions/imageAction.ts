import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { CREATE_IMAGE_PUBLIC_URL } from "../../graphql/mutation/createImagePublicUrl/createImagePublicUrl";
export const createImageePublicUrl = async (url:string) => {
  const response = await apolloClient.mutate({
    mutation: CREATE_IMAGE_PUBLIC_URL,  
      variables: {
          url: url
    },
  });
  return response.data.createImagePublicUrl;
};
