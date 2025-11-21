import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  identifier: Yup.string()
    .required("Username is required!")
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters"),
  password: Yup.string()
    .required("Password is required!")
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters"),
});
