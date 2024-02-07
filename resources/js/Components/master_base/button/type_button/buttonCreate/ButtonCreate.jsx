import { AiFillPlusCircle } from "react-icons/ai";

const ButtonCreate = ({
    onClick,
    href
}) => {
    return (
       <div>
         <button href={href} onClick={onClick} className="join-item btn btn-sm bg-white hover:btn-info btn-info text-blue-400 hover:text-white dark:text-black dark:hover:text-white"><AiFillPlusCircle className="w-5 h-5" /> Create</button>
       </div>
    )
};
export { ButtonCreate as default, ButtonCreate };