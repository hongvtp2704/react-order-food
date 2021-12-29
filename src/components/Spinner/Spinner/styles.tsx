import { styled } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

type Props = {
  bgColor?: string;
  size?: number;
};
export const SpinnerStyled = styled(CircularProgress)((props: Props) => ({
  color: props.bgColor || "#FFF",
  fontSize: props.size,
}));

type SpinerContainerProps = {
  center?: boolean;
};
export const SpinnerContainer = styled("div")((props: SpinerContainerProps) => ({
  display: props.center ? "flex" : 'block',
  justifyContent: 'center'
}));
