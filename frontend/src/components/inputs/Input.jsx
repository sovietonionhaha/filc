import clsx from "clsx"

const Input = ({
    type,
    placeholder,
    className,
    id,
    onChange,
    disabled,
    value
}) => {
    return(
        <input 
            type={type || "text"} 
            onChange={onChange}
            disabled={disabled || false}
            value={value}
            id={id || undefined}
            placeholder={placeholder || "Type here..."} 
            className={clsx("input input-bordered w-full max-w-xs m-2", className)}     
        />
    )
}

export default Input