const ItemHorizontal = ({
    label,
    value,
    labelFontSize,
    fontSize,
    labelFontColor,
    fontColor
}) => {
    
    return (
        <>
            <div className="mb-3 flex-col">
                <div className="mb-3">
                    <span className={`${labelFontColor ?? 'text-c-secondary'} ${labelFontSize ?? 'text-base'} font-semibold dark:text-white`}>{label ? label : ''}</span>
                </div>
                <div>
                    <span className={`${fontColor ?? 'text-c-secondary'} ${fontSize ?? 'text-base'} dark:text-white`}>{value ? value : ''}</span>
                </div>
            </div>
        </>
    )
};

export { ItemHorizontal as default, ItemHorizontal };