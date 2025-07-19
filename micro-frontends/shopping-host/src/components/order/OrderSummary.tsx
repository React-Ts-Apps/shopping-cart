import Button from "../ui/Button";

type OrderSummaryProps = {
    cartCount: number;
    cartSum: number;
    shippingPrice?: number;
    taxValue?: number;
    totalPrice?: number;
    buttonText?: string;
    onClick?: () => void;
    showBreakdown?: boolean;
}

const OrderSummaryBox = ({
    cartCount,
    cartSum,
    shippingPrice,
    taxValue,
    totalPrice,
    buttonText,
    onClick,
    showBreakdown = false
}: OrderSummaryProps) => {
    const showShipping = typeof shippingPrice === 'number';
    const showTax = typeof taxValue === 'number';
    const showTotal = typeof totalPrice === 'number';

    return (
        <div className="p-6 border border-gray-300 text-center rounded shadow-lg pl-8 font-serif h-fit bg-white max-w-sm">
            <h4 className="text-xl font-semibold mb-6 text-left">Order Summary</h4>
            <hr className="border-gray-300 mb-6" />

            <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{cartCount} Items</span>
            </div>

            <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-600">Est. total:</span>
                <span className="font-semibold">kr {cartSum.toFixed(2)}</span>
            </div>

            {showBreakdown && (
                <>
                    {showTax && (
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-gray-600">VAT:</span>
                            <span className="font-semibold">kr {taxValue!.toFixed(2)}</span>
                        </div>
                    )}

                    {showShipping && (
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="font-semibold">kr {shippingPrice}</span>
                        </div>
                    )}

                    {showTotal && (
                        <div className="flex justify-between mb-6 text-base">
                            <span className="text-gray-700 font-semibold">Total:</span>
                            <span className="text-lg font-bold text-teal-800">kr {totalPrice!.toFixed(2)}</span>
                        </div>
                    )}
                </>
            )}

            {buttonText && onClick && (
                <div className="flex justify-center">
                    <Button id="confirm_btn" onClick={onClick} text={buttonText} />
                </div>
            )}
        </div>
    )
}

export default OrderSummaryBox
