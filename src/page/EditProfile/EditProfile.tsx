import { FC, useEffect, useState } from "react";
import Helmet from "react-helmet";
import Snackbar from "@material-ui/core/Snackbar";
import { useFormik } from "formik";

import { useTranslations } from "hooks";
import { editProfileValidationSchema } from "schemas";
import { useGetInfoUser, useEditUser } from "api/user";

import { MainPageTemplate, Button } from "components";
import {
  Wrapper,
  LoginWrapper,
  InputField,
  FormWrapper,
  CustomAlert,
  ButtonWrapper,
} from "./styles";

enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
}

const EditProfile: FC = () => {
  const { i18n } = useTranslations();
  const [alert, setAlert] = useState({
    open: false,
    type: AlertType.SUCCESS,
    message: ""
  });

  const {
    runRequest: fetchUser,
    isLoading: fetchingUser,
  } = useGetInfoUser({
    successCallback: (data) => {
      formik.setValues({
        email: data.data.email,
        name: data.data.name,
        phone: data.data.phone,
        address: data.data.address,
      });
    },
  });

  const { runRequest: editUser, isLoading: updatingUser } = useEditUser({
    successCallback: () => {
      setAlert({
        open: true,
        type: AlertType.SUCCESS,
        message: i18n.t("edit_profile_page.message_success")
      });
    }
  });

  useEffect(() => {
    fetchUser(sessionStorage.getItem("user_id") as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
    },
    validationSchema: editProfileValidationSchema,
    onSubmit: (values) => {
      editUser(values, sessionStorage.getItem("user_id") as string);
    },
  });

  return (
    <>
      <Helmet>
        <title>{i18n.t("edit_profile_page.title")}</title>
      </Helmet>
      <MainPageTemplate>
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={() => {
            setAlert({ ...alert, open: false });
          }}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <CustomAlert severity={alert.type}>
            {/* {i18n.t("edit_profile_page.message_error")} */}
            {alert.message}
          </CustomAlert>
        </Snackbar>
        <Wrapper>
          <LoginWrapper>
            {/* {isLoadingLogin && <ProcessLine />} */}
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <FormWrapper>
                <InputField
                  placeholder={i18n.t(
                    "edit_profile_page.email_input_placeholder"
                  )}
                  onChange={formik.handleChange}
                  name="email"
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  value={formik.values.email}
                />
                <InputField
                  placeholder={i18n.t(
                    "edit_profile_page.name_input_placeholder"
                  )}
                  onChange={formik.handleChange}
                  name="name"
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  value={formik.values.name}
                />
                <InputField
                  placeholder={i18n.t(
                    "edit_profile_page.phone_input_placeholder"
                  )}
                  onChange={formik.handleChange}
                  name="phone"
                  error={formik.touched.phone && !!formik.errors.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                  value={formik.values.phone}
                />
                <InputField
                  placeholder={i18n.t(
                    "edit_profile_page.address_input_placeholder"
                  )}
                  onChange={formik.handleChange}
                  name="address"
                  error={formik.touched.address && !!formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                  value={formik.values.address}
                />
                <ButtonWrapper>
                  <Button
                    title={i18n.t("edit_profile_page.button_title")}
                    isLoading={updatingUser || fetchingUser}
                    type="submit"
                    fullWidth
                    spinnerColor="#FFF"
                    spinnerSize={15}
                  />
                </ButtonWrapper>
              </FormWrapper>
            </form>
          </LoginWrapper>
        </Wrapper>
      </MainPageTemplate>
    </>
  );
};

export default EditProfile;
