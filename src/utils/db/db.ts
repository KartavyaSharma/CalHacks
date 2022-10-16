import mongoose, { Connection } from 'mongoose';
/**
 * Contains the Db class. Contains all methods related
 * to interacting with the database on MongoDB Atlas.
 */

export default class Db {

    /**
     * Property of type Connection. Contains the state of the
     * MongoDB connection.
     */
    private _connection: Connection;

    /**
     * Instance of this database.
     */
    private _instance: any;

    /**
     * @returns the connection object for this DB instance.
     */
    public get connector(): Connection {
        return this._connection;
    }

    /**
     * @returns the complete db connection state.
     */
    public get instance(): any {
        return this._instance;
    }

    /**
     * States of MongoDB's connection status to the DB.
     */
    static readonly states = [
        "connecting",
        "connected",
        "disconnecting",
        "disconnected"
    ]

    /**
     * Connects to database instance on MongoDB Atlas.
     * @param config object for database settings.
     */
    public async connect(config: { uri: string }) {
        for (const state of Db.states) {
            mongoose.connection.on(state, () => {
                console.log(`MongoDB: ${state}.`);
            });
        }
        try {
            if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
                this._instance = await mongoose.connect(
                    config.uri,
                    {
                        autoIndex: true,
                        serverSelectionTimeoutMS: 5000,
                    }
                );
                this._connection = this.instance.connection;
            }
        } catch (error) {
            console.log(`Error connecting to DB: ${error}`);
        }
    }
}