import mongoose, { Document, Schema } from "mongoose";

export interface IForm extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const formSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Form = mongoose.models.Form || mongoose.model<IForm>("Form", formSchema);

export default Form;
