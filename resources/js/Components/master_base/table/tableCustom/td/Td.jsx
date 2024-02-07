const Td = ({
    children, 
    style,
    colSpan,
    rowSpan
}) => {
    return (
        <td className={`${style} dark:text-white`} colSpan={colSpan ?? ''} rowSpan={rowSpan ?? ''}>
            {children}
        </td>
    )
};
export { Td as default, Td };