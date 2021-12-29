import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { map } from "lodash";

import { useGetFoodByCategory } from "api/food";

import { MainPageTemplate, Spinner, BoxProduct } from "components";
import Cart from "page/Home/Cart";
import Tags from "page/Home/Tags";

type Params = {
  categoryId: string;
};

const Category: FC = () => {
  const { categoryId } = useParams<Params>();
  const {
    isLoading: fetchingFoodsByCategory,
    runRequest: fetchFoodsByCategory,
    responseData: foodsByCategory,
  } = useGetFoodByCategory({});

  useEffect(() => {
    fetchFoodsByCategory(categoryId);
  }, [categoryId, fetchFoodsByCategory]);

  return (
    <MainPageTemplate>
      <Tags />
      {fetchingFoodsByCategory ? (
        <Spinner color="var(--color-primary)" center />
      ) : (
        <div>
          <Grid container spacing={4}>
            {map(foodsByCategory?.data, (item) => (
              <Grid item md={6} xs={12} key={item.id}>
                <BoxProduct product={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      <Cart />
    </MainPageTemplate>
  );
};

export default Category;
