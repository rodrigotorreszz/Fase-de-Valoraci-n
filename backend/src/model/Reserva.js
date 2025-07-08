

import { Schema, model } from "mongoose";

const reservaSchema = new Schema(
  {
    clentid: {
        type: Schema.Types.ObjectId,
        ref: "cliente", 
        required: true,
      },
  vehicle: {
      type: String,
      require: true,
    },
    service: {
      type: Date,
      require: true,
    },
    status: {
        type: String,
        required: true,
      }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("reserva", reservaSchema);

