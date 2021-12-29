import { IRoute } from "models/types";
import { Login, Signup, Verify, NotFound } from "page";

export const AuthRoute: IRoute[] = [
  {
    Component: Login,
    exact: true,
    path: "/login",
    hasLogin: true,
  },
  {
    Component: Signup,
    exact: true,
    path: "/signup",
  },
  {
    Component: Verify,
    exact: true,
    path: "/verify/:token",
  },
  {
    Component: NotFound,
    exact: true,
    path: "/notfound",
  },
];
