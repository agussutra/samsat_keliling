const TheadCustom = ({children, style}) => {
    return (
        <thead className={style}>
            {children}
        </thead>
    )
};
export { TheadCustom as default, TheadCustom };