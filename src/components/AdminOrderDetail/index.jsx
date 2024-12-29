import PropTypes from "prop-types";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import CommonForm from "../CommonForm";
import { useState } from "react";
import { updateOrderStatus } from "@/services/order.service.jsx";
import { useToast } from "@/hooks/use-toast.js";

AdminOrderDetail.propTypes = {
    order: PropTypes.object,
}

function AdminOrderDetail({ order }) {
    const [formData, setFormData] = useState({
        status: order?.orderStatus,
    });
    const { toast } = useToast();

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        const response = await updateOrderStatus(order._id, formData.status);
        if (response.success) {
            toast({
                title: response.message,
            });
        }
    }

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
                                    <li className="flex items-center justify-between" key={item.productId}>
                                        <span>Title: {item.productId.title}</span>
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
                                <span>{order?.userId?.userName}</span>
                                <span>{order?.addressId?.address}</span>
                                <span>{order?.addressId?.city}</span>
                                <span>{order?.addressId?.pinCode}</span>
                                <span>{order?.addressId?.phone}</span>
                                <span>{order?.addressId?.notes}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <CommonForm
                            formControls={[
                                {
                                    label: "Order Status",
                                    name: "status",
                                    componentType: "select",
                                    options: [
                                        { id: "pending", label: "Pending" },
                                        { id: "inProcess", label: "In Process" },
                                        { id: "inShipping", label: "In Shipping" },
                                        { id: "delivered", label: "Delivered" },
                                        { id: "rejected", label: "Rejected" },
                                    ],
                                },
                            ]}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={"Update Order Status"}
                            onSubmit={handleUpdateStatus}
                        />
                    </div>
                </div>
            </DialogContent>
        </>
    )
}

export default AdminOrderDetail;