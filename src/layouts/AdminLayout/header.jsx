import {Button} from "@/components/ui/button.jsx";
import {AlignJustify, LogOut} from "lucide-react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {userLogout} from "@/store/authSlice/index.jsx";

AdminHeader.propTypes = {
    setSidebarOpen: PropTypes.func,
};

function AdminHeader({setSidebarOpen}) {
    const dispatch = useDispatch();

    return (
        <>
            <header className="flex items-center justify-between px-4 py-5 bg-background border-b">
                <Button className="lg:hidden sm:block" onClick={() => setSidebarOpen(true)}>
                    <AlignJustify/>
                </Button>
                <div className="flex flex-1 justify-end">
                    <Button
                        className="flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
                        onClick={() => dispatch(userLogout())}
                    >
                        <LogOut/>
                        Logout
                    </Button>
                </div>
            </header>
        </>
    )
}

export default AdminHeader;