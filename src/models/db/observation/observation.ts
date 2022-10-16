import { model, Model, Schema } from 'mongoose';

export interface IObservation {
    _id?: string;
    userId: string;
    timestamp?: Date;
    foodLogId?: string;
    intensity: number;
    symptoms: string[];
}

const IObservationSchema = new Schema<IObservation>(
    {
        _id: { type: String, required: true },
        userId: { type: String, required: true },
        timestamp: { type: Date, required: true },
        foodLogId: { type: String, required: true },
        intensity: { type: Number, required: true },
        symptoms: { type: [String], required: true },
    },
    { collection: 'observation', timestamps: true }
);
export const ObservationModel: Model<IObservation> = model('observations', IObservationSchema);