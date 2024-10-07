import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HousePlug, Menu, ShoppingCart, UserCog, LogOut, House, Store } from "lucide-react";
import {Button} from "@/components/ui/Button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/Sheet";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useSelector} from "react-redux";
import {Label} from "@/components/ui/label.jsx";
import {userLogout} from "@/store/authSlice/index.jsx";
import {useState} from "react";
import CartSheet from "@/components/CartSheet/index.jsx";

function ShoppingHeader() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartOpen, setCartOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(userLogout());
    }

    const handleOpenCart = async () => {
        setCartOpen(true);
    }

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b bg-background md:py-1">
                <div className="flex h-16 items-center justify-between px-4 md:px-6">
                    <Link to="/shop/home" className="flex items-center gap-2">
                        <HousePlug className="h-6 w-6"/>
                        <span className="text-xl font-bold">E-Commerce</span>
                    </Link>

                    <div className="hidden lg:block">
                        <div className="flex items-center gap-6">
                            <Label className="text-md font-medium cursor-pointer" onClick={() => navigate("/home")}>Home</Label>
                            <Label className="text-md font-medium cursor-pointer" onClick={() => navigate("/listing")}>Shop</Label>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:hidden">
                        <ShoppingCart className="w-6 h-6 cursor-pointer" onClick={handleOpenCart}/>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-6 w-6"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[250px] px-0">
                                <div className="flex flex-col">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="mb-4 ml-4">
                                                <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                                                    {user?.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <UserCog className="mr-2 h-4 w-4"/>
                                                Account
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                                                <LogOut className="mr-2 h-4 w-4"/>
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <div
                                        className="flex items-center gap-2 py-2 px-4 hover:bg-muted rounded"
                                        onClick={() => navigate("/home")}
                                    >
                                        <House/>
                                        <Label className="text-xl font-medium cursor-pointer">Home</Label>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 py-2 px-4 hover:bg-muted rounded"
                                        onClick={() => navigate("/listing")}
                                    >
                                        <Store />
                                        <Label className="text-xl font-medium cursor-pointer">Shop</Label>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <ShoppingCart className="w-6 h-6 cursor-pointer" onClick={handleOpenCart}/>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="bg-black">
                                    <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                                        {user?.userName[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="cursor-pointer">
                                    <UserCog className="mr-2 h-4 w-4"/>
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4"/>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <CartSheet open={cartOpen} setOpen={setCartOpen} />
        </>
    );
}

export default ShoppingHeader;