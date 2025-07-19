
import { Loader } from 'lucide-react'

interface SubmitButtonProps {
    id: string;
    loading?: boolean;
    text: string;
    className?: string;
    type?: 'button' | 'submit';
    onClick?: () => void;

}

const Button = ({ id,
    loading = false,
    text,
    className = '', type = 'submit', onClick }: SubmitButtonProps) => {
    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            className={`${className ? className :
                `w-full py-3 rounded text-white items-center font-semibold text-sm transition duration-200 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-teal-700'
                }`}`}>
            {
                loading ? (
                    <>
                        <span className='text-white'>Processing..</span>
                        <Loader className='w-5 h-5 animate-spin text-gray-700' />
                    </>
                ) : text
            }</button>
    )

}
export default Button