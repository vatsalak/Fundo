import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface'; // Import IUser interface

// Define the schema
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Virtual property for `name` (combines `firstName` and `lastName`)
UserSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are included when converting to JSON
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Create the model
const User = mongoose.model<IUser>('User', UserSchema); // Use IUser directly here
export default User;
