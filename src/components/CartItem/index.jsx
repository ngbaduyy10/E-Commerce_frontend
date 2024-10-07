import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast.js";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import {updateCartSlice, deleteCartSlice} from "@/store/cartSlice/index.jsx";

CartItem.propTypes = {
    cartItem: PropTypes.object,
}

function CartItem({ cartItem }) {
    const { toast } = useToast();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const updateItemQuantity = async (quantity) => {
        const response = await dispatch(updateCartSlice({ userId: user.id, productId: cartItem.productId._id, quantity }));
        const payload = response.payload;
        if (!payload.success) {
            toast({
                title: response.message,
                variant: "destructive",
            })
        }
    }

    const handleDeleteItem = async () => {
        await dispatch(deleteCartSlice({ userId: user.id, productId: cartItem.productId._id }));
    }

    return (
        <>
            <div className="flex space-x-4">
                <img
                    src={cartItem?.productId.image}
                    alt={cartItem?.productId.title}
                    className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-extrabold">{cartItem?.productId.title}</h3>
                        <p className="font-semibold">
                            ${((cartItem?.productId.salePrice > 0 ? cartItem?.productId.salePrice : cartItem?.productId.price) * cartItem?.quantity).toFixed(2)}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 mt-1">
                            <Button
                                variant="outline"
                                className="h-8 w-8 rounded-full"
                                size="icon"
                                disabled={cartItem?.quantity === 1}
                                onClick={() => updateItemQuantity(cartItem.quantity - 1)}
                            >
                                <Minus className="w-4 h-4"/>
                            </Button>
                            <span className="font-semibold">{cartItem?.quantity}</span>
                            <Button
                                variant="outline"
                                className="h-8 w-8 rounded-full"
                                size="icon"
                                onClick={() => updateItemQuantity(cartItem.quantity + 1)}
                            >
                                <Plus className="w-4 h-4"/>
                            </Button>
                        </div>
                        <Trash
                            className="cursor-pointer mt-1"
                            size={20}
                            onClick={handleDeleteItem}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem;