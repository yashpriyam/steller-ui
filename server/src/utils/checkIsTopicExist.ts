import { topicModel } from "@models";
import { isSubTopicInSubTopicListExist } from "./isSubTopicInSubTopicListExist";
export const checkIsTopicExist = async ({
  topic,
  subTopics,
}: TopicSchemaType): Promise<boolean> => {
  try {
    // Find the topic details in the database
    const topicDetails = await topicModel.findOne({ topic });

    // If no topic found, return false
    if (!topicDetails) return false;

    // Extract subtopic list from topic details
    const subTopicList = topicDetails?.subTopics;

    // If the number of subtopics in the database is less than the provided subtopics, return false
    if (subTopicList && subTopicList.length < subTopics?.length) return false;

    // If both provided and database subtopics exist, compare their titles
    if (subTopics?.length && subTopicList?.length) {

      // Iterate over each provided subtopic
      for (let i = 0; i < subTopics.length; i++) {
        const isTitleMatches = isSubTopicInSubTopicListExist({
          subTopic: subTopics[i].title,
          subTopicList: subTopicList,
        });

        // If title match not found for any provided subtopic, return false
        if (!isTitleMatches) return false;
      }
    }
    // All checks passed, return true
    return true;
  } catch (error) {
    // Return false in case of any error
    return false;
  }
};
