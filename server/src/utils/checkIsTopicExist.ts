import { topicModel } from "@models";
export const checkIsTopicExist = async ({
  topic,
  subTopics,
}: TopicSchemaType): Promise<boolean> => {
  try {
    const topicDetails = await topicModel.findOne({ topic });
    if(!topicDetails) return false;
    const subTopicList = topicDetails?.subTopics;
    if (subTopicList && subTopicList.length < subTopics?.length) return false;
    if (subTopics?.length && subTopicList?.length) {
      for (let i = 0; i < subTopics.length; i++) {
        let isTitleMatches = false;
        for (let j = 0; j < subTopicList.length; j++) {
          if (subTopics[i].title === subTopicList[j].title) {
            isTitleMatches = true;
            break;
          }
        }
        if (!isTitleMatches) return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};
