const ModalPrint = ({
    children,
    title,
    onClose,
    processing,
    type,
    onClick
}) => {
    return (
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0  bg-gray-500 dark:bg-slate-500 dark:bg-opacity-50 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <h3 className="text-base font-semibold leading-6 mt-2 ml-2 pt-2 pl-2 mb-2 dark:text-white" id="modal-title">PRINT {title}</h3>
                            <hr />
                            <div className="bg-white px-4 pb-4 pt-5 overflow-visible dark:bg-slate-700">
                                {children}
                            </div>
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 bg-gray-50 dark:bg-gray-600 gap-2">
                                <button
                                    type={type}
                                    onClick={onClick}
                                    className="btn btn-info btn-md">
                                    <div className="flex item-center mx-auto">
                                        <div className="mr-2 flex items-center">
                                            {processing && <span className="loading loading-spinner loading-xs"></span>}
                                        </div>
                                        <div>
                                            Print
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="btn btn-md">
                                    <div className="flex item-center mx-auto">
                                        <div>
                                            Close
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export { ModalPrint as default, ModalPrint };