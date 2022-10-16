import { nanoid } from "nanoid";
import { IMostRecent } from "../models/db/foodlog/most_recent";
import { MostRecentModel } from "../models/db/foodlog/most_recent";
import { IFoodLog, FoodLogModel } from "../models/db/foodlog/foodlog";

export default class FoodLog {

    private _id: string;
    private _userId: string;
    private _timestamp: Date;
    private _mealType: string[];

    public get id(): string {
        return this._id;
    }

    public get userId(): string {
        return this._userId;
    }

    public get timestamp(): Date {
        return this._timestamp;
    }

    public get mealType(): string[] {
        return this._mealType;
    }

    constructor(foodLogObj: IFoodLog) {
        this._id = foodLogObj._id;
        this._userId = foodLogObj.userId;
        this._timestamp = foodLogObj.timestamp;
        this._mealType = foodLogObj.mealType;
    }

    public async create(): Promise<IFoodLog> {
        const foodLog: IFoodLog = new FoodLogModel({
            _id: nanoid(),
            userId: this._userId,
            timestamp: new Date(),
            mealType: this._mealType
        });
        const created = await FoodLogModel.create(foodLog);
        const mostRecent: IMostRecent = new MostRecentModel({
            _id: nanoid(),
            _mostRecentFoodLogId: created._id
        });
        await MostRecentModel.remove();
        const createRecent = await MostRecentModel.create(mostRecent);
        return foodLog
    }

    public async getFoodLog(): Promise<IFoodLog> {
        const foodLog: IFoodLog = await FoodLogModel.findOne({ _id: this._id });
        return foodLog;
    }

    public static async getFoodLog(foodLogId: string): Promise<IFoodLog> {
        const foodLog: IFoodLog = await FoodLogModel.findOne({ _id: foodLogId });
        return foodLog;
    }

    public static async getMostRecentFoodLoId(): Promise<string> {
        const mostRecent: IMostRecent = await MostRecentModel.findOne();
        return mostRecent._mostRecentFoodLogId;
    }

}