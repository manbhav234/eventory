import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CloudUpload, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import useAppStore from "@/store/mainStore"
import type { Category } from "@/store/productSlice"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

const VariantTypeEnum = z.enum([
  "Color",
  "Weight",
  "Size",
]);

const VariantSchema = z.object({
  variantType: VariantTypeEnum,
  variantValue: z.string().min(1, { message: "Variant value is required" }),
  variantCostPrice: z.number(),
  variantSellingPrice: z.number(),
});

type Variant = z.infer<typeof VariantSchema>;


const FormSchema = z.object({
  productName: z.string().min(2, {message: "Product name must be atleast 2 characters long"}).max(50, {message: "Product name cannot exceed 50 characters"}),
  costPrice: z.number(),
  sellingPrice: z.number(),
  inStock: z.boolean(),
  quantity: z.number(),
  selectedCategory: z.string().min(3, {message: "Category name must be 3 characters long"}),
  image: z.array(z.custom<File>()).max(1).refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
  variants: z.array(VariantSchema).optional()
})

const AddProductsSection = () => {
  //TODO: improve variant display UI
    const defaultVariant: Variant = {
        variantType: "Color",         
        variantValue: "",
        variantCostPrice: 0,
        variantSellingPrice: 0,
    };

  const {categories, addCategory} = useAppStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
      costPrice: 0,
      sellingPrice: 0,
      inStock: false,
      quantity: 0,
      selectedCategory: "",
      image: undefined,
      variants: []
    },
  })

  const [stockToggle, setStockToggle] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [variants, setVariants] = useState<Variant[]>([])
  const [variant, setVariant] = useState<Variant>(defaultVariant)
  function onFormSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  const handleStockToggle = () => {
    setStockToggle((state) => !state);
  }

  const handleAddNewCategory = async () => {
    console.log("handle add new triggered")
    await addCategory(newCategoryName);
    setNewCategoryName("");
  }

  const handleAddNewVariant = () => {
    setVariants([...variants, variant]);
    setVariant(defaultVariant)
  }

  console.log(form.getValues("image"))
  return (
  <div className="w-full h-full flex justify-center items-center mt-4">
      <div className="w-full">
        <div className="mb-8 flex justify-between">
            <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="mt-2 text-gray-600">Add a new product to your inventory</p>
            </div>
            <Button type="submit" className="mx-2 md:mx-4 md:w-1/10">Submit</Button>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col space-y-6 space-x-0 justify-center md:grid md:grid-cols-3 md:space-x-6 md:space-y-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Product Details
                        </CardTitle>
                    <CardDescription>
                        Enter basic details about the product
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="productName"
                                render={( {field }) => (
                                    <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Product Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between items-center pt-4 gap-2">
                            <div className="space-x-1 place-self-center">
                                <FormField
                                    control={form.control}
                                    name="costPrice"
                                    render={( {field }) => (
                                        <FormItem>
                                        <FormLabel>Cost Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter Cost Price" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-x-1">
                                <FormField
                                    control={form.control}
                                    name="sellingPrice"
                                    render={( {field }) => (
                                        <FormItem>
                                        <FormLabel>Selling Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter Selling Price" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <div className="space-x-1">
                                <FormField
                                    control={form.control}
                                    name="inStock"
                                    render={() => (
                                        <FormItem>
                                        <FormLabel>In Stock</FormLabel>
                                        <FormControl>
                                            <Switch onClick={handleStockToggle}/>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-x-1">
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={( {field }) => (
                                        <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter Product Quantity" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    disabled={!stockToggle}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                            Category
                        </CardTitle>
                    <CardDescription>
                        Select Product Category
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2">
                            <FormField
                                control={form.control}
                                name="selectedCategory"
                                render={( {field }) => (
                                    <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                    <SelectLabel>Category</SelectLabel>
                                                    {categories.map((category: Category) => (
                                                        <SelectItem key={category.id} value={category.name.toLowerCase()}>{category.name}</SelectItem>
                                                    ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <span className="text-center mx-auto">or</span>
                            <FormField
                                name="newCategoryField"
                                render={( {field }) => (
                                    <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Category Name" {...field} value={newCategoryName} onChange={(e) => {setNewCategoryName(e.target.value)}} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="productName"
                                render={( {field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Button type="button" onClick={handleAddNewCategory}>Add New</Button>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:mr-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Product Image
                        </CardTitle>
                        <CardDescription>
                            Upload an Image upto 5MB
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <FileUpload
                            value={field.value}
                            onValueChange={field.onChange}
                            accept="image/*"
                            maxFiles={1}
                            maxSize={5 * 1024 * 1024}
                            onFileReject={(_, message) => {
                                form.setError("image", {
                                message,
                                });
                            }}
                            multiple
                            >
                            <FileUploadDropzone>
                                <div className="flex flex-col items-center gap-1 text-center">
                                <div className="flex items-center justify-center rounded-full border p-2.5">
                                    <CloudUpload className="size-6 text-muted-foreground" />
                                </div>
                                <p className="font-medium text-sm">Drag & drop files here</p>
                                <p className="text-muted-foreground text-xs">
                                    Or click to browse
                                </p>
                                </div>
                                <FileUploadTrigger asChild>
                                <Button variant="outline" size="sm" className="mt-2 w-fit">
                                    Browse files
                                </Button>
                                </FileUploadTrigger>
                            </FileUploadDropzone>
                           <FileUploadList>
                            {field.value && field.value.map((file, index) => (
                            <FileUploadItem key={index} value={file}>
                                <FileUploadItemPreview />
                                <FileUploadItemMetadata />
                                <FileUploadItemDelete asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7"
                                >
                                    <X />
                                    <span className="sr-only">Delete</span>
                                </Button>
                                </FileUploadItemDelete>
                            </FileUploadItem>
                            ))}
                        </FileUploadList>
                            </FileUpload>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />     
                    </CardContent>
                </Card>
                <Card className="col-span-2 md:mr-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Product Variants
                        </CardTitle>
                    <CardDescription>
                        Add variants of this product (if any)
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col w-full items-start">
                        <div className="flex flex-col w-full md:flex-row justify-between pt-4 gap-2">
                            <div className="space-x-1">
                             <FormField
                                name="variantType"
                                render={( {field }) => (
                                    <FormItem>
                                    <FormLabel>Variant Type</FormLabel>
                                    <FormControl>
                                            <Select onValueChange={(value) => {setVariant({...variant, variantType: value})}}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a Variant Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                    <SelectLabel>Variant Type</SelectLabel>
                                                        <SelectItem key="color" value={"Color"}>Color</SelectItem>
                                                        <SelectItem key="weight" value={"Weight"}>Weight</SelectItem>
                                                        <SelectItem key="size" value={"Size"}>Size</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className="space-x-1">
                                <FormField
                                    name="variantValue"
                                    render={( {field }) => (
                                        <FormItem>
                                        <FormLabel>Value</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter Value" {...field} value={variant.variantValue} onChange={(e) => {setVariant({...variant, variantValue: e.target.value})}}/>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                             <div className="space-x-1">
                                <FormField
                                    name="variantCostPrice"
                                    render={( {field }) => (
                                        <FormItem>
                                        <FormLabel>Cost Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter Variant Cost Price" {...field} value={variant.variantCostPrice} onChange={(e) => {setVariant({...variant, variantCostPrice: Number(e.target.value)})}}/>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                             <div className="space-x-1">
                                <FormField
                                    name="variantSellingPrice"
                                    render={( {field }) => (
                                        <FormItem>
                                        <FormLabel>Selling Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter Variant Selling Price" {...field} value={variant.variantSellingPrice} onChange={(e) => {setVariant({...variant, variantSellingPrice: Number(e.target.value)})}}/>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-full mt-4">
                             <FormField
                                name="newVariant"
                                render={( {field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Button type="button" onClick={handleAddNewVariant}>Add New</Button>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:mr-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Product Variants
                        </CardTitle>
                    <CardDescription>
                        Add variants of this product (if any)
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {variants.length > 0 ? variants.map((variant) => (
                            <div>
                                <span>{variant.variantType}</span>
                                <span>{variant.variantValue}</span>
                                <span>{variant.variantCostPrice}</span>
                                <span>{variant.variantSellingPrice}</span>
                            </div>
                        )) : <p className="text-center">No Variant Added</p>}
                    </CardContent>
                </Card>
            </form>
        </Form>
       </div>
    </div>
  )
}

export default AddProductsSection;