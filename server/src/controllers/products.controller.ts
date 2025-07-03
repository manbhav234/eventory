import prisma from "../db/client";
import { Request, Response, NextFunction } from "express";
import uploadOnCloudinary from "../utils/cloudinaryUpload";

//TODO: make addProduct modular to remove code duplicacy
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const product = JSON.parse(req.body.product);
    console.log(product);
    console.log(product);
    const filePath = req.file?.path
    try {
        if (filePath){
            const uploadResponse = await uploadOnCloudinary(filePath);
            if (uploadResponse){
                if (product.variants.length == 0){
                    const newProduct = await prisma.product.create({
                        data: {
                            name: product.productName,
                            quantity: product.quantity,
                            costPrice: product.costPrice,
                            sellingPrice: product.sellingPrice,
                            category: product.selectedCategory,
                            event: product.eventId,
                            image: uploadResponse.url
                        }
                    })
                    res.json({success: true, message: "Product added successfully", products: [newProduct]})
                }else{
                    const formattedVariants = product.variants.map((variant) => {
                        return {
                            name: product.productName + '-' + variant.variantValue,
                            quantity: variant.variantQuantity,
                            costPrice: variant.variantCostPrice,
                            sellingPrice: variant.variantSellingPrice,
                            category: product.selectedCategory,
                            event: product.eventId,
                            image: uploadResponse.url,
                        }
                    })
                    const newProducts = await prisma.product.createManyAndReturn({
                        data: formattedVariants
                    })
                    res.json({success: true, message: "Product added successfully", products: newProducts})
                }
            }else{
                res.json({success: false, message:"Could not upload image. Try again or upload without image"})
            }
        }else{
                if (product.variants.length == 0){
                    const newProduct = await prisma.product.create({
                        data: {
                            name: product.productName,
                            quantity: product.quantity,
                            costPrice: product.costPrice,
                            sellingPrice: product.sellingPrice,
                            category: product.selectedCategory,
                            event: product.eventId,
                        }
                    })
                    res.json({success: true, message: "Product added successfully", products: [newProduct]})
                }else{
                    const formattedVariants = product.variants.map((variant) => {
                        return {
                            name: product.productName + '-' + variant.variantValue,
                            quantity: variant.variantQuantity,
                            costPrice: variant.variantCostPrice,
                            sellingPrice: variant.variantSellingPrice,
                            category: product.selectedCategory,
                            event: product.eventId,
                        }
                    })
                    const newProducts = await prisma.product.createManyAndReturn({
                        data: formattedVariants
                    })
                    res.json({success: true, message: "Product added successfully", products: newProducts})
                }
        }
    }catch(e){
        console.log("Error occurred while adding the product: ", e);
    }
}

const fetchProducts = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = Number(req.query.eventId)
    const products = await prisma.product.findMany({
        where: {
            event: eventId,
        }
    })
    const formattedProducts = products.map((product) => {
        if (product.quantity == 0){
            return {...product, stockStatus: "OUT OF STOCK"}
        }else if (product.quantity <= 3){
            return {...product, stockStatus: "RUNNING LOW"}
        }else{
            return {...product, stockStatus: "IN STOCK"}
        }
    })
    res.json({success: true, message: "products fetched successfully", products: formattedProducts})
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
        const response = await prisma.product.delete({
            where: {
                id: body.id
            }
        })
        res.json({success: true, message: "Product Deleted Successfully"});
    }catch(e){
        console.log("Error occurred while deleting product: ", e);
        res.json({success: false, message: "Could not delete the product"});
    }
}

export default {
    addProduct,
    fetchProducts,
    deleteProduct
}