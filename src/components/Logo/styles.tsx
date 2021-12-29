import { styled } from "@material-ui/core";

interface IProps {
  margin?: string;
}
export const LogoStyled = styled("img")(({ margin }: IProps) => ({
  margin: margin || 0,
}));
