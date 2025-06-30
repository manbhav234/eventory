import { NextFunction, RequestHandler, Response } from "express";

export default function authenticate (req: RequestHandler, res: Response, next: NextFunction){
    console.log('reached here')
    if (req.user){
        console.log(req.user);
        next();
    }else{
        res.json({ success: false, message: "User not authenticated" })
    }
}