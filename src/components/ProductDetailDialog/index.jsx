import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";
import StarRating from "@/components/StarRating/index.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useToast} from "@/hooks/use-toast.js";
import {addToCart} from "@/services/cart.service.jsx";

ProductDetailDialog.propTypes = {
    open: PropTypes.bool,
    product: PropTypes.object,
    reviews: PropTypes.array,
    setOpen: PropTypes.func,
    setProduct: PropTypes.func,
}

function ProductDetailDialog({ open, setOpen, product, setProduct, reviews }) {
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

    const handleRatingChange = (value) => {
        setRating(value);
    }

    const handleCloseDialog = () => {
        setOpen(false);
        setProduct(null);
    }

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
            <Dialog open={open} onOpenChange={handleCloseDialog}>
                <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            width={600}
                            height={600}
                            className="aspect-square w-full object-cover"
                        />
                    </div>
                    <div className="">
                        <div>
                            <h1 className="text-3xl font-extrabold">{product?.title}</h1>
                            <p className="text-muted-foreground text-2xl mb-5 mt-4">
                                {product?.description}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p
                                className={`text-3xl font-bold text-primary ${product?.salePrice > 0 ? "line-through" : ""}`}
                            >
                                ${product?.price}
                            </p>
                            {product?.salePrice > 0 ? (
                                <p className="text-2xl font-bold text-muted-foreground">
                                    ${product?.salePrice}
                                </p>
                            ) : null}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-0.5">
                                <StarRating rating={averageRating}/>
                            </div>
                            <span className="text-muted-foreground">
                              ({averageRating.toFixed(2)})
                            </span>
                        </div>
                        <div className="mt-5 mb-5">
                            {product?.totalStock === 0 ? (
                                <Button className="w-full opacity-60 cursor-not-allowed">
                                    Out of Stock
                                </Button>
                            ) : (
                                <Button
                                    className="w-full"
                                    onClick={handleAddToCart}
                                    disabled={loading}
                                >
                                    Add to Cart
                                </Button>
                            )}
                        </div>
                        <Separator />
                        <div className="max-h-[300px] overflow-auto px-1">
                            <h2 className="text-xl font-bold mb-4">Reviews</h2>
                            <div className="grid gap-6">
                                {reviews.length > 0 ? (
                                    reviews.map((reviewItem) => (
                                        <div className="flex gap-4" key={reviewItem._id}>
                                            <Avatar className="w-10 h-10 border">
                                                <AvatarFallback>
                                                    {reviewItem?.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold">{reviewItem?.userName}</h3>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <StarRating rating={reviewItem?.rating}/>
                                                </div>
                                                <p className="text-muted-foreground">
                                                    {reviewItem.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h1>No Reviews</h1>
                                )}
                            </div>
                            <div className="mt-10 flex-col flex gap-2">
                                <Label>Write a review</Label>
                                <div className="flex gap-1">
                                    <StarRating rating={rating} handleRatingChange={handleRatingChange}/>
                                </div>
                                <Input
                                    name="reviewMsg"
                                    placeholder="Write a review..."
                                />
                                <Button>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProductDetailDialog;