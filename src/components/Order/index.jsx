import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUserId } from "@/services/order.service";
import OrderDetail from "@/components/OrderDetail/index.jsx";

function ShoppingOrder() {
    const { user } = useSelector((state) => state.auth);
    const [orderList, setOrderList] = useState([]);
    const [orderDetailOpen, setOrderDetailOpen] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getOrdersByUserId(user.id);
            if (response.success) {
                setOrderList(response.data);
            }
        }
        if (user) {
            fetchApi();
        }
    }, [user]);

    const handleDialogClose = () => {
        setOrderDetailOpen(false);
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead className="text-center">Order Date</TableHead>
                                <TableHead className="text-center">Order Status</TableHead>
                                <TableHead className="text-center">Order Price</TableHead>
                                <TableHead className="text-center">
                                    <span className="sr-only">Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderList.length > 0 && orderList.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order?._id}</TableCell>
                                    <TableCell className="text-center">{order?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            className={`py-1 px-3 
                                                ${order?.orderStatus === "confirmed" ? "bg-green-500"
                                                : order?.orderStatus === "rejected" ? "bg-red-600" : "bg-black"
                                            }`}
                                        >
                                            {order?.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">${order?.totalAmount}</TableCell>
                                    <TableCell className="text-center">
                                        <Dialog open={orderDetailOpen} onOpenChange={handleDialogClose}>
                                            <Button onClick={() => setOrderDetailOpen(true)}>
                                                View Details
                                            </Button>
                                            <OrderDetail order={order} />
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default ShoppingOrder;