import { gql } from "@apollo/client";

export const UPLOAD_PROFILE_IMAGE = gql`
    mutation updateProfilePicture($image: String, $size: Int, $name: String) {
        updateProfilePicture(image: $image, size: $size, name: $name) {
            response {
                status
                message
            }
            profileImage {
                publicId
                secureUrl
            }
        }
    }
`