import { FC, useState } from "react";
import Helmet from "react-helmet";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import { useTranslations } from "hooks";
import { useLogin } from "api/auth";
import { loginValidationSchema } from "schemas";
import { Logo } from "components";
import {
  Wrapper,
  LoginWrapper,
  LoginButton,
  ProcessLine,
  InputField,
  FormWrapper,
  Subtext,
  LinkSignUp,
  CircleLoading,
  CustomAlert,
  ButtonWrapper,
  // LinkForgotPass,
  // SubtextForgotPass,
} from "./styles";

const Login: FC = () => {
  const { i18n } = useTranslations();
  const [isErr, setErr] = useState(false);
  const history = useHistory();

  const { runRequest: sendLoginRequest, isLoading: isLoadingLogin } = useLogin({
    successCallback: (data) => {
      sessionStorage.setItem("user_token", data.data.accessToken);
      sessionStorage.setItem("user_id", data.data.id);
      sessionStorage.setItem("user_address", data.data.address);
      sessionStorage.setItem("user_name", data.data.name);
      sessionStorage.setItem("user_phone", data.data.phone);
      history.replace("/");
    },
    failureCallback: () => {
      setErr(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      if (values.username.includes("@")) {
        sendLoginRequest({
          email: values.username,
          password: values.password,
        });
      } else {
        sendLoginRequest(values);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>{i18n.t("login.title")}</title>
      </Helmet>
      <Snackbar
        open={isErr}
        autoHideDuration={3000}
        onClose={() => setErr(false)}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <CustomAlert severity="error">
          {i18n.t("login.message_error")}
        </CustomAlert>
      </Snackbar>
      <Wrapper>
        <Logo margin="0 0 16px 0" />
        <LoginWrapper>
          {isLoadingLogin && <ProcessLine />}
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <FormWrapper>
              <InputField
                placeholder={i18n.t("login.email_input_placeholder")}
                disabled={isLoadingLogin}
                onChange={formik.handleChange}
                name="username"
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
                value={formik.values.username}
              />
              <InputField
                placeholder={i18n.t("login.password_input_placeholder")}
                disabled={isLoadingLogin}
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              <ButtonWrapper>
                {isLoadingLogin ? (
                  <CircleLoading size={25} />
                ) : (
                  <LoginButton type="submit">
                    {i18n.t("login.button_title")}
                  </LoginButton>
                )}
              </ButtonWrapper>
              <Subtext>
                {i18n.t("login.sub_text")}{" "}
                <LinkSignUp onClick={() => history.replace("/signup")}>
                  {i18n.t("login.sign_up_link")}
                </LinkSignUp>
              </Subtext>
              {/* <SubtextForgotPass>
                <LinkForgotPass onClick={() => history.replace("/signup")}>
                  {i18n.t("login.forgot_password")}
                </LinkForgotPass>
              </SubtextForgotPass> */}
            </FormWrapper>
          </form>
        </LoginWrapper>
      </Wrapper>
    </>
  );
};

export default Login;
