const ButtonSubmitDelete = ({
    onClick,
    type,
    processing
}) => {
    return (
        <>
        <button 
        type={type}
        onClick={onClick}
         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"> 
         <div className="flex item-center mx-auto">
            <div className="mr-2 flex items-center">
            {processing && <span className="loading loading-spinner loading-xs"></span>} 
            </div>
            <div>
                Hapus
            </div>
         </div>
         </button>
        </>
    )
};
export { ButtonSubmitDelete as default, ButtonSubmitDelete };