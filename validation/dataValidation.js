import * as yup from 'yup';

export const LoginPageValidation = yup.object({
  username: yup.string()
    .required("User email is required...")
    .matches(/^([a-z0-9]+@[a-z]+\.[a-z]{2,3})$/, "Email address format is wrong...")
    .max(40, "Email address should be between 3 and 40 characters")
    .min(3, "Email address should be between 3 and 40 characters"),

  password: yup.string()
    .required("Password is required...")
    .max(40, "Password should be between 8 and 40 characters")
    .min(8, "Password should be between 8 and 40 characters"),
});

export const addEmployeeValidation = yup.object({
  email: yup.string()
    .required("Email address is required...")
    .matches(/^([a-z0-9]+@[a-z]+\.[a-z]{2,3})$/, "Email address format is wrong..."),

  employeeId: yup.string()
    .required("Employee ID is required..."),

  joiningDate: yup
    .string()
    .required("Employee joining date is required..."),

  designation: yup
    .string()
    .required("Employee Designation is required..."),

  status: yup
    .string()
    .required("Employee Status is required..."),

  supervisorId: yup
    .string()
    .required("Employee Supervisor is required..."),

  partnerId: yup
    .string()
    .required("Employee partner is required...")
});