import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import { Trash2, Pencil } from "lucide-react";

AdminProductCard.propTypes = {
    product: PropTypes.object,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
}

function AdminProductCard({ product, handleEdit, handleDelete }) {
    return (
        <>
            <Card className="w-full max-w-sm mx-auto">
                <div>
                    <div className="relative">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className="w-full h-[250px] object-cover rounded-t-lg"
                        />
                    </div>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                        <div className="flex justify-between items-center">
                            <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
                              ${product?.price}
                            </span>
                            {product?.salePrice > 0 && (
                                <span className="text-lg font-bold">${product?.salePrice}</span>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 justify-end items-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className="p-2" onClick={() => handleEdit(product)}>
                                        <Pencil />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-foreground text-background">
                                    <p>Edit Product</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className="p-2" onClick={() => handleDelete(product._id)}>
                                        <Trash2 />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-foreground text-background">
                                    <p>Delete Product</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardFooter>
                </div>
            </Card>
        </>
    );
}

export default AdminProductCard;