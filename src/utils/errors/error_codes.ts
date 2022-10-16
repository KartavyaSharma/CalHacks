import { IErrorModel } from "../../models/server_models";

/**
 * Class contains all the error codes supported by this
 * server. New error codes will be added to this class
 * as requried.
 */

export class ErrorCode {

    /**
     * Default error code for commonplace error other
     * than conventional server side error.
     */
    public static readonly defStatus: number = 400;

    /** ================== Add new errors below ================== */

    public static readonly Unauthenticated: IErrorModel = {
        code: 'Unauthenticated',
        status: 401,
    };
    public static readonly NotFound: IErrorModel = {
        code: 'NotFound',
        status: 404,
    };
    public static readonly AsyncError: IErrorModel = {
        code: 'AsyncError',
        status: ErrorCode.defStatus,
    };
    public static readonly ValidationError: IErrorModel = {
        code: 'ValidationError',
        status: ErrorCode.defStatus,
    }
    /** =========================================================== */

    /** 
     * Do not modify/delete this error declaration,
     * this will be used in case the error encountered does not
     * fit into any of the above categories.
     */
     public static readonly UnknownError: IErrorModel = {
        code: "UnknownError",
        status: 500,
    }
}