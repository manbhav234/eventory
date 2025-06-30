import prisma from "../db/client";
import { Event } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import parseDateFromString from "../utils/parseDateFromString";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try{
        //TODO: handle for duplicate event names
        const newEvent = await prisma.event.create({
            data: {
                eventName: body.eventName,
                startDate: parseDateFromString(body.startDate),
                endDate: body.endDate == "" ? null : parseDateFromString(body.endDate),
                managedBy: body.user
            }
        })
        res.json({success: true, event: newEvent})
    }catch(e){
        console.log("Error creating event: ", e)
        res.json({success: false, event: null});
    }
}

export const fetchEvents = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.query.id)
    try{
        const events = await prisma.event.findMany({
            where: {
                managedBy: id
            }
        })
        res.json({success: true, events: events})
    }catch(e){
        console.log("Error fetching all events: ", e);
        res.json({success: false, events: null});
    }
}

export default {
    createEvent,
    fetchEvents
}