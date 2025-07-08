import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { showToast } from "./showToast"

export function fetchError(error: FetchBaseQueryError) {
    const message = typeof error.data == 'object' &&
        error.data != null &&
        'message' in error.data ?
        (error.data as { message: string }).message : 'Unknown error'
    showToast.error(message)
}