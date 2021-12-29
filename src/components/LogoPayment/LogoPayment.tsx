import { FC } from "react";
import { LogoPaymentStyled } from "./style";

interface IProps {
  margin?: string;
}

const LogoPayment: FC<IProps> = ({ margin }: IProps) => (
  <LogoPaymentStyled src="./assets/img/logopayment.png" margin={margin} />
);

export default LogoPayment;
