import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { useGetStore } from "api/store";

import { MainPageTemplate, BoxProductDetail, Spinner } from "components";
import Cart from "page/Home/Cart";
import CommunityMenu from "page/Home/CommunityMenu";

import { Wrapper, Suggest, CloseWrapper } from "./styles";

type Params = {
  storeId: string;
};

const ProductDetail: FC = () => {
  const { storeId } = useParams<Params>();
  const {
    isLoading: fetchingStore,
    runRequest: fetchStore,
    responseData: store,
  } = useGetStore({});

  useEffect(() => {
    fetchStore(storeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  return (
    <div>
      <MainPageTemplate>
        <Wrapper>
          {fetchingStore ? (
            <Spinner center color="var(--color-primary)" />
          ) : (
            <>
              <BoxProductDetail store={store?.data} />
              <Cart />
              {store?.data?.status ? (
                <>
                  <Suggest>
                    <CommunityMenu></CommunityMenu>
                  </Suggest>
                </>
              ) : (
                <CloseWrapper>
                  <Typography>Cửa hàng đã đóng cửa</Typography>
                </CloseWrapper>
              )}
            </>
          )}
        </Wrapper>
      </MainPageTemplate>
    </div>
  );
};

export default ProductDetail;
