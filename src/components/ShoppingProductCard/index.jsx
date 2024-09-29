import { Card, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import PropTypes from "prop-types";
import { categoryOptionsMap, brandOptionsMap } from "@/utils/index.jsx";
import { addToCart } from "@/services/cart.service.jsx";
import {useSelector} from "react-redux";
import { useToast } from "@/hooks/use-toast.js";
import { useState } from "react";

ShoppingProductCard.propTypes = {
    product: PropTypes.object,
    handleProduct: PropTypes.func,
}

function ShoppingProductCard({ product, handleProduct }) {
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        const response = await addToCart({ userId: user.id, productId: product._id });
        if (response.success) {
            toast({
                title: response.message,
            })
        } else {
            toast({
                title: response.message,
                variant: "destructive",
            })
        }
        setLoading(false);
    }

    return (
        <>
            <Card className="w-full max-w-sm mx-auto hover:shadow-xl cursor-pointer">
                <div onClick={() => handleProduct(product)}>
                    <div className="relative">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className="w-full h-[200px] object-cover rounded-t-lg"
                        />
                        {product?.totalStock === 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500">
                                Out Of Stock
                            </Badge>
                        ) : product?.totalStock < 10 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500">
                                {`Only ${product?.totalStock} items left`}
                            </Badge>
                        ) : product?.salePrice > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500">
                                Sale
                            </Badge>
                        ) : null}
                    </div>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[16px] text-muted-foreground">
                                {categoryOptionsMap[product?.category]}
                            </span>
                            <span className="text-[16px] text-muted-foreground">
                                {brandOptionsMap[product?.brand]}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
                                ${product?.price}
                            </span>
                            {product?.salePrice > 0 && (
                                <span className="text-lg font-semibold">
                                    ${product?.salePrice}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </div>
                <CardFooter>
                    {product?.totalStock === 0 ? (
                        <Button className="w-full opacity-60 cursor-not-allowed">
                            Out Of Stock
                        </Button>
                    ) : (
                        <Button
                            className="w-full"
                            onClick={handleAddToCart}
                            disabled={loading}
                        >
                            Add to cart
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </>
    )
}

export default ShoppingProductCard;