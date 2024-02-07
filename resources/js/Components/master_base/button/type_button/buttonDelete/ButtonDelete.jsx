import { AiFillDelete } from "react-icons/ai";
const ButtonDelete = ({onClick}) => {
    return (
        <button onClick={onClick} className="join-item btn btn-outline btn-sm btn-error"><AiFillDelete/></button>
    )
};
export { ButtonDelete as default, ButtonDelete };