import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet.jsx';
import { Button } from '@/components/ui/button.jsx';
import CartItem from "@/components/CartItem/index.jsx";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getCartSlice} from "@/store/cartSlice/index.jsx";
import {useNavigate} from "react-router-dom";

CartSheet.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

function CartSheet({ open, setOpen}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const totalPrice = cartItems?.reduce((acc, item) =>
        acc + (item.productId.salePrice > 0 ? item.productId.salePrice : item.productId.price) * item.quantity, 0);

    useEffect(() => {
        if (user) {
            dispatch(getCartSlice(user.id));
        }
    }, [user, dispatch]);

    return (
        <>
            <Sheet open={open} onOpenChange={() => setOpen(false)}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Your cart</SheetTitle>
                    </SheetHeader>
                    {cartItems && cartItems.length > 0 ? (
                        <>
                            <div className="mt-8 space-y-4">
                                {cartItems.length > 0 && cartItems.map((item) => <CartItem key={item.productId._id} cartItem={item} />)}
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-bold text-xl">Total</span>
                                    <span className="font-bold text-xl">${totalPrice}</span>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/checkout")
                                }}
                                className="w-full mt-6"
                            >
                                Checkout
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-[300px]">
                            <p className="text-lg font-semibold">Your cart is empty</p>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}

export default CartSheet;