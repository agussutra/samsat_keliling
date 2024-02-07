import { ImSpinner2 } from 'react-icons/im';
import { useEffect, useRef, useState } from "react";
import NProgress from 'nprogress';
import { router, Link, usePage } from '@inertiajs/react';
import { BiSearch } from "react-icons/bi";
import Pagination from '../../Pagination';

const TableCustom = ({children, pagination, query, pageName}) => {

    const [isLoading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        router.get(pageName.props.ziggy.location, { page: currentPage, search }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setLoading(false),
        });
    };

    const handleClick = () => {
        setLoading(true);
        let timeout = null

        router.on('start', () => {
            timeout = setTimeout(() => { NProgress.start(), setLoading(false) }, 250);
            clearTimeout(timeout);
        })
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
            <div className="mb-4 border-b pb-5 relative flex">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Cari Data"
                        className="input input-bordered input-md max-w-xs w-[200px] pl-10 dark:bg-slate-700 dark:text-white dark:border-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BiSearch className="text-gray-500" />
                    </div>
                </div>
                <div className="ml-2">
                    <button type='submit' className="btn btn-active btn-info"><BiSearch className="text-lg" /></button>
                </div>
            </div>
            </form>
            {isLoading ? <ImSpinner2 className='mx-auto animate-spin text-blue-500 text-4xl' /> 
            : 
            <div className="overflow-x-auto">
               <table className="table table-bordered">
                    {children}
                </table>
            </div> 
            }
            <Pagination pagination={pagination} onClick={handleClick} query={query}/>
        </div>
    )
};
export { TableCustom as default, TableCustom };
