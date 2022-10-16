import { Utils } from "../../utils/server_utils";
import { Routes } from "../routes";
import Processing from "../../processing/data_processing";

export default class DataProcessingRoutes extends Routes {

    protected static readonly BASE = "/data_processing";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        this._routes.get('/', async (req, res, next) => {
            const newProcessing: Processing = new Processing();
            let max_food: string = await newProcessing.cleanup();
            Utils.sendRes<{ max_food: string }>(res, { max_food: max_food });
        });
    }

}