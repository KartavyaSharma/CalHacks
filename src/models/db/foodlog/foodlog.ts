import { model, Model, Schema } from 'mongoose';

export interface IFoodLog {
    _id: string;
    userId: string;
    timestamp: Date;
    mealType: string[];
}

const IFoodLogSchema = new Schema<IFoodLog>(
    {
        _id: { type: String, required: true },
        userId: { type: String, required: true },
        timestamp: { type: Date, required: true },
        mealType: { type: [String], required: true },
    },
    { collection: 'foodlog', timestamps: true }
);

export const FoodLogModel: Model<IFoodLog> = model('foodlog', IFoodLogSchema);