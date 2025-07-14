import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

type StepLinkProps = {
    to: string;
    label: string;
    active?: boolean;
    completed?: boolean;
};

const StepLink = ({ to, label, active, completed }: StepLinkProps) => (
    <Link to={to} className="flex flex-col items-center group">
        <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${completed
                ? "bg-orange-500 text-white border-orange-500"
                : active
                    ? "bg-white text-orange-500 border-orange-500"
                    : "bg-white border-gray-400 text-gray-400 group-hover:border-orange-500"
                }`}>
            {completed ? <FaCheck className="text-xs" /> : null}
        </div>
        <span
            className={`mt-1 text-sm ${active || completed
                ? "text-gray-800"
                : "text-gray-500 group-hover:text-orange-500"
                }`}
        >
            {label}
        </span>
    </Link>
);
export default StepLink