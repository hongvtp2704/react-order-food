import { FC, ReactNode } from "react";
import { useHistory } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const PrivateRoute: FC<IProps> = ({ children }: IProps) => {
  const history = useHistory();
  if (!sessionStorage.getItem("user_token")) {
    history.replace("/login");
  }
  return <>{children}</>;
};

export default PrivateRoute;
