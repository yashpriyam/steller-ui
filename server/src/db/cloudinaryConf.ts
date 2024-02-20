import { getCloudinaryCredentials } from "@utils";

const cloudinary = require("cloudinary");

const cloudinaryConfiguration = async () => {
  const val: CloudinaryCrendentialsType | void = await getCloudinaryCredentials();
  if(!val) return console.error("cloudinary crendentials not found")
  cloudinary.config({
    cloud_name: val.cloudinaryCloudName,
    api_key: val.cloudinaryApiKey,
    api_secret: val.cloudinaryApiSecret,
  });
};

export default cloudinaryConfiguration;