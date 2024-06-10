import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export default function PrivateRoute(props: PropsWithChildren) {

    return <Outlet />
}