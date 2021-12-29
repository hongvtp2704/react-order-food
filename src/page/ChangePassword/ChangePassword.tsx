import { FC, useState } from "react";
import Helmet from "react-helmet";
import Snackbar from "@material-ui/core/Snackbar";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import { useTranslations } from "hooks";
import { changePassValidationSchema } from "schemas";
import { useChangePassword } from "api/user";
import { axiosRemoveAuthToken } from "utils";

import { Logo, MainPageTemplate, Button } from "components";
import {
  Wrapper,
  LoginWrapper,
  InputField,
  FormWrapper,
  CustomAlert,
} from "./styles";

const ChangePassword: FC = () => {
  const { i18n } = useTranslations();
  const [isErr, setErr] = useState(false);

  const history = useHistory();

  const { isLoading: changingPassword, runRequest: changePassword } =
    useChangePassword({
      successCallback: () => {
        sessionStorage.clear();
        axiosRemoveAuthToken();
        history.replace("/login");
      },
    });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
    },
    validationSchema: changePassValidationSchema,
    onSubmit: (values) => {
      changePassword(
        { oldpassword: values.oldPassword, password: values.password },
        sessionStorage.getItem("user_id") as string
      );
    },
  });

  return (
    <>
      <Helmet>
        <title>{i18n.t("change_pass_page.title")}</title>
      </Helmet>
      <MainPageTemplate>
        <Snackbar
          open={isErr}
          autoHideDuration={3000}
          onClose={() => setErr(false)}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <CustomAlert severity="error">
            {i18n.t("change_pass_page.message_error")}
          </CustomAlert>
        </Snackbar>
        <Wrapper>
          <Logo margin="0 0 16px 0" />
          <LoginWrapper>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <FormWrapper>
                <InputField
                  placeholder={i18n.t(
                    "change_pass_page.old_password_input_placeholder"
                  )}
                  onChange={formik.handleChange}
                  name="oldPassword"
                  error={
                    formik.touched.oldPassword && !!formik.errors.oldPassword
                  }
                  helperText={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                  value={formik.values.oldPassword}
                  type="password"
                />
                <InputField
                  placeholder={i18n.t(
                    "change_pass_page.new_password_input_placeholder"
                  )}
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  title={i18n.t("change_pass_page.button_title")}
                  isLoading={changingPassword}
                  fullWidth
                  type="submit"
                  spinnerColor="#FFF"
                  spinnerSize={10}
                />
              </FormWrapper>
            </form>
          </LoginWrapper>
        </Wrapper>
      </MainPageTemplate>
    </>
  );
};

export default ChangePassword;
