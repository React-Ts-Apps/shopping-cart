
import type { StripeFieldProps } from "../../types"
import { stripeFieldOptions } from "./stripeStyles"

const StripeField = ({ label, id, Element }: StripeFieldProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="w-full border h-10 border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500">
                <Element id={id} options={stripeFieldOptions} />
            </div>
        </div>
    )
}
export default StripeField