import prisma from "../db/client";
import { Event } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try{
        const checkEvent = await prisma.event.findFirst({
            where: {
                managedBy: body.user,
                eventName: body.eventName
            }
        })
        if (!checkEvent){
            const newEvent: Event = await prisma.event.create({
                data: {
                    eventName: body.eventName,
                    startDate: body.startDate,
                    endDate: body.endDate ? null : body.endDate,
                    managedBy: body.user
                }
            })
            res.json({success: true, event: newEvent, message: "Event Created Successfully"})
        }else{
            res.json({success: false, message: "Event with this name already exists"})
        }
    }catch(e){
        console.log("Error creating event: ", e)
        res.json({success: false, message: "Could not create event"});
    }
}

const fetchEvents = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const events = await prisma.event.findMany({
            where: {
                managedBy: req.user!.id
            }
        })
        res.json({success: true, events: events, message: "Events successfully fetched"})
    }catch(e){
        console.log("Error fetching all events: ", e);
        res.json({success: false, message: "Error fetching events"});
    }
}

export default {
    createEvent,
    fetchEvents
}