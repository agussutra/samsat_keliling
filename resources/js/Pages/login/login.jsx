import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoMdMegaphone, IoMdApps } from "react-icons/io";
import { Accordion } from "@/Components";
import { FaPhone, FaFirefoxBrowser } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { InputForm } from "@/Components";

const Beranda = () => {
    return (
        <>
            <div className="mr-3 ml-3">
                <div className="font-bold text-lg font-raleway text-slate-400 mb-5">
                    <span className="text-base lg:text-lg flex justify-center lg:justify-start">TUTORIAL SAMLING</span>
                </div>
                <div className="">
                    <Accordion label="Cara Mendaftar Samsat Keliling">
                        <div>
                            <p className="text-slate-500 text-base">1. Buka Aplikasi Samsat Keliling</p>
                            <p className="text-slate-500 text-base">2. Registrasi</p>
                            <p className="text-slate-500 text-base">3. Masuk Ke Halaman Utama</p>
                            <p className="text-slate-500 text-base">4. Masuk Ke Menu Pendaftaran dan Isi Semua Formnya</p>
                            <p className="text-slate-500 text-base">5. Update Antrian Bisa Dilihat Di Halaman Dashboard</p>
                        </div>
                    </Accordion>
                    <Accordion label="Cara Mendaftar Kendaraan Bermotor">
                        <div>
                            <p className="text-slate-500 text-base">1. Buka Aplikasi Samsat Keliling</p>
                            <p className="text-slate-500 text-base">2. Registrasi</p>
                            <p className="text-slate-500 text-base">3. Masuk Ke Halaman Utama</p>
                            <p className="text-slate-500 text-base">4. Masuk Ke Menu Pendaftaran dan Isi Semua Formnya</p>
                        </div>
                    </Accordion>
                    <Accordion label="Cara Pembayaran">
                        <div>
                            <p className="text-slate-500 text-base"> Setelah Samsat Selesai Pembayaran Bisa Dilakukan Secara Cash Maupun Transfer Bank </p>
                        </div>
                    </Accordion>
                </div>
            </div>
        </>
    )
};

