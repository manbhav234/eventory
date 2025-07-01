import { Request, Response, NextFunction } from "express";

export default function authenticate (req: Request, res: Response, next: NextFunction){
    if (req.user){
        next();
    }else{
        res.json({ success: false, message: "User not authenticated" })
    }
}