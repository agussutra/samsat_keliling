import Dashboard from "./menuConfig/Dashboard";
import InformasiSamling from "./menuConfig/InformasiSamling";
import JadwalSamling from "./menuConfig/JadwalSamling";
import PendaftaranOffline from "./menuConfig/PendaftaranOffline";
import ProfilUser from "./menuConfig/ProfileUser";
import WajibPajak from "./menuConfig/WajibPajak";
import DaftarSamling from "./menuConfig/DaftarSamling";
import RegisStnk from "./menuConfig/RegisStnk";
import { usePage } from "@inertiajs/react";

const pagesConfig = () => {
    const page = usePage();
    const role = page?.props?.auth?.user?.role;

    const PagesConfig = [
        Dashboard,
        InformasiSamling,
        JadwalSamling,
        role === 1 ? ProfilUser : "",
        role === 1 ? WajibPajak : "",
        role === 2 ? RegisStnk : "",
        role === 2 ? PendaftaranOffline : "",
        role === 1 ? "" : DaftarSamling,
    ];
    return { page: PagesConfig };
};

export default pagesConfig;
