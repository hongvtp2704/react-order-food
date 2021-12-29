import * as yup from "yup";

export const changePassValidationSchema = yup.object({
  oldPassword: yup.string().required("Old password is required"),
  password: yup
    .string()
    .min(6, "New password muse be more 6 characters")
    .required("New password is required"),
});
