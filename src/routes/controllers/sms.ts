import { NextFunction, Request, Response } from "express";
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
            });

            this._routes.post('/send', async (req: Request, res: Response, next: NextFunction) => {
                const twiml = new MessagingResponse();
                const message = twiml.message();
                message.body('How are you feeling after that meal on a scale of 1 to 10?');
                res.type('text/xml').send(twiml.toString());
            });
        }
}