import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    user_phone: Yup.number()
        .test(
            "is-ten-digits",
            "Number must be exactly 10 digits",
            (value) => String(value).length === 10
        )
        .required("Number must be 10 digits"),
    email: Yup.string().email('Invalid email address').required('Email is required'),    // password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    password: Yup.string().trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,}$/, "Enter Atleast One Uppercase,Lowercase,Special Character,Number").required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});