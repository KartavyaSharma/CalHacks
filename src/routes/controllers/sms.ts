import { NextFunction, Request, Response } from "express";
import { Utils } from "../../utils/server_utils";
import { Routes } from "../routes";

const { MessagingResponse } = require('twilio').twiml;

export default class SmsRoutes extends Routes {

    protected static readonly BASE = "/sms";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        this._routes.post('/incoming', async (req: Request, res: Response, next: NextFunction) => {
            const twiml = new MessagingResponse();
            const idx = req.body.body.search(/[0-9]+/);
            if (idx != -1) {
                const num = req.body.body[idx];
                if (num >= 7) {
                    twiml.message("You are doing great! Keep it up!");
                }
            }
            res.type('text/xml').send(twiml.toString());
        });

        this._routes.post('/send', async (req: Request, res: Response, next: NextFunction) => {
            const accountSid = 'ACdeebbdeb90d12d983767552b109e21cf';
            const authToken = 'bd740f489e1d63973662e3f2f9a89bfa';
            const client = require('twilio')(accountSid, authToken);

            client.messages
                .create({
                    body: '"How are you feeling"',
                    messagingServiceSid: 'MGbcbc57e0afec98d9db1ad555b523df4f',
                    to: '+19257846151'
                }).then((message: any) => console.log(message.sid)).done();
            Utils.sendRes<any>(res, { wooo: "wooo" });
        });
    }
}