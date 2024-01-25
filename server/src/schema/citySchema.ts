import { Schema, model } from "mongoose";
const citySchema = new Schema<{ cities: [string] }>({
    cities: {
        type: [String],
    },
});

const cityModel = model("cities", citySchema);

export { cityModel };