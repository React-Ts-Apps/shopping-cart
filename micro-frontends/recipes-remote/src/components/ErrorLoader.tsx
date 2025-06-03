const ErrorLoader = ({ message }: { message: string }) => {
    return (
        <div className="flex justify-center font-semibold  text-red-600 p-30">
            <span className="animate-pulse">
                {message}
            </span>
        </div>
    )
}
export default ErrorLoader