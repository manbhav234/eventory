import prisma from "../db/client";
import { Request, Response, NextFunction } from "express";

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const userId = req.user!.id;
    try {
        const checkCategory = await prisma.category.findFirst({
            where: {
                user: userId,
                name: body.categoryName
            }
        })
        if (!checkCategory){
            const newCategory = await prisma.category.create({
                data: {
                    name: body.categoryName,
                    user: userId
                }
            })
            res.json({success: true, category: newCategory, message: "Category added successfully"})
        }else{
            res.json({success: false, message: "Category already exists"});
        }
    }catch(e){
        res.json({success: false, message: "Error creating the category"});
    }
}

const fetchCategories = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id
    try {
        const categories = await prisma.category.findMany({
            where: {
                user: userId
            }
        })
        res.json({success: true, categories: categories, message: "Categories fetched successfully"});
    }catch(e){
        res.json({success: false, message: "Error fetching the categories"});
    }
}

export default {
    addCategory,
    fetchCategories
}