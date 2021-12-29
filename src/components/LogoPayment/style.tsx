import { styled } from "@material-ui/core";

interface IProps {
  margin?: string;
}
export const LogoPaymentStyled = styled("img")(({ margin }: IProps) => ({
  margin: margin || 0,
}));
