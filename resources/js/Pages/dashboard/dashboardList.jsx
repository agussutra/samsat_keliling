import { React, useState } from "react";
import { usePage, Head, useForm } from "@inertiajs/react";
import Layout from '@/Layouts/masterLayout/Layout';
import { HeaderMenu, CardLayout } from "@/Components";
import { PiPencilSimpleLineFill } from "react-icons/pi";

const dashboardList = (props) => {
    const date = new Date();

    return (
        <>
            <Layout>
                <Head title="Dashboard" />
                <HeaderMenu namePages="DASHBOARD ADMIN" />
                <div className="w-full bg-green-400 p-4 rounded-md mb-3">
                    <div className="flex items-center">
                        <div className="mr-3">
                            <PiPencilSimpleLineFill className="dark:text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg dark:text-white">Jumlah Pendaftar Samsat Keliling {props.totalPendaftar}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-yellow-300 p-4 rounded-md mb-3">
                    <div className="flex items-center">
                        <div className="mr-3">
                            <PiPencilSimpleLineFill className="dark:text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg dark:text-white">Data Samsat Keliling Yang Sudah Selesai {props.totalSelesai}</span>
                        </div>
                    </div>
                </div>
                <CardLayout>
                    <div className="flex items-center flex-col mb-4">
                        <span className="font-bold text-lg dark:text-white">Permohonan Samsat Keliling Counter X</span>
                        <span className="font-bold text-center dark:text-white">({date.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })})</span>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center border dark:text-white">Nomor Antrian</th>
                                <th className="text-center border dark:text-white">Daftar</th>
                                <th className="text-center border dark:text-white">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props?.pendaftaranSamsat?.map((data, i) => {
                                return (
                                    <>
                                        <tr>
                                            <td className="text-center border dark:text-white">{data.kode_pendaftaran}</td>
                                            <td className="text-center border dark:text-white">{data.tipe_pendaftaran}</td>
                                            <td className="text-center border dark:text-white">{data.status_antrian === 1 ? 'Belum Diproses' : (data.status_antrian === 2 ? 'Sedang Diproses' : 'Selesai')}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </CardLayout>
            </Layout>
        </>
    )
};
export default dashboardList;