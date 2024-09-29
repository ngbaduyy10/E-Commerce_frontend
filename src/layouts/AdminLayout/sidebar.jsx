import {BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet.jsx";
import PropTypes from "prop-types";

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket />,
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <BadgeCheck />,
    },
];

AdminSideBar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <ChartNoAxesCombined size={30} />
                                <div className="text-2xl font-extrabold">Admin Panel</div>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="mt-8 flex-col flex gap-2">
                            {adminSidebarMenuItems.map((menuItem) => (
                                <div
                                    key={menuItem.id}
                                    onClick={() => {
                                        navigate(menuItem.path);
                                        setOpen(false);
                                    }}
                                    className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2
                                        ${location.pathname.includes(menuItem.id)
                                        ? "bg-muted text-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                >
                                    {menuItem.icon}
                                    <span>{menuItem.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background py-6 lg:flex">
                <div className="flex cursor-pointer items-center justify-center gap-2">
                    <ChartNoAxesCombined size={30}/>
                    <div className="text-2xl font-extrabold">Admin Panel</div>
                </div>
                <div className="mt-8 flex-col flex gap-2">
                    {adminSidebarMenuItems.map((menuItem) => (
                        <div
                            key={menuItem.id}
                            onClick={() => navigate(menuItem.path)}
                            className={`flex cursor-pointer text-xl items-center gap-2 rounded-md py-2 px-6
                                        ${location.pathname.includes(menuItem.id)
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            {menuItem.icon}
                            <span>{menuItem.label}</span>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}

export default AdminSideBar;