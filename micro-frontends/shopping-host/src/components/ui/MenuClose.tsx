import { SquareX } from "lucide-react";

const MenuClose = ({ text }: { text?: string }) => {
    return (
        <div className="flex gap-6">
            <span className="font-semibold text-teal-700 text-md" >{text}</span>
            <SquareX className="text-orange-400" />
        </div>
    )
}
export default MenuClose