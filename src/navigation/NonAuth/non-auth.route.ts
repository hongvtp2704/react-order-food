import { IRoute } from "models/types";
import { Verify } from "page";

export const NonAuthRoutes: IRoute[] = [
    {
        exact: true,
        path: "/verify/:token",
        Component: Verify
    }
]