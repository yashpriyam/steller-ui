import { Schema, model } from "mongoose";

const questionTypes = {
  multi: "multi",
  single: "single",
  fillup: "fillup",
  codeblock: "codeblock"
};
const questionDurationTypes = {
  timed: "timed",
  recorded: "recorded",
};
const codeEditorWindowTypes = {
  HTML: "HTML",
  CSS: "CSS",
  JS: "JS",
};
const questionSchema = new Schema<QuestionSchemaType>({
  title: {
    type: [{ imageUrl: String, text: String, iframe: String, codeBlock: {
      enableCodeBlock: Boolean,
      configuration: {
        showOutputWindow: Boolean,
        showSplitWindow: Boolean,
        openWindows: [{
          title: {
            type: String,
            enum: codeEditorWindowTypes
          },
          isEditable: Boolean,
          enableUserSelection: Boolean,
          predefinedCode: String
        }]
      }
    } }],
  },
  options: {
    type: [{ imageUrl: String, text: String, iframe: String, codeBlock: {
      enableCodeBlock: Boolean,
      configuration: {
        showOutputWindow: Boolean,
        showSplitWindow: Boolean,
        openWindows: [{
          title: {
            type: String,
            enum: codeEditorWindowTypes
          },
          isEditable: Boolean,
          enableUserSelection: Boolean,
          predefinedCode: String
        }]
      }
    } }],
  },
  questionType: {
    type: String,
    enum: questionTypes,
  },
  questionTypeTags: {
    type:[String]
  },
  questionSubTopics: {
    type:[{title:String}]
  },
  answer: {
    type: [{ imageUrl: String, text: String, iframe: String }],
  },
  marks: { type: Number, default: 1 },
  meta: {
    topic: { type: String},
    batchCode: { type: String},
    week: { type: Number},
    day: { type: Number},
    isActive: { type: Boolean},
    isArchived: { type: Boolean},
    type: {
      type: String,
      enum: questionDurationTypes,
    },
    expiresInMins: { type: Number},
    isOpenable: { type: Boolean},
  },
});

export const questionModel = model<QuestionSchemaType>(
  "question",
  questionSchema
);
