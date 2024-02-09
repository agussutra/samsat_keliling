import { Children } from "react";
import { useState } from "react";

const Accordion = ({ children, label }) => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    };

    return (
        <>
            <div className="flex-col">
                <div className="collapse collapse-arrow bg-slate-200 mb-3" onClick={handleClick}>
                    <input type="radio" name="my-accordion-2" checked={show} />
                    <div className="collapse-title text-xl font-medium flex mr-2 items-center">
                        <svg className="w-5 h-5 me-2 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                        <span className="text-slate-600 text-base lg:text-xl">{label}</span>
                    </div>
                    <div className="collapse-content">
                       {children}
                    </div>
                </div>
            </div>
        </>
    )
};
export { Accordion as default, Accordion };