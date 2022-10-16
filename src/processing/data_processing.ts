import { IObservation } from "../models/db/observation/observation";
import Observation from "../controllers/observation";
import { IFoodLog } from "../models/db/foodlog/foodlog";
import FoodLog from "../controllers/foodlog";

export default class Processing {
    private _totals: { [key: string]: number };
    private _frequency: { [key: string]: number };

    constructor() {
        this._totals = {};
        this._frequency = {};
    }

    async cleanup() {
        let max: number = 0;
        const threshold: number = 7;
        let max_food: string = "";
        const allObservations: IObservation[] = await Observation.getAllObservations();
        allObservations.forEach(async observation => {
            if (observation.intensity < threshold) {
                const currFoodLog: IFoodLog = await FoodLog.getFoodLog(observation.foodLogId);
                currFoodLog.mealType.forEach(food => {
                    if (food in this._totals) {
                        this._totals[food] += observation.intensity;
                        this._frequency[food] += 1;
                    } else {
                        this._totals[food] = observation.intensity;
                        this._frequency[food] = 1;
                    }
                });
            }
        });
        for (const [key, value] of Object.entries(this._totals)) {
            if (this._totals.key/this._frequency.key > max) {
                max_food = key;
                max = this._totals.key/this._frequency.key;
            }
        }
        return max_food;
    }
}