import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrders } from "@/services/order.service.jsx";
import {useEffect, useState} from "react";
import AdminOrderDetail from "@/components/AdminOrderDetail/index.jsx";

function Orders() {
    const [orderList, setOrderList] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getOrders();
            if (response.success) {
                setOrderList(response.data);
            }
        };

        fetchOrders();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderList.length > 0 && orderList.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order?._id}</TableCell>
                                <TableCell>{order?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={`py-1 px-3 ${
                                            order?.orderStatus === "confirmed" ? "bg-green-500" 
                                            : order?.orderStatus === "rejected" ? "bg-red-600" : "bg-black"
                                        }`}
                                    >
                                        {order?.orderStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>${order?.totalAmount}</TableCell>
                                <TableCell>
                                    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
                                        <Button onClick={() => setDialogOpen(true)}>
                                            View Details
                                        </Button>
                                        <AdminOrderDetail order={order} />
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default Orders;