import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet.jsx';
import { Button } from '@/components/ui/button.jsx';
import CartItem from "@/components/CartItem/index.jsx";
import PropTypes from "prop-types";

CartSheet.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    cartItems: PropTypes.array,
    totalPrice: PropTypes.number,
}

function CartSheet({ open, setOpen, cartItems, totalPrice}) {
    return (
        <>
            <Sheet open={open} onOpenChange={() => setOpen(false)}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Your cart</SheetTitle>
                    </SheetHeader>
                    {cartItems.length > 0 ? (
                        <>
                            <div className="mt-8 space-y-4">
                                {cartItems.length > 0 && cartItems.map((item) => <CartItem key={item.productId._id} cartItem={item} />)}
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold">${totalPrice}</span>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    setOpen(false);
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