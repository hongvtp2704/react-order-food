import { FC } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Store } from "models/types";

import { useStyles } from "./styles";

interface IProps {
  store: Store;
}

const BoxStore: FC<IProps> = ({ store }: IProps) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Card
        className={classes.root}
        onClick={() => history.push(`/store/${store.id}`)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={store.name}
            height="140"
            image={store.avatar || store.avatar_placeholder}
            title={store.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2" noWrap>
              {store.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
              {store.address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default BoxStore;
