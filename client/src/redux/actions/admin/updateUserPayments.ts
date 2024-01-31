import { useDispatch } from "react-redux";
import { apolloClient } from "../../../graphql/apolloClient/apolloClient";
import { UPDATE_USER_PAYMENT } from "../../../graphql/mutation/admin/updateUserPayment";


export const useAdmin = () => {
    const dispatch = useDispatch();
  
    const updateUserPayment = async (batchCode: string) => {
      try {
        const response = await apolloClient.mutate({
          mutation: UPDATE_USER_PAYMENT,
          variables: {
            batchCode,
          },
        });
        return response;
      } catch (err) {
        console.error(err);
      }
    };
  
    return {
        updateUserPayment,
    };
  };