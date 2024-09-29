import { useRoutes } from "react-router-dom";
import routes from "./routes";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {authCheck} from "@/store/authSlice/index.jsx";
import { Skeleton } from "@/components/ui/skeleton"


function AllRoutes() {
    const dispatch = useDispatch();
    const {isAuth, user, loading} = useSelector(state => state.auth);
    const element = useRoutes(routes(isAuth, user));

    useEffect(() => {
        dispatch(authCheck());
    }, [dispatch]);

    if(loading) {
        return <Skeleton className="w-screen h-screen" />
    }

    return (
        <>
            {element}
        </>
    )
}

export default AllRoutes;