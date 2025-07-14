import StepLink from "../ui/StepLink";

type CheckoutProgressProps = {
    hasItems?: boolean;
    shipping?: boolean;
    hasConfirmed?: boolean;
    hasPaid?: boolean;
};

const CheckoutGuide = ({ hasItems, shipping, hasConfirmed, hasPaid }: CheckoutProgressProps) => {
    return (
        <div className="w-full max-w-1/3 mx-auto mt-6 px-4">
            <div className="flex justify-between text-sm text-center font-medium">
                <StepLink to="/home/cart" active={hasItems} completed={hasItems} label="Cart" />
                <StepLink to="/shipping" active={shipping} completed={shipping} label="Shipping" />
                <StepLink to="/confirm/order" active={hasConfirmed} completed={hasConfirmed} label="Confirm" />
                <StepLink to="/payment" active={hasPaid} completed={hasPaid} label="Payment" />
            </div>
        </div>
    );

}

export default CheckoutGuide
