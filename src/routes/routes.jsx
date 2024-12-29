import AuthLayout from "@/layouts/AuthLayout/index.jsx";
import AdminLayout from "@/layouts/AdminLayout/index.jsx";
import ShoppingLayout from "@/layouts/ShoppingLayout/index.jsx";
import Login from "@/pages/Auth/Login/index.jsx";
import Register from "@/pages/Auth/Register/index.jsx";
import Dashboard from "@/pages/Admin/Dashboard/index.jsx";
import Features from "@/pages/Admin/Features/index.jsx";
import Orders from "@/pages/Admin/Orders/index.jsx";
import Products from "@/pages/Admin/Products/index.jsx";
import Home from "@/pages/Shopping/Home/index.jsx";
import Listing from "@/pages/Shopping/Listing/index.jsx";
import Checkout from "@/pages/Shopping/Checkout/index.jsx";
import Account from "@/pages/Shopping/Account/index.jsx";
import Unauthorized from "@/pages/Unauthorized/index.jsx";
import NotFound from "@/pages/NotFound/index.jsx";
import AuthCheck from "@/components/AuthCheck/index.jsx";
import PaymentSuccess from "@/pages/Shopping/PaymentSuccess/index.jsx";
import Search from "@/pages/Shopping/Search/index.jsx";

const routes = (isAuth, user) => {
    return [
        {
            element: (
                <AuthCheck isAuth={isAuth} user={user}>
                    <AuthLayout />
                </AuthCheck>
            ),
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                }
            ]
        },
        {
            element: (
                <AuthCheck isAuth={isAuth} user={user}>
                    <AdminLayout />
                </AuthCheck>
            ),
            children: [
                {
                    path: "/admin/dashboard",
                    element: <Dashboard />
                },
                {
                    path: "/admin/features",
                    element: <Features />
                },
                {
                    path: "/admin/orders",
                    element: <Orders />
                },
                {
                    path: "/admin/products",
                    element: <Products />
                }
            ]
        },
        {
            element: (
                <AuthCheck isAuth={isAuth} user={user}>
                    <ShoppingLayout />
                </AuthCheck>
            ),
            children: [
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/listing",
                    element: <Listing />
                },
                {
                    path: "/checkout",
                    element: <Checkout />
                },
                {
                    path: "/account",
                    element: <Account />
                },
                {
                    path: "/search",
                    element: <Search />
                },
                {
                    path: "/payment-success",
                    element: <PaymentSuccess />
                }
            ]
        },
        {
            path: "/",
            element: <AuthCheck isAuth={isAuth} user={user} />
        },
        {
            path: "/unauthorized",
            element: <Unauthorized />
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]
}


export default routes;