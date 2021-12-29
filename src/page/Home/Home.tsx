import { FC } from "react";
import Helmet from "react-helmet";
import { BrowserView } from "react-device-detect";

import { useTranslations } from "hooks";
import { CommunityContentId } from "models/types";

import { MainPageTemplate } from "components";
import Tags from "./Tags";
import Cart from "./Cart";
import CommunityMenu from "./CommunityMenu";
import CommunityContent from "./CommunityContent";
import PopularStore from "./PopularStore";

const Home: FC = () => {
  const { i18n } = useTranslations();
  return (
    <>
      <Helmet>
        <title>{i18n.t("home_page.title")}</title>
      </Helmet>
      <MainPageTemplate>
        <Tags />
        <Cart />
        <CommunityMenu />
        <BrowserView>
          <CommunityContent id={CommunityContentId.PROGRESS} />
        </BrowserView>
        <PopularStore />
        <BrowserView>
          <CommunityContent id={CommunityContentId.INTRO} />
        </BrowserView>
      </MainPageTemplate>
    </>
  );
};

export default Home;
