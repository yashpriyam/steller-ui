import { Schema, model } from "mongoose";
const topicSchema = new Schema<TopicSchemaType>({
  topic: String,
  subTopics: [{ title: String }],
});

export const TopicModel = model<TopicSchemaType>(
  "topic",
  topicSchema
);
