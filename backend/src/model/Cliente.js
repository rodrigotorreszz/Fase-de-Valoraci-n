import { Schema, model } from "mongoose";

const ClienteSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },

    age: {
      type: Number,
      min: 18,
      max: 100,
      require: true
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clientes", ClienteSchema);
