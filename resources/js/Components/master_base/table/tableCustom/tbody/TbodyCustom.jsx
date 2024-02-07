const TbodyCustom = ({children, style}) => {
    return (
        <tbody className={style}>
            {children}
        </tbody>
    )
};
export { TbodyCustom as default, TbodyCustom };