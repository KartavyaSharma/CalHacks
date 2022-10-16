import { Express, RequestHandler, Response } from "express";
import { Routes } from '../routes/routes'
import { Success } from "./success/success";
import { ISuccessModel } from "../models/server_models";

/**
 * Utils containing frequently used methods.
 */

export class Utils {

    /** 
     * Enum definitions. Enums are only being simulated in Utils since TypeScript does
     * not support object enum values.
     * */
    static readonly EMPTY_OBJECT = new Utils("EMPTY", {});

    /** 
     * Constructor used to make new enums for objects.
     * @param key the name of the enum entry.
     * @param value the value associated with the enum entry.
     */
    constructor(private readonly key: string, public readonly value: any) {}

    /**
     * Adds a new Router middleware for given server instance with a
     * Route class BASE property.
     * @param expressApp instance of the current server.
     * @param routerClass instance of the particular router being used.
     * @param middleware collection of middleware to be used before req is forwarded to the router.
     */
    public static addRoute(expressApp: Express, routerClass: Routes, ...middleware: RequestHandler[]): void {
        expressApp.use(routerClass.base, ...middleware, routerClass.router);
    }

    /** 
     * Sends res object to the client.
     * @param resObj response object from api route sending the response.
     * @param payloadObj object requested by the client.
     */
    public static sendRes<ResponseType>(resObj: Response, payloadObj: ResponseType): void {
        resObj.send({ code: Success.code, payload: payloadObj } as ISuccessModel<ResponseType>);
    }

    /**
     * Class decorator used to implement static methods in classes.
     */
    public static staticImplements<T>() {
        return <U extends T>(constructor: U) => {constructor};
    } 
}