import { FC, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { map } from "lodash";
import { useParams } from "react-router-dom";

import { useGetFoods, useGetFoodsByStore } from "api/food";

import { BoxProduct, Spinner } from "components";

type Params = {
  storeId?: string;
};

const CommunityMenu: FC = () => {
  const {
    isLoading: fetchingFoods,
    runRequest: fetchFoods,
    responseData: foods,
  } = useGetFoods({});

  const {
    isLoading: fetchingFoodsByStore,
    runRequest: getFoodsByStore,
    responseData: foodsByStore,
  } = useGetFoodsByStore({});

  const { storeId } = useParams<Params>();

  useEffect(() => {
    if (storeId) {
      getFoodsByStore(storeId);
    } else {
      fetchFoods();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {fetchingFoods || fetchingFoodsByStore ? (
        <div>
          <Spinner color="var(--color-primary)" center />
        </div>
      ) : (
        <>
          <Grid container spacing={4}>
            {map(storeId ? foodsByStore?.data : foods?.data, (item, index) => (
              <Grid item md={6} xs={12} key={index}>
                <BoxProduct product={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default CommunityMenu;

