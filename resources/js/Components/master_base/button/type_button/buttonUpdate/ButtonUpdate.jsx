import { AiFillEdit } from "react-icons/ai";
const ButtonUpdate = ({
    onClick,
    href
}) => {
    return (
        <>
         <button type="button" href="href" onClick={() => onClick()} className="join-item btn btn-outline btn-sm btn-warning"><AiFillEdit/></button>
        </>
    )
};
export { ButtonUpdate as default, ButtonUpdate };