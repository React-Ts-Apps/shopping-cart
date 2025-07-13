import { useDispatch, useSelector } from "react-redux"
import UserForm from "./UserForm"
import type { RootState } from "../../redux/store"
import { useUpdateProfileMutation } from "../../services/authApi"
import { fetchError } from "../../utils/fetchError"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { useEffect } from "react"
import { showToast } from "../../utils/showToast"
import { setCredentials } from "../../redux/features/user/authSlice"
import { useNavigate } from "react-router-dom"

const UpdateProfile = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const [updateProfile, { isLoading, isError, error }] = useUpdateProfileMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
            fetchError(error as FetchBaseQueryError);
            return
        }

    }, [error, isError, isLoading]);

    const updateForm = async (formData: FormData) => {
        try {
            const res = await updateProfile(formData).unwrap();
            dispatch(setCredentials(res.user))
            showToast.success('Updated Successfully')
            navigate('/profile', { replace: true })
        } catch (err) {
            console.error(err);
            showToast.error('Updation failed')
        }
    }

    return (
        <UserForm
            initialValues={{ name: user?.name || '', email: user?.email || '', avatar: user?.avatar }}
            onSubmit={updateForm}
            isLoading={isLoading}
            buttonLabel="Update Profile"
        />
    )

}
export default UpdateProfile