import express, { Express } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { Utils } from './utils/server_utils'
import bodyParser from 'body-parser';
import Db from './utils/db/db';
import AuthRoutes from './routes/auth/auth_routes';
import { Exception } from './utils/errors/exception'
import { Auth } from './auth/auth_engine';
import config from 'config';
import morgan from 'morgan';
import cors from 'cors';
import User from './user/user';
import FoodLogRoutes from './routes/controllers/foodlog';
import ObservationRoutes from './routes/controllers/observation';
import DataProcessingRoutes from './routes/controllers/max_food';

export default class App {

    constructor() {
        this._server = express();
    }

    async initialize(): Promise<void> {
        await this.setup();
        this.routes();
        this.middleware();
    }

    async setup(): Promise<void> {
        dotenv.config();
        await this.setupDb();
        this._server.use(cors());
        this._server.use(express.json());
        this._server.use(helmet());
        this._server.use(bodyParser.json());
    }

    async setupDb(): Promise<void> {
        // Connects to the database
        const newDb = new Db();
        await newDb.connect(config.get('database'));
        this._db = newDb;
    }

    routes(): void {
        Utils.addRoute(this._server, new AuthRoutes());
        Utils.addRoute(this._server, new FoodLogRoutes(), Auth.authMid, User.setUser);
        Utils.addRoute(this._server, new ObservationRoutes(), Auth.authMid, User.setUser);
        Utils.addRoute(this._server, new DataProcessingRoutes(), Auth.authMid, User.setUser);
    }

    middleware(): void {
        /** Standard middleware */
        this._server.use(morgan('combined'));
        this._server.use(express.urlencoded({ extended: true }))
        this._server.use(Exception.handler);
    }

    get server(): Express {
        return this._server;
    }

    private _server: Express;

    private _db: Db; 
}