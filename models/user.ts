import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  highScore: number;
}

const UserSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true },
  highScore: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', UserSchema);
