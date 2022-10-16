import { Router } from "express";
import bodyParser from "body-parser";

export abstract class Routes {

    protected _routes: Router;

    protected urlencodedParser = bodyParser.urlencoded({ extended: false });

    protected static BASE: string;

    constructor() {
        this._routes = Router({ mergeParams: true });
        this.createRoutes();
    }

    protected abstract createRoutes(): void;

    public get base(): string {
        return (this.constructor as typeof Routes).BASE;
    }

    public get router(): Router {
        return this._routes;
    }

    protected nestRoutes(nestRoutes: Routes, morePath = ""): void {
        this._routes.use(
            `${morePath != "" ? `/${morePath}` : ""}${nestRoutes.base}`,
            nestRoutes.router
        );
    }

}