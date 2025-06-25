import { toast } from "react-toastify";

export const showToast = {
    success: (msg: string) => toast.success(msg, { toastId: 'success-toast' }),
    error: (msg: string) => toast.error(msg, { toastId: 'toast-error' }),
    loading: (msg: string) => toast.loading(msg, { toastId: 'toast-loading' }),
    dismiss: (id?: string) => toast.dismiss(id)
};