import { NextFunction, Request, Response } from 'express';
import { Routes } from '../routes';
import User from '../../user/user';
import { IObservation } from '../../models/db/observation/observation';
import Observation from '../../controllers/observation';
import { Utils } from '../../utils/server_utils';

export default class ObservationRoutes extends Routes {

    protected static readonly BASE = "/observation";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        this._routes.post('/create', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let observations: IObservation;
            try {
                newUser = new User(User.extractUser(req));
                req.body.observation.userId = newUser.id;
                const newObservation: Observation = new Observation(req.body.observation);
                observations = await newObservation.create();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<{ observation: IObservation }>(res, { observation: observations });
        });

        this._routes.get('/get', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let observation: IObservation;
            try {
                newUser = new User(User.extractUser(req));
                req.body.observation.userId = newUser.id;
                let findObservation = new Observation(req.body.observation);
                observation = await findObservation.getObservation();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<{ observation: IObservation }>(res, { observation: observation });
        })
    }
}