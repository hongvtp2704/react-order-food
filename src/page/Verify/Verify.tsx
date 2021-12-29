import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Helmet from "react-helmet";

import { useTranslations } from "hooks";
import { useVerify } from "api/auth";

import { Spinner } from "components";
import { Container, RedirectButton } from "./styles";

type Params = {
  token: string;
};

const Verify: FC = () => {
  const history = useHistory();
  const { i18n } = useTranslations();
  const { token } = useParams<Params>();

  const { isLoading: loadingVerify, runRequest: verify } = useVerify({
    failureCallback: () => {
      alert("Can not verify");
    },
  });

  useEffect(() => {
    verify(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>{i18n.t("verify_page.title")}</title>
      </Helmet>
      {loadingVerify ? (
        <Spinner color="var(--color-primary)" center />
      ) : (
        <>
          <Container>
            <RedirectButton onClick={() => history.replace("/login")}>
              Redirect
            </RedirectButton>
          </Container>
        </>
      )}
    </>
  );
};

export default Verify;
