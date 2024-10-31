import mongoose, { Schema, Document } from "mongoose";
import { ICity } from "./City";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image: string;
  favoriteCities: ICity[]; // Reference to City model
  emailVerified?: boolean;
  token?: string | null;
  tokenExpiry?: Date | null;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  favoriteCities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
  emailVerified: { type: Boolean, default: false },
  token: { type: String, default: null },
  tokenExpiry: { type: Date, default: null },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