const Informasi = ({ children }) => {
    return (
        <>
            <div className="mr-3 ml-3">
                <div className=" bg-slate-50 shadow-lg rounded-tl-3xl rounded-br-3xl p-4 ml-2 mr-4">
                    <div className="text-slate-500 text-lg font-raleway font-bold mb-6 text-center">
                        INFORMASI <span className="text-indigo-500 italic">SAMLING</span>
                    </div>
                    <div className="text-slate-500">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
};

const HubungiKami = () => {
    return (
        <div className="mr-3 ml-3">
            <div className=" bg-slate-50 shadow-lg rounded-tl-3xl rounded-br-3xl p-4 ml-2 mr-4">
                <div className="text-slate-500 text-lg font-raleway font-bold mb-6 text-center">
                    HUBUNGI <span className="text-indigo-500 italic">KAMI</span>
                </div>
                <div className="text-slate-500">
                    <p className="mb-4">Silahkan Hubungi Kami :</p>
                    <div className="flex items-center gap-2 mb-2">
                        <span><FaPhone /></span>
                        <p className="font-bold">(0361) 262885</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span><FaFirefoxBrowser /></span>
                        <p className="font-bold">portal.bpdbali.id</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const LoginPage = ({ children, processing }) => {
    return (
        <>
            <div className="flex justify-center ">
                <div className="w-[400px] h-[350px] rounded-tl-3xl rounded-br-3xl shadow-lg p-6 bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="text-center text-white font-bold font-raleway text-xl mb-3">
                        LOG IN
                    </div>
                    <hr className="bg-white mb-3" />
                    <div>
                        {children}
                        <div className="flex items-center justify-center">
                            <div className="py-2 px-5 bg-blue-500 rounded-md hover:bg-blue-600 flex items-center gap-2 cursor-pointer">
                                <span><AiOutlineLogin className="text-white" /></span>
                                <button type="submit" className="text-white font-bold" disabled={processing}>Login</button>
                                {processing && <span className="loading loading-spinner loading-xs text-white"></span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const login = (props) => {
    const [roles, setRoles] = useState(1);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: '',
        password: ''
    });

    const handleInputChange = (name, value) => {
        setData(name, value)
    };

    const dataInformasi = props?.dataInformasi?.map((data, i) => {
        return data.informasi_samling;
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const [show, setShow] = useState(false);
    return (
        <>
        <Head title="Login" />
            <div>
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
                            <div className="mr-8 mb-8 mt-8 absolute lg:hidden z-50 bg-white">
                                <div className="w-[200px] h-[300px] rounded-md shadow-lg">
                                    <div className="pt-4 pl-4">
                                        <button className={`text-slate-400 py-2 px-2 rounded-md cursor-pointer font-bold ${roles === 1 && 'bg-blue-400 text-white'}`} onClick={() => setRoles(1)}>Beranda</button>
                                    </div>
                                    <div className="pt-4 pl-4">
                                        <button className={`text-slate-400 py-2 px-2 rounded-md cursor-pointer font-bold ${roles === 2 && 'bg-blue-400 text-white'}`} onClick={() => setRoles(2)}>Informasi</button>
                                    </div>
                                    <div className="pt-4 pl-4 mb-7">
                                        <button className={`text-slate-400 py-2 px-2 rounded-md cursor-pointer font-bold ${roles === 3 && 'bg-blue-400 text-white'}`} onClick={() => setRoles(3)}>Hubungi Kami</button>
                                    </div>
                                    <div className="flex justify-center pt-4 gap-2 mb-3">
                                        <div className="bg-slate-700 rounded-md hover:bg-slate-800">
                                            <button className="text-white py-3 px-2 rounded-md cursor-pointer" onClick={() => setRoles(4)}>Sign Up</button>
                                        </div>
                                        <div className="bg-blue-400 rounded-md hover:bg-blue-500">
                                            <button className="text-white py-3 px-2 rounded-md cursor-pointer" onClick={() => setRoles(5)}>Log In</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden lg:block w-full h-full">
                        <div className="mr-6 mt-3 ">
                            <div className=" py-4 pl-4 rounded-lg mb-[80px]">
                                <div className="flex justify-center gap-2">
                                    <div className={`text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white ${roles === 1 && 'bg-blue-500 text-white'}`}>
                                        <button onClick={() => setRoles(1)}>BERANDA</button>
                                    </div>
                                    <div className={`text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white ${roles === 2 && 'bg-blue-500 text-white'}`}>
                                        <button onClick={() => setRoles(2)}>INFORMASI</button>
                                    </div>
                                    <div className={`text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white ${roles === 3 && 'bg-blue-500 text-white'}`}>
                                        <button onClick={() => setRoles(3)}>HUBUNGI KAMI</button>
                                    </div>
                                    <div className={`text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white ${roles === 4 && 'bg-blue-500 text-white'}`}>
                                        <button onClick={() => setRoles(4)}> SIGN UP</button>
                                    </div>
                                    <div className={`text-slate-400 font-bold py-1 px-4 rounded-md font-raleway text-sm hover:bg-blue-400 hover:text-white ${roles === 5 && 'bg-blue-500 text-white'}`}>
                                        <button onClick={() => setRoles(5)}>LOGIN</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[60%] hidden lg:block">
                        <div className="p-6 flex justify-center">
                            <img src="/image/police.jpg" className="w-[400px]" alt="" />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="">
                            {
                                roles === 1 && <Beranda />
                            }
                            {
                                roles === 2 &&
                                <Informasi>
                                    <div dangerouslySetInnerHTML={{ __html: dataInformasi }} />
                                </Informasi>
                            }
                            {
                                roles === 3 && <HubungiKami />
                            }
                            {
                                roles === 5 &&
                                <form onSubmit={submit}>
                                <LoginPage processing={processing}>
                                    <div className="flex gap-2 items-center mb-3">
                                        <span className="text-white font-semibold mr-7">Email</span>
                                        <InputForm
                                            value={data.email}
                                            type="email"
                                            onChange={(value) => handleInputChange('email', value)}
                                            errors={errors.email}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center mb-8">
                                        <span className="text-white font-semibold">Password</span>
                                        <InputForm
                                            value={data.password}
                                            type="password"
                                            onChange={(value) => handleInputChange('password', value)}
                                            errors={errors.password}
                                        />
                                    </div>
                                </LoginPage>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default login;