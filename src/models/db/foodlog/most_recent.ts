import { model, Model, Schema } from 'mongoose';

export interface IMostRecent {
    _id: string;
    _mostRecentFoodLogId: string;
}

const IMostRecentSchema = new Schema<IMostRecent>(
    {
        _id: { type: String, required: true },
        _mostRecentFoodLogId: { type: String, required: true }
    },
    { collection: 'most_recent', timestamps: true }
);

export const MostRecentModel: Model<IMostRecent> = model('most_recent', IMostRecentSchema);