import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import PropTypes from "prop-types";

OrderDetail.propTypes = {
    order: PropTypes.object,
}

function OrderDetail({ order }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <DialogContent className="sm:max-w-[600px]">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <div className="flex mt-6 items-center justify-between">
                            <p className="font-medium">Order ID</p>
                            <Label>{order?._id}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Date</p>
                            <Label>{order?.createdAt.split("T")[0]}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Price</p>
                            <Label>${order?.totalAmount}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Payment method</p>
                            <Label>{order?.paymentMethod}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Payment Status</p>
                            <Label>{order?.paymentStatus}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Status</p>
                            <Label>
                                <Badge
                                    className={`py-1 px-3 ${order?.orderStatus === "confirmed" ? "bg-green-500"
                                        : order?.orderStatus === "rejected" ? "bg-red-600" : "bg-black"
                                    }`}
                                >
                                    {order?.orderStatus}
                                </Badge>
                            </Label>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Order Details</div>
                            <ul className="grid gap-3">
                                {order?.items.length > 0 && order?.items.map((item) => (
                                    <li className="flex items-center justify-between" key={item.productId._id}>
                                        <span>{item.productId.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.productId.salePrice}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>User Name: {user.userName}</span>
                                <span>Address: {order?.addressId?.address}</span>
                                <span>City: {order?.addressId?.city}</span>
                                <span>Pin Code: {order?.addressId?.pinCode}</span>
                                <span>Phone: {order?.addressId?.phone}</span>
                                <span>Notes: {order?.addressId?.notes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </>
    );
}

export default OrderDetail;