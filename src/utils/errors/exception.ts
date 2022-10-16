import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "./error_codes";
import { IErrorModel } from "../../models/server_models";

/**
 * The exception class. Chooses correct error from the
 * ErrorCodes class and returns the right exception to the
 * server.
 */

export class Exception extends Error {

    /**
     * Initializes new Exception instance.
     * @param error contains the status and code details for the error.
     * @param meta is an helpful error description.
     */
    constructor(error: IErrorModel = ErrorCode.UnknownError, meta = "No description.") {
        super(error.code);
        this.name = error.code;
        this.status = error.status;
        this.meta = meta;
        Object.setPrototypeOf(this, Exception.prototype);
    }

    /**
     * Intercepts all errors created in the server. If something is not an error,
     * returns the UnknownError code 500.
     * @param err Actual error object initiated when the Exception was thrown.
     * @param req Request object parameter from the caller, is passed onto Next.
     * @param res Response object parameter from the caller, is passed onto Next.
     * @param next Next function in the middlware call stack.
     */
    public static handler(err: Error, req: Request, res: Response, next: NextFunction) {
        const errorOutput: string[] = [
            "Error handler called", '\n',
            `Path: ${req.path}`, '\n',
            `Error occured: ${err.message}`, '\n',
        ]
        console.log(errorOutput.join(""));
        if (err instanceof Exception) {
            console.log(`Error is known.\nMeta: ${err.meta}`)
            res.status(err.status).send({ error: err });
        } else {
            /** For unhandled errors in system. */
            res.status(ErrorCode.UnknownError.status).send(ErrorCode.UnknownError as IErrorModel);
        }
    }

    /** Status of the error thrown. */
    private status: number;

    /** String of data associated with the error. */
    private meta: string;
}