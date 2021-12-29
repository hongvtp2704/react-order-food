import { FC, useEffect } from "react";
import Helmet from "react-helmet";
import { Typography, Grid } from "@mui/material";
import { map } from "lodash";
import { useParams } from "react-router-dom";

import { useTranslations } from "hooks";
import { useGetFoods, useGetFoodsByStore } from "api/food";

import { BoxProduct, MainPageTemplate } from "components";

type Params = {
  storeId?: string;
};

const History: FC = () => {
  const { i18n } = useTranslations();

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
    <>
      <Helmet>
        <title>{i18n.t("history_page.title")}</title>
      </Helmet>
      <MainPageTemplate>
        {fetchingFoods || fetchingFoodsByStore ? (
          <Typography>{i18n.t("history_page.dont_have_order")}</Typography>
        ) : (
          <Grid container spacing={4}>
            {map(storeId ? foodsByStore?.data : foods?.data, (item, index) => (
              <Grid item md={6} xs={12} key={index}>
                <BoxProduct hideButton={true} product={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </MainPageTemplate>
    </>
  );
};

export default History;
