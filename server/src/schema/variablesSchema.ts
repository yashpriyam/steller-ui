import  { Schema, model } from "mongoose";

const variableSchema = new Schema<VariableSchemaType>({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: [String],
    required: true,
  },
});

export const variableModel = model<VariableSchemaType>("Variable", variableSchema);
