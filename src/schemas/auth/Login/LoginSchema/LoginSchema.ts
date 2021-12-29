import * as yup from "yup";

export const loginValidationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username muse be more 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password muse be more 6 characters")
    .required("Password is required"),
});
