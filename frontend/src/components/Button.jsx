import clsx from "clsx"

const Button = ({
    label,
    primary,
    secondary,
    disabled, 
    loading,
    onClick
}) => {
    return(
        <button
            onClick={!disabled ? onClick : () => {}}
            className={clsx(`
                p-4 
                rounded-lg 
                w-full
                max-w-xs 
                mx-auto 
                flex
                flex-row
                justify-center
                text-white`, 
                primary && !disabled && "bg-sky-500 hover:bg-sky-700 cursor-pointer",
                primary && disabled && "bg-sky-300",
                disabled && "cursor-not-allowed"
                )}
            >
                <h1>{label}</h1>
                {loading && <span className="loading loading-spinner loading-sm ml-3"></span>}
        </button>
    )
}

export default Button