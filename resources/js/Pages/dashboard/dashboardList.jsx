import { React, useState } from "react";
import { usePage, Head, useForm, router } from "@inertiajs/react";
import Layout from '@/Layouts/masterLayout/Layout';
import { HeaderMenu, CardLayout, Alert, ButtonRefresh } from "@/Components";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";

const dashboardList = (props) => {
    const date = new Date();
    const role = usePage()?.props?.auth?.user?.role;

    const handleRefresh = () => {
        // router.reload({ only: ['/'] });
        // window.location.reload();
        router.visit('/');
    };

    return (
        <>
            <Layout>
                <Head title="Dashboard" />
                { role === 1 ? <HeaderMenu namePages="DASHBOARD ADMIN" /> : ''}
                { role === 1 ? (
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
                ) : "" }
                <div className="w-full bg-yellow-300 p-4 rounded-md mb-3">
                    <div className="relative flex items-center">
                        <div className="mr-3">
                            {role === 1 ? <PiPencilSimpleLineFill className="dark:text-white" /> : <IoPeople className="dark:text-white" /> }
                        </div>
                        <div>
                            <span className="font-bold text-lg dark:text-white">
                                { role === 1 ? "Data Samsat Keliling Yang Sudah Selesai " + props.totalSelesai : "Antrian Samsat Keliling" }
                            </span>
                        </div>
                        <div className="absolute inset-y-0 right-0">
                            <ButtonRefresh onClick={() => {
                                handleRefresh();
                            }}/>
                        </div>
                    </div>
                </div>

                {role === 1 ? (
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
                                                <td className="text-center border dark:text-white">{data.status_antrian === 1 ? 'Belum Dipanggil' : (data.status_antrian === 2 ? 'Sedang Diproses' : 'Selesai')}</td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardLayout>
                ) : (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8">
                            <CardLayout>
                                <div className="flex items-center flex-col mb-4">
                                        <span className="font-bold text-xl dark:text-white">Permohonan Samsat Keliling Counter X</span>
                                        <span className="font-bold text-center dark:text-white">({date.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })})</span>
                                </div>
                                <table className="table table-bordered table-auto">
                                    <thead>
                                        <tr>
                                            <th className="text-center border dark:text-white text-black text-base">Nomor Antrian</th>
                                            <th className="text-center border dark:text-white text-black text-base">Daftar</th>
                                            <th className="text-center border dark:text-white text-black text-base">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props?.pendaftaranSamsat?.map((data, i) => {
                                            if (data.status_antrian == 1) {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className="text-center border dark:text-white">{data.kode_pendaftaran}</td>
                                                            <td className="text-center border dark:text-white">{data.tipe_pendaftaran}</td>
                                                            <td className="text-center border dark:text-white">{data.status_antrian === 1 ? 'Belum Dipanggil' : ""}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </CardLayout>   
                        </div>
                        <div className="col-span-4">
                            <CardLayout>
                                <div className="flex items-center flex-col mb-4">
                                    <span className="font-bold text-xl dark:text-white">Counter X</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-10">
                                    <div className="col-span-1 mb-8 dark:text-white">Nama</div>
                                    <div className="col-span-2 mb-8 dark:text-white border-b-2 border-black dark:border-white dark:text-white">{props?.pendaftaranSedangDiproses?.name}</div>
                                    <div className="col-span-1 mb-8 dark:text-white">Nomor Antrian</div>
                                        <div className="col-span-2 mb-8 dark:text-white border-b-2 border-black dark:border-white">{props?.pendaftaranSedangDiproses?.kode_pendaftaran}</div>
                                    
                                    <div className="bg-blue-300 p-4 rounded-md text-center dark:text-white rounded-r-[100px] mt-8">Sedang Diproses</div>
                                </div>
                            </CardLayout>   
                        </div>
                    </div>
                )}
            </Layout>
        </>
    )
};
export default dashboardList;