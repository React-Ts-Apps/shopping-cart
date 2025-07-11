import { useEffect } from "react";

import { useRegisterMutation } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/user/authSlice";
import { fetchError } from "../../utils/fetchError";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/showToast";
import UserForm from "./UserForm";

const RegisterForm = () => {
    const [register, { isLoading, isError, error }] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    useEffect(() => {
        if (isAuthenticated) {
            showToast.success('Registered Successfully!')
            navigate('/home')
        }
        if (isError) {
            fetchError(error as FetchBaseQueryError);
            return
        }

    }, [error, isAuthenticated, isError, isLoading, navigate]);


    const registerForm = async (formData: FormData) => {
        try {
            const res = await register(formData).unwrap();
            dispatch(setCredentials(res.user));
        } catch (err) {
            console.error(err);
            showToast.error('Registration failed')
        }
    }

    return (
        <UserForm
            initialValues={{ name: '', password: '', email: '' }}
            showPasswordField={true}
            onSubmit={registerForm}
            isLoading={isLoading}
            buttonLabel="Register"
        />
    );
}
export default RegisterForm