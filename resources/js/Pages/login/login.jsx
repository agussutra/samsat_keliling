import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Beranda = () => {
    return (
        <>
            <div>
                TEST
            </div>
        </>
    )
}

const login = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="w-full h-full flex gap-2">
                <div className="w-[60%] mt-3">
                    <div className="py-4 pl-4 flex items-center justify-between relative">
                        <div className="flex items-center">
                            <img src="/image/samsat_logo.png" alt="Your Image" className="h-[80px] w-[100px] ml-4 mr-5" />
                            <span className="bg-gradient-to-r from-blue-700 via-indigo-950 to-indigo-400 text-transparent bg-clip-text text-xl font-bold font-raleway dark:via-white dark:to-indigo-400 hidden lg:block">Samsat Keliling</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end mt-3 mr-5 relative lg:hidden">
                    {show === false ? (
                        <GiHamburgerMenu className="text-3xl cursor-pointer" onClick={() => setShow(true)} />
                    ) : (
                        <IoMdClose className="text-3xl cursor-pointer" onClick={() => setShow(false)} />
                    )}
                    {show && (
                    <div className="mr-8 mb-8 mt-8 absolute lg:hidden z-10">
                        <div className="w-[200px] h-[220px] rounded-md shadow-lg">
                            <div className="pt-4 pl-4">
                                <span className="bg-blue-400 text-white py-2 px-2 rounded-md cursor-pointer font-bold">Beranda</span>
                            </div>
                            <div className="pt-4 pl-4">
                                <span className="text-slate-400 py-2 px-2 rounded-md cursor-pointer hover:bg-blue-400 hover:text-white font-bold">Informasi</span>
                            </div>
                            <div className="pt-4 pl-4 mb-7">
                                <span className="text-slate-400 py-2 px-2 rounded-md cursor-pointer hover:bg-blue-400 hover:text-white font-bold">Hubungi Kami</span>
                            </div>
                            <div className="flex justify-center pt-4 gap-2 mb-3">
                            <div className="bg-slate-700 rounded-md hover:bg-slate-800">
                                <span className="text-white py-3 px-2 rounded-md cursor-pointer">Sign Up</span>
                            </div>
                            <div className="bg-blue-400 rounded-md hover:bg-blue-500">
                                <span className="text-white py-3 px-2 rounded-md cursor-pointer">Log In</span>
                            </div>
                            </div>
                        </div>
                    </div> 
                    )}
                </div>

                <div className="w-full h-full mr-6 mt-3 hidden lg:block">
                    <div className="bg-slate-100 py-4 pl-4 rounded-lg mb-[80px]">
                        <div className="flex justify-center gap-2">
                            <div className=" text-white font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white bg-blue-400">
                                BERANDA
                            </div>
                            <div className=" text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white">
                                INFORMASI
                            </div>
                            <div className=" text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white">
                                HUBUNGI KAMI
                            </div>
                            <div className=" text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white">
                                SIGN UP
                            </div>
                            <div className=" text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white">
                                LOGIN
                            </div>
                        </div>
                    </div>
                    <div className="ml-3">
                        <Beranda/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default login;