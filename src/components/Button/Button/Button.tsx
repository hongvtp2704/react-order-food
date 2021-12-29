import { FC } from "react";
import { Button as ButtonComponent } from "@material-ui/core";

import { Spinner } from "components";

import styles from "./styles";

type Props = {
  title: string;
  onClick?: () => void;
  isLoading: boolean;
  className?: string;
  type?: "submit" | "button";
  fullWidth?: boolean;
  spinnerColor?: string;
  spinnerSize?: number;
};

const Button: FC<Props> = ({
  title,
  onClick,
  isLoading,
  className,
  type,
  fullWidth,
  spinnerColor,
  spinnerSize,
}: Props) => {
  const classes = styles();

  return (
    <ButtonComponent
      onClick={onClick}
      className={`${className} ${classes.button}`}
      type={type || "button"}
      fullWidth={fullWidth}
    >
      {isLoading ? <Spinner color={spinnerColor} size={spinnerSize} /> : title}
    </ButtonComponent>
  );
};

export default Button;
