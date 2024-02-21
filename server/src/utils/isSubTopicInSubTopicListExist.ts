export const isSubTopicInSubTopicListExist = ({
  subTopic,
  subTopicList,
}: {subTopic:string,subTopicList:SubTopicType[]}) => {
  for (let i = 0; i < subTopicList.length; i++) {
    // Check if the title of the current provided subtopic matches with any subtopic in the database
    if (subTopic === subTopicList[i].title) {
      // If match found, set flag to true and exit loop
      return true;
    }
  }
  return false;
};
