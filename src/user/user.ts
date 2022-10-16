import { NextFunction, Request, Response } from "express";
import { IUser, UserModel} from "../models/db/user/user";
import { Exception } from "../utils/errors/exception";
import { ErrorCode } from "../utils/errors/error_codes";
import { Auth } from "../auth/auth_engine";
import { nanoid } from "nanoid";

export default class User {
    
    private _id: string;
    private _firstName: string;
    private _phone: number;
    private _password: string;
    private _height: number;
    private _weight: number;
    private _gender: string;
    private _age: number;

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._firstName;
    }

    public get phone(): number {
        return this._phone;
    }

    public get password(): string {
        return this._password;
    }

    public get height(): number {
        return this._height;
    }

    public get weight(): number {
        return this._weight;
    }

    public get gender(): string {
        return this._gender;
    }

    public get age(): number {
        return this._age;
    }

    constructor(userObj: IUser) {
        this._id = userObj._id;
        this._firstName = userObj.firstName;
        this._phone = userObj.phone;
        this._password = userObj.password;
        this._height = userObj.height;
        this._weight = userObj.weight;
        this._gender = userObj.gender;
        this._age = userObj.age;
    }

    public async createUser(): Promise<{ token: string }> {
        const userExists: IUser = await UserModel.findOne({ email: this._phone });
        if (userExists) {
            throw new Exception(ErrorCode.UnknownError, "Duplicate user.");
        }
        const passwordHash: string = Auth.generateHash(this._password);
        const newUser: IUser = {
            _id: this._id,
            firstName: this._firstName,
            phone: this._phone,
            password: passwordHash,
            height: this._height,
            weight: this._weight,
            gender: this._gender,
            age: this._age
        }
        const created = await UserModel.create(newUser);
        const newUserToken = Auth.generateToken(this);

        return { token: newUserToken }
    }

    /**
     * Returns a user based on the email identifier.
     * @param email used as a unique identifier for the user.
     * @return new User instance with the given email.
     */
     public static async getUser(phone: number): Promise<User> {
        const user: IUser = await UserModel.findOne({ phone: phone})
        if (user == null) {
            throw new Exception(ErrorCode.NotFound, "User not found.");
        }
        return new User(user);
    }

    /**
     * Deletes the user object from the database, along with the course group.
     * @param user object.
     * @returns true if deletion was successful, returns Error instance otherwise.
     */
     public static async delete(user: User): Promise<{ user: string }> {
        try {
            await UserModel.deleteOne({ _id: user.id });
        } catch (err) {
            return err;
        }
        return {
            user: `User ${user.name} deleted.`,
        }
    }

    /**
     * Extract Email, Name, and Password from the body of the request object.
     * @param req request object from the client side, with nothing changed.
     * @return { email, name, password } as an object.
     */
     public static extractUser(req: Request): IUser {
        try {
            const { phone, firstName, password } = req.body;
            return { _id: nanoid(), phone: phone, firstName: firstName, password: password, gender: "", height: 0, weight: 0, age: 0 };
        } catch (err) {
            throw new Exception(ErrorCode.NotFound, "Request didn't contain all User credentials.");
        }
    }
}