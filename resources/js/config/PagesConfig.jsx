import Dashboard from "./menuConfig/Dashboard";
import InformasiSamling from "./menuConfig/InformasiSamling";
import JadwalSamling from "./menuConfig/JadwalSamling";
import PendaftaranOffline from "./menuConfig/PendaftaranOffline";
import ProfilUser from "./menuConfig/ProfileUser";
import WajibPajak from "./menuConfig/WajibPajak";
import DaftarSamling from "./menuConfig/DaftarSamling";
import { usePage } from "@inertiajs/react";

const pagesConfig = () => {
    const page = usePage();
    const role = page.props.auth.user.role;

    const PagesConfig = [
        Dashboard,
        InformasiSamling,
        JadwalSamling,
        role === 1 ? ProfilUser : "",
        WajibPajak,
        role === 1 ? PendaftaranOffline : "",
        DaftarSamling,
    ];
    return { page: PagesConfig };
};

export default pagesConfig;
