import { FC } from "react";
import { Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";

import { Store } from "models/types";

import { useStyles } from "./styles";

interface IProps {
  store?: Store;
}
const BoxProductDetail: FC<IProps> = ({ store }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <img
        src={store?.avatar || store?.avatar_placeholder || ""}
        alt=""
        className={classes.storeImg}
      />
      <Typography className={classes.storeName}>{store?.name}</Typography>
      <Typography className={classes.address}>
        <LocationOn className={classes.icon} /> {store?.address}
      </Typography>
    </div>
  );
};

export default BoxProductDetail;
