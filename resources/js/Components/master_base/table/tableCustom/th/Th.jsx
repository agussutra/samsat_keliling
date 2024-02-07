const Th = ({
    children, 
    style,
    colSpan,
    rowSpan
}) => {
    return (
        <td className={`${style} dark:text-white`} colSpan={colSpan ?? 0} rowSpan={rowSpan ?? 0}>
            {children}
        </td>
    )
};
export { Th as default, Th };