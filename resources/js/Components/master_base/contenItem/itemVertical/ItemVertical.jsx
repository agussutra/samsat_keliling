const ItemVertical = ({
    label,
    value,
    labelFontSize,
    fontSize,
    labelFontColor,
    fontColor,
    widht,
}
) => {
    return (
        <>
            <div className="flex mb-2">
                <div className={`mr-3 ${widht ?? 'w-[100px]'} `}>
                    <span className={`${labelFontColor ?? 'text-c-secondary'} dark:text-white ${labelFontSize ?? 'text-base'} font-semibold text-left`}>{label ? label : ''}</span>
                </div>
                <div>
                    <span className={`${fontColor ?? 'text-c-secondary'} dark:text-white ${fontSize ?? 'text-base'}`}>: {value ? value : ''}</span>
                </div>
            </div>
        </>
    )
};
export { ItemVertical as default, ItemVertical };