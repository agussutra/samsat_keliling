import { AiFillEye } from "react-icons/ai";
const ButtonInfo = ({
    onClick,
    href
}) => {
    return (
        <button type="button" href={href} onClick={() => onClick()} className="join-item btn btn-outline btn-sm btn-info"><AiFillEye/></button>
    )
};
export { ButtonInfo as default, ButtonInfo };