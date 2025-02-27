import banner from '@/assets/account.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/Address/index.jsx";
import ShoppingOrder from "@/components/Order/index.jsx";

function Account() {
    return (
        <>
            <div className="flex flex-col">
                <div className="relative h-[300px] w-full overflow-hidden">
                    <img
                        alt="Banner"
                        src={banner}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                    <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                        <Tabs defaultValue="orders">
                            <TabsList>
                                <TabsTrigger value="orders">Orders</TabsTrigger>
                                <TabsTrigger value="address">Address</TabsTrigger>
                            </TabsList>
                            <TabsContent value="orders">
                                <ShoppingOrder />
                            </TabsContent>
                            <TabsContent value="address">
                                <Address />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;