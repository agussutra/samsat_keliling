import { RiRefreshLine } from "react-icons/ri";
const ButtonRefresh = ({
    onClick,
    href
}) => {
    return (
        <button type="button" href={href} onClick={() => onClick()} className="join-item btn btn-outline btn-sm"><RiRefreshLine/>Refresh</button>
    )
};
export { ButtonRefresh as default, ButtonRefresh };