import { Outlet } from "react-router-dom";
import ShoppingHeader from "@/layouts/ShoppingLayout/header";

function ShoppingLayout() {
    return (
        <div className="flex flex-col bg-white">
            <ShoppingHeader />
            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default ShoppingLayout;