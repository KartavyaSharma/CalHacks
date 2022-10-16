import { NextFunction, Request, Response } from 'express';
import { Routes } from '../routes';

export default class FoodLogRoutes extends Routes {

    protected static readonly BASE = "/foodlog";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        this._routes.post('/create', async (req: Request, res: Response, next: NextFunction) => {

        });
    }

}
