const Tr = ({
    children, 
    style,
    colSpan,
    rowSpan
}) => {
    return (
        <tr className={style} colSpan={colSpan ?? ''} rowSpan={rowSpan ?? ''}>
            {children}
        </tr>
    )
};
export { Tr as default, Tr };