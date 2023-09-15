import mongoose from "mongoose";

const user_schema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", user_schema);
