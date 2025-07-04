import prisma from "../db/client";
import { Event } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const orderDate = new Date();
    try{
        const order = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data:{
                    totalAmount: body.totalAmount,
                    orderDate: orderDate,
                    event: body.eventId,
                    paymentMode: body.paymentMode
                }
            })

            const orderItems = await tx.orderItem.createMany({
                data: body.products.map((selectedProduct) => ({product: selectedProduct.id, order: order.id, quantity: selectedProduct.quantity})),
            })

            for (const item of body.products){
                await tx.product.update({
                    data: {
                        quantity: {
                            decrement: item.quantity
                        }
                    },
                    where: {
                        id: item.id
                    }
                })
            }
            return order
        })
        res.json({success: true, message: "Order created successfully", order: order});
    }catch(e){
        console.log("Error occurred while creating an order: ", e);
        res.json({success: false, message: "Could not create the order"});
    }
}

const fetchOrders = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = Number(req.query.eventId)
    console.log("fetching orders")
    try {
        const orders = await prisma.order.findMany({
            where: {
                event: eventId
            },
            include: {
                orderItems: {
                    include: {
                        productRef: {
                            select: {
                                name: true,
                                costPrice: true
                            }
                        }
                    }
                }
            }
        })
        const removedEvent = orders.map(({event, ...requiredOrder}) => requiredOrder);
        const finalOrders = removedEvent.map((order) => ({...order, orderItems: order.orderItems.map(({productRef, quantity, ...restOfOrderItem}) => ({productName: productRef.name, productCost: productRef.costPrice, quantity: quantity}))}))
        res.json({success: true, message:"Successfully fetched orders", orders: finalOrders});
    }catch(e){
        console.log("Error occurred while fetching orders: ", e)
        res.json({success:false, message: "Could not fetch orders"})
    }
    
}

export default {
    createOrder,
    fetchOrders
}