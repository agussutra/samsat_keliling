const CardLayout = ({children}) => {
    return (
        <div className="">
            <div className="card bg-base-100 shadow-xl relative dark:bg-slate-700">
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
};
export { CardLayout as default, CardLayout };