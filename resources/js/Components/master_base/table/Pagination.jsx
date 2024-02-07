import { Link } from "@inertiajs/react";
const Pagination = ({pagination, onClick, query}) => {
    return (
        <div className="mt-7 flex flex-col lg:justify-between lg:flex-row items-center mb-2 ">
                <div className='font-semibold text-sm dark:text-white'>
                    Showing {pagination.from} to {pagination.to} Total {pagination.total}
                </div>
                <div className='join join-horizontal lg:join-horizontal flex sm:flex'>
                    {pagination?.links?.map((link, index) => (
                        <Link
                            key={index}
                            href={`${link.url}&search=${query ? query : ''}`}
                            onClick={onClick}
                            className={`text-white py-2 px-3 text-sm join-item ${link.active ? 'bg-blue-700' : 'bg-blue-400'}`}>
                            <div
                                dangerouslySetInnerHTML={
                                    {
                                        __html: link.label
                                    }
                                }
                            />
                        </Link>
                    ))}
                </div>
            </div>
    )
};
export default Pagination;