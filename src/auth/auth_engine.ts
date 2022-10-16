import { Request, Response, NextFunction } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { IUser } from '../models/db/user/user';
import { Exception } from '../utils/errors/exception';
import { ErrorCode } from '../utils/errors/error_codes';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../user/user';

/**
 * Class contains all the methods used to initiate new user creation
 * and authenticaiton of existing users. New user creation is handled
 * by the ../user.ts module.
 */
export class Auth {

    static readonly saltRounds: number = 10;
    
    /**
     * Returns the hash for a password using the bcrypt library.
     * @param password input password for hash.
     * @return the hash for the password the user has enetered.
     */
    public static generateHash(password: string): string {
        const hashed: string = hashSync(password, Auth.saltRounds);
        return hashed;
    }

    /**
     * Authenticates user based on their email ID. Compares hash
     * of input password with that of stored in the DB.
     * @param email user identifier to retrieve hash.
     * @param password from login form input field.
     * @return a Promise containing a boolean value for if the password is correct.
     */
    public static async authUser(phone: number, password: string): Promise<User> {
        const user: User = await User.getUser(phone);
        if (!compareSync(password, user.password)) {
            throw new Exception(ErrorCode.Unauthenticated, "Incorrect Password.");
        }
        return user;
    }

    /**
     * Generates and returns a JWT authentication token that is formed usin
     * a User's id, and email.
     * @param user for which this token is being generated.
     * @return JWT token to pass with each request to the API.
     */
    public static generateToken(user: User): string {
        const token = jwt.sign({_id: user.id, email: user.phone}, config.get('token.secret'), {
            expiresIn: config.get('token.expiresIn')
        });
        return token;
    }

    /**
     * Verifies an existing JWT authentication token. 
     */
    public static verifyToken(token: string): IUser {
        try {
            const tokenData = jwt.verify(token, config.get('token.secret'));
            return tokenData as {_id: string, phone: number};
        } catch (error) {
            throw new Exception(ErrorCode.Unauthenticated, "Request does not contain token, or an incorect one.");
        }
    }

    /** Middleware that handles authentication on each REST API call. */
    public static authMid(req: Request, res: Response, next: NextFunction) {
        const auth = req.headers.authorization;
        if (auth && auth.startsWith('Bearer')) {
            const token = auth.slice(7);
            try {
                const tokenData = Auth.verifyToken(token);
                req.body.tokenData = tokenData;
                next();
            } catch (err) {
                throw new Exception(ErrorCode.Unauthenticated, "Invalid JWT token.");
            }
        } else {
            throw new Exception(ErrorCode.Unauthenticated, "Request missing Bearer token.");
        }
    }
}