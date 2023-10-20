import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    user_fname: Yup.string().required('First Name is required'),
    user_lname: Yup.string().required('Last Name is required'),
    user_phone: Yup.number()
        .test(
            "is-ten-digits",
            "Number must be exactly 10 digits",
            (value) => String(value).length === 10
        )
        .required("Number must be 10 digits"),
    user_email: Yup.string().email('Invalid email address').required('Email is required'),    // password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    user_pass: Yup.string().trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,}$/, "Enter Atleast One Uppercase,Lowercase,Special Character,Number").required("Required"),
    user_confirmPassword: Yup.string()
        .oneOf([Yup.ref('user_pass'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});