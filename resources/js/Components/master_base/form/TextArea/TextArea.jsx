const TextArea = ({ label, name, onChange, value, errors }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };
    return (
        <>
            <div className="flex flex-col mb-3">
                <span
                    className={`dark:text-white text-c-secondary font-semibold text-base mb-3`}
                >
                    {label}
                </span>
                <textarea
                    className="textarea textarea-info w-full dark:bg-slate-700 dark:text-white"
                    name={name ?? ""}
                    value={value ?? ""}
                    onChange={handleChange}
                    placeholder={`${label ? "Input " + label : ""}`}
                >
                    {value ?? ""}
                </textarea>
                {errors && (
                    <span className="text-red-400 text-sm">{errors} !</span>
                )}
            </div>
        </>
    );
};
export { TextArea as default, TextArea };
