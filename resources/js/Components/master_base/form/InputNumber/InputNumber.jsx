import { NumericFormat } from "react-number-format";

const InputNumber = ({
    label,
    name,
    value,
    errors,
    width,
    onChange
}) => {

    return (
        
        <div className="mb-3 ml-1 flex flex-col">
            <span className={`dark:text-white text-c-secondary font-semibold text-base`}>{label}</span>
            <NumericFormat
                value={value}
                thousandSeparator
                name={name}
                onChange={onChange}
                className={`input input-bordered input-info mt-2 mb-1 ${width ?? "w-full"}`}
            />
        </div>
    )
};

export { InputNumber as default, InputNumber };