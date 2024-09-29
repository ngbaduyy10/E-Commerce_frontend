import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

AuthCheck.propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.object,
    children: PropTypes.node,
}

function AuthCheck({ isAuth, user, children }) {
    const location = useLocation();
    const permission = localStorage.getItem("permission");

    if (location.pathname === "/") {
        if (!isAuth) {
            return <Navigate to="/login" />;
        } else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/home" />;
            }
        }
    }

    if (
        !isAuth && !permission &&
        !(location.pathname.includes("/login") || location.pathname.includes("/register"))
    ) {
        return <Navigate to="/login" />;
    }

    if (
        isAuth &&
        (location.pathname.includes("/login") || location.pathname.includes("/register"))
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/home" />;
        }
    }

    if (
        isAuth &&
        user?.role !== "admin" &&
        location.pathname.includes("admin")
    ) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
}

export default AuthCheck;