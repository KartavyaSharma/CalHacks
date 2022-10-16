import { NextFunction, Request, Response } from 'express';
import { Routes } from '../routes';
import User from '../../user/user';
import { Auth } from '../../auth/auth_engine';
import { Utils } from '../../utils/server_utils';

/**
 * Class defining authentication routes and associated functions.
 * Client can create a new user (register), and client can log into
 * an existing user.
 * 
 * Calls methods from ../../rmembr/auth/
 */
export default class AuthRoutes extends Routes {

    /** Base URL for all authentication routes. */
    protected static readonly BASE = "/auth";

    /**
     * Initializes routes object from Routes abstract class.
     * New routes can be added using super().routes.[CRUD OP]();
     */
    constructor() {
        super();
    }

    protected createRoutes(): void {
        /**
         * Adds a route for creating a user. Route is at /create-user.
         * Creates a new user in the DB.
         */
        this._routes.post(`/create-user`, async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let token: { token: string };
            try {
                newUser = new User(User.extractUser(req));
                token = await newUser.createUser();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<{ token: string }>(res, { token: token.token });
        });

        /**
        * Adds a route for loggin in an existing user. Route is at /login.
        */
        this._routes.get(`/login`, async (req: Request, res: Response, next: NextFunction) => {
            let loginReq: { phone: number, password: string };
            let user: User;
            try {
                loginReq = req.body;
                user = await Auth.authUser(loginReq.phone, loginReq.password);
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<{ token: string }>(res, { token: Auth.generateToken(user) });
        });
    }
}