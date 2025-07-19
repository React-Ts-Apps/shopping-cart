import { Link } from "react-router-dom";
import StepLink from "../ui/StepLink";

type CheckoutProgressProps = {
    hasItems?: boolean;
    shipping?: boolean;
    hasConfirmed?: boolean;
    hasPaid?: boolean;
};

const CheckoutGuide = ({ hasItems, shipping, hasConfirmed, hasPaid }: CheckoutProgressProps) => {
    return (
        <div className="relative w-full max-w-4xl mx-auto mt-6 px-4">
            <Link
                to="/home"
                className="absolute left-0 text-sm font-medium text-teal-700 hover:underline"
            >
                ← Back to Shopping
            </Link>
            <div className="flex justify-center gap-4 text-sm font-medium">
                <StepLink to="/home/cart" active={hasItems} completed={hasItems} label="Cart" />
                <StepLink to="/shipping" active={shipping} completed={shipping} label="Shipping" />
                <StepLink to="/confirm/order" active={hasConfirmed} completed={hasConfirmed} label="Confirm" />
                <StepLink to="/payment" active={hasPaid} completed={hasPaid} label="Payment" />
            </div>
        </div>
    );
};


export default CheckoutGuide
