const InputForm = ({
    label,
    name,
    value,
    errors,
    width,
    onChange,
    type,
    disabled
}) => {

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="items-center mb-3 ml-1 w-full">
            <span className="text-c-secondary font-semibold text-base dark:text-white">{label}</span>
            <input 
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled} 
            className={`input input-bordered input-info ${width ?? 'w-full'} mt-2 mb-1 dark:bg-slate-700 dark:text-white`}/>
           {errors && <span className="text-red-400 text-sm">{errors} !</span>}
        </div>
    )
};

export { InputForm as default, InputForm };