import pagesConfig from "@/config/PagesConfig";
import { Link, usePage } from "@inertiajs/react";

const sidebar = () => {
    const menu = pagesConfig().page;
    const page = usePage();

    return (
        <>
            {menu?.map((data, i) =>
                data.sub_menu && data.sub_menu.length > 0 ? (
                    <li key={i}>
                        <details open className="dark:text-white">
                            <summary>
                                <span className="text-lg mr-4 dark:text-white">
                                    {data.icon}
                                </span>
                                <p className="text-md font-semibold dark:text-white">
                                    {data.name}
                                </p>
                            </summary>
                            <ul className="dark:text-white">
                                {data?.sub_menu?.map((submenu, j) => (
                                    <li
                                        key={j}
                                        className="dark:text-white dark:hover:bg-white dark:rounded-md"
                                    >
                                        <a
                                            className="active:text-white"
                                            href={submenu.link}
                                        >
                                            {submenu.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ) : (
                    data !== "" && (
                        <li className="mb-2" key={i}>
                            <div
                                className={`flex ${
                                    data.link === page.url
                                        ? "bg-blue-500 text-white"
                                        : ""
                                }`}
                            >
                                <span className="text-lg mr-4 dark:text-white">
                                    {data.icon}
                                </span>
                                <Link
                                    href={data.link}
                                    className="text-md font-semibold dark:text-white"
                                >
                                    {data.name}
                                </Link>
                            </div>
                        </li>
                    )
                )
            )}
        </>
    );
};
export default sidebar;
