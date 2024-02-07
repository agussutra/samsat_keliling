import { MdDashboard } from "react-icons/md";

export const MasterProfile = {
    link: "",
    name: "Master Content",
    icon: <MdDashboard/>,
    sub_menu: [
        {
            link: "/user",
            name: "Profile",
        },
        {
            link: "",
            name: "Content",
        }
    ],
};

export default MasterProfile;