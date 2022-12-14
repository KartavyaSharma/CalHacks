import { nanoid } from 'nanoid';
import { IObservation, ObservationModel} from '../models/db/observation/observation';
import FoodLog from './foodlog';
export default class Observation {

    private _id: string;
    private _userId: string;
    private _timestamp: Date;
    private _foodLogId: string;
    private _intensity: number;
    private _symptoms: string[];

    public get id(): string {
        return this._id;
    }

    public get userId(): string {
        return this._userId;
    }

    public get timestamp(): Date {
        return this._timestamp;
    }

    public get foodLogId(): string {
        return this._foodLogId;
    }

    public get intensity(): number {
        return this._intensity;
    }

    public get symptoms(): string[] {
        return this._symptoms;
    }

    constructor(observationObj: IObservation) {
        this._id = observationObj._id;
        this._userId = observationObj.userId;
        this._timestamp = observationObj.timestamp;
        this._foodLogId = observationObj.foodLogId;
        this._intensity = observationObj.intensity;
        this._symptoms = observationObj.symptoms;
    }

    public async create(): Promise<IObservation> {
        const mostRecentId: string = await FoodLog.getMostRecentFoodLoId();
        const newObservation: IObservation = {
            _id: nanoid(),
            userId: this._userId,
            timestamp: new Date(),
            foodLogId: mostRecentId,
            intensity: this._intensity,
            symptoms: this._symptoms
        }
        const created = await ObservationModel.create(newObservation);
        return newObservation;
    }

    public async getObservation(): Promise<IObservation> {
        const observation: IObservation = await ObservationModel.findOne({ _id: this._id });
        return observation;
    }

    public static async getAllObservations(): Promise<IObservation[]> {
        const observations: IObservation[] = await ObservationModel.find({});
        return observations;
    }
}