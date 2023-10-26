import * as Yup from "yup";

export const validationSchema = Yup.object({
    user_fname: Yup.string().required('First Name is required'),
    user_lname: Yup.string().required('Last Name is required'),
    user_phone: Yup.string()
        .test(
            "is-numeric",
            "Phone number can only contain numbers",
            (value) => /^\d+$/.test(value)
        )
        .matches(/^[0-9]{10}$/, {
            message: "Phone number must be exactly 10 digits",
            excludeEmptyString: true,
        })
        .required("Phone number is required")
    ,

    user_email: Yup.string().email('Invalid email address').required('Email is required'),
    user_pass: Yup.string().trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,25}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be 8-25 characters long").required("Required"),
    user_confirmPassword: Yup.string()
        .oneOf([Yup.ref('user_pass'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const LogInValidation = Yup.object({
    user_email: Yup.string().email('Invalid email address').required('Email is required'),
    user_pass: Yup.string().trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be 8-25 characters long").required("Required"),
});