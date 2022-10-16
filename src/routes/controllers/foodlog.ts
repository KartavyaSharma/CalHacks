import { NextFunction, Request, Response } from 'express';
import { Routes } from '../routes';
import User from '../../user/user';
import { IFoodLog } from '../../models/db/foodlog/foodlog';
import { Utils } from '../../utils/server_utils';
import FoodLog from '../../controllers/foodlog';

export default class FoodLogRoutes extends Routes {

    protected static readonly BASE = "/foodlog";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        this._routes.post('/create', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let foodLog: IFoodLog;
            try {
                newUser = new User(User.extractUser(req));
                req.body.foodLog.userId = newUser.id;
                const newFood: FoodLog = new FoodLog(req.body.foodLog);
                foodLog = await newFood.create();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<{ foodLog: IFoodLog }>(res, { foodLog: foodLog });
        });

        this._routes.get('/get', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let foodLog: IFoodLog;
            try {
                newUser = new User(User.extractUser(req));
                req.body.foodLog.userId = newUser.id;
                let findFoodLog = new FoodLog(req.body.foodLog);
                foodLog = await findFoodLog.getFoodLog();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<{ foodLog: IFoodLog }>(res, { foodLog: foodLog });
        })
    }

}
