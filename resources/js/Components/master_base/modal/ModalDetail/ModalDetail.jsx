const ModalDetail = ({ 
    children, 
    title, 
    onClose
    }) => {
    return (
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0  bg-gray-500 dark:bg-slate-500 dark:bg-opacity-50 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <h3 className="text-base font-semibold leading-6 mt-2 ml-2 pt-2 pl-2 mb-2 dark:text-white" id="modal-title">DETAIL {title}</h3>
                        <hr />
                        <div className="bg-white px-4 pb-4 pt-5 overflow-visible dark:bg-slate-700">
                                {children}
                            </div>
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 bg-gray-50 dark:bg-gray-600">
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export { ModalDetail as default, ModalDetail };