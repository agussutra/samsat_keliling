const HeaderMenu = ({namePages}) => {
    return (
        <div className="flex justify-between mb-7 ml-2 border-b dark:text-white">
            <div className="font-bold text-xl uppercase mt-3 ">
                {namePages}
            </div>
        </div>
    )
};
export { HeaderMenu as default, HeaderMenu };