import { Request, Response, NextFunction } from "express";

export default function authenticate (req: Request, res: Response, next: NextFunction){
    console.log('reached authenticate middleware')
    if (req.user){
        console.log(req.user);
        next();
    }else{
        res.json({ success: false, message: "User not authenticated" })
    }
}