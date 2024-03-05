import { Schema, model } from "mongoose";

const tagsSchema = new Schema<TagsSchemaType>({
    tagName: {
        type: String,
    },
    tagKey: {
        type: String,
    },
    tagType: {
        type: String,
    },
    childrenTags: [
        {
            title: String,
            tagType: String,
            tagKey: String,
            parentTagKey: String,
            parentTagType: String,
        },
    ],
})

export const tagsModel = model<TagsSchemaType>(
    "tags",
    tagsSchema
);