import { model, Model, Schema } from 'mongoose';

export interface IUser {
    _id?: string;
    firstName?: string;
    phone: number;
    password?: string;
    height?: number;
    weight?: number;
    gender?: string;
    age?: number;
}

const IUserSchema = new Schema<IUser>(
    {
        _id: { type: String, required: true },
        firstName: { type: String, required: true },
        phone: { type: Number, required: true },
        password: { type: String, required: true },
        height: { type: Number, required: false },
        weight: { type: Number, required: false },
        gender: { type: String, required: false },
        age: { type: Number, required: false },
    },
    { collection: 'users', timestamps: true }
);

export const UserModel: Model<IUser> = model('user', IUserSchema);