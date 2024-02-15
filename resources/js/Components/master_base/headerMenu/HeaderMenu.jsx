const HeaderMenu = ({ namePages, position, transform }) => {
    return (
        <div
            className={`${
                "flex mb-7 ml-2 border-b dark:text-white " + position
            }`}
        >
            <div className={`${"font-bold text-xl mt-3 " + transform}`}>
                {namePages}
            </div>
        </div>
    );
};
export { HeaderMenu as default, HeaderMenu };
