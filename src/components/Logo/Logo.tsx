import { FC } from "react";

import { LogoStyled } from "./styles";

interface IProps {
  margin?: string;
}
const Logo: FC<IProps> = ({ margin }: IProps) => (
  <LogoStyled src="/logo.svg" margin={margin} />
);

export default Logo;
