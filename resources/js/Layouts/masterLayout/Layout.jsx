import { Children, useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import { Link } from "@inertiajs/react";
import { HiMiniUserCircle } from "react-icons/hi2";

const Layout = ({ children }) => {

    const [isNavbarTransparant, setNavbarTransparant] = useState(true);
    const [isChecked, setChecked] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const handleToggle = (e) => {
        if (isChecked === true) {
            setChecked(false);
            setTheme('dark');
        } else {
            setChecked(true)
            setTheme('light');
        }
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        if (localTheme === 'dark') {
            document.querySelector("html").classList.add('dark');
        } else{
            document.querySelector("html").classList.remove('dark');
        }
    }, [theme])


    useEffect(() => {
        const handleScroll = () => {
            const navbarTransparent = window.scrollY === 0;
            setNavbarTransparant(navbarTransparent);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="dark:bg-c-dark bg-slate-50">
            <navbar className={`navbar bg-base-100 mb-3 mt-5 transition-all duration-100 shadow-sm rounded-lg fixed mx-3 z-10 
                ${(isNavbarTransparant && theme === 'light')? 'bg-white' : 'bg-opacity-50 shadow-sm'} 
                ${(isNavbarTransparant && theme === 'dark')? 'bg-slate-500' : 'bg-opacity-20 shadow-sm'} 
                `}>
                <div className="flex-1">
                    <label htmlFor="my-drawer" className="btn btn-ghost text-xl drawer-button dark:text-white">MENU</label>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end mr-4 ">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <HiMiniUserCircle className="text-4xl dark:text-white" />
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 dark:bg-slate-700 dark:text-white">
                            <li>
                                <a className="justify-between dark:hover:bg-white">
                                    Profile
                                </a>
                            </li>
                            <li>
                            <Link method="POST" href={route('logout')} as="button" className="dark:hover:bg-white" >
                                Logout
                            </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-none mr-6 ml-2">
                    <label className="swap swap-rotate">
                        <input type="checkbox" className="theme-controller hidden" value="synthwave" onChange={(e) => handleToggle(e.target.checked)} />
                        {isChecked ? (
                            <svg className="swap-on fill-current w-8 h-8 text-violet-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        ) : (
                            <svg className="swap-off fill-current w-8 h-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        )}
                    </label>
                    

                </div>
            </navbar>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full text-base-content bg-white dark:bg-slate-700">
                        <div className="border-b mb-3">
                            <img src="/image/logo.png" alt="Your Image" width="70%" className="mx-auto" />
                        </div>
                        <Sidebar />
                    </ul>
                </div>
            </div>
            <div className="mt-24 min-h-screen p-3 mx-4 z-20">
                {children}
            </div>
        </div>
    )
};
export default Layout;