import * as yup from "yup";

export const editProfileValidationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup
    .string()
    .min(3, "Name muse be more 3 characters")
    .required("Name is required"),
  phone: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
  address: yup
    .string()
    .min(20, "Address must be more than 20 characters")
    .required("Address is required"),
});
