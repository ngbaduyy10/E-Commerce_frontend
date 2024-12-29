import img from "@/assets/account.jpg";
import {useSelector, useDispatch} from "react-redux";
import {Button} from "@/components/ui/Button";
import CartItem from "@/components/CartItem/index.jsx";
import {useEffect, useState} from "react";
import AddressCard from "@/components/AddressCard/index.jsx";
import {getAddress} from "@/services/address.service.jsx";
import {useToast} from "@/hooks/use-toast.js";
import {createOrder} from "@/services/order.service.jsx";
import {useNavigate} from "react-router-dom";
import {clearCartSlice} from "@/store/cartSlice/index.jsx";

function Checkout() {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const totalPrice = cartItems?.reduce((acc, item) =>
        acc + (item.productId.salePrice > 0 ? item.productId.salePrice : item.productId.price) * item.quantity, 0);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();
    const { toast } = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAddress(user.id);
            if (response.success) {
                setAddressList(response.data);
            }
        }

        if (user) {
            fetchApi();
        }
    }, [user]);

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast({
                title: "Your cart is empty. Please add items to proceed",
                variant: "destructive",
            });
            return;
        }
        if (!selectedAddress) {
            toast({
                title: "Please select one address to proceed.",
                variant: "destructive",
            });
            return;
        }

        const response = await createOrder({
            userId: user.id,
            addressId: selectedAddress._id,
            items: cartItems,
            orderStatus: "pending",
            paymentMethod: "Paypal",
            paymentStatus: "pending",
            totalAmount: totalPrice,
            paymentId: "",
            payerId: "",
        });
        if (response.success) {
            toast({
                title: response.message,
            });
            dispatch(clearCartSlice(user.id));
            navigate("/payment-success", { replace: true });
        } else {
            toast({
                title: response.message,
                variant: "destructive",
            });
        }
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="relative h-[300px] w-full overflow-hidden">
                    <img alt={"image"} src={img} className="h-full w-full object-cover object-center"/>
                </div>
                <div className="lg:w-2/3 w-full gap-5 mt-5 p-5">
                    <div className="grid md:grid-cols-3 grid-cols-2  mb-4">
                        {addressList.length > 0 && addressList.map((address) => (
                            <AddressCard
                                key={address._id}
                                addressInfo={address}
                                setSelectedAddress={setSelectedAddress}
                                selectedAddress={selectedAddress}
                            />
                        ))}
                    </div>
                    <div className="text-3xl font-bold mb-4">Orders</div>
                    <div className="flex flex-col gap-4">
                        {cartItems && cartItems.length > 0
                            && cartItems.map((item) => (
                                <CartItem key={item.productId._id} cartItem={item}/>
                            ))}
                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-2xl font-bold">Total</span>
                                <span className="text-2xl font-bold">${totalPrice}</span>
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <Button className="w-full" onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;