import { FC, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { map } from "lodash";

import { useGetStores } from "api/store";

import { BoxStore, Spinner } from "components";
import styles from "./styles";

const PopularStore: FC = () => {
  const classes = styles();
  const {
    isLoading: fetchingStores,
    runRequest: fetchStores,
    responseData: stores,
  } = useGetStores({});

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.wrapper}>
      {fetchingStores ? (
        <Spinner center color="var(--color-primary)" />
      ) : (
        <Grid container spacing={4}>
          {map(stores?.data, (store, index) => (
            <Grid item md={4} sm={6} xs={12} key={index}>
              <BoxStore store={store} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PopularStore;
