import {React, useState} from "react";

const ButtonSubmitCreate = ({
    onClick,
    type,
    processing,
    label
}) => {
    return (
        <>
        <button 
        type={type}
        onClick={onClick}
        disabled={processing}
         className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"> 
         <div className="flex item-center mx-auto">
            <div className="mr-2 flex items-center">
            {processing && <span className="loading loading-spinner loading-xs"></span>} 
            </div>
            <div>
                {label ?? 'Simpan'}
            </div>
         </div>
         </button>
        </>
    )
};
export { ButtonSubmitCreate as default, ButtonSubmitCreate };