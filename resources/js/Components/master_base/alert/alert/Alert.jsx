import { React, useState, useEffect } from "react";


const AlertSuccess = ({message, onHide}) => {
    return (
        <>
        <div className="fixed top-4 right-4 z-50">
            <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-teal-200 rounded-lg shadow 0 wiggle" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 text-green-400 bg-green-100 rounded-lg ">
                    <svg className="w-5 h-5 animate-ping-slow " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                </div>
                <div className="flex flex-col justify-start mr-6 ml-3">
                        <div className="ms-3 mb-1 text-base font-semibold text-green-800">Success</div>
                        <div className="ms-3 text-sm font-normal text-green-800">{message} !</div>
                    </div>
                <button type="button" onClick={onHide} className="ms-auto -mx-1.5 -my-1.5 bg-teal-200 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-teal-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    </>
    )
}; 

const AlertError = ({message, onHide}) => {
    return (
        <>
        <div className="fixed top-4 right-4 z-50">
                    <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-red-200 rounded-lg shadow 0 wiggle" role="alert" style={{ willChange: 'transform' }}>
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 text-red-400 bg-red-100 rounded-lg  ">
                            <svg className="w-5 h-5 animate-ping-slow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-start mr-6 ml-3">
                            <div className="ms-3 mb-1 text-base font-semibold text-red-800">Error</div>
                            <div className="ms-3 text-sm font-normal text-red-800">{message} !</div>
                        </div>
                        <button type="button" onClick={onHide} className="ms-auto -mx-1.5 -my-1.5 bg-red-200 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
        </>
    )
};


const Alert = ({message, variant, show, onHide}) => {

    if (show) {
        return variant === "success" ? (
            <AlertSuccess message={message} onHide={onHide} />
        ) : (
            <AlertError message={message} onHide={onHide} />
        );
    } else {
        return null;
    }
   
};

export { Alert as default, Alert };
