import { Link, Head, usePage, useForm, router} from '@inertiajs/react';
import { useState, useEffect } from "react";
import Layout from '@/Layouts/masterLayout/Layout';
import {
    HeaderMenu,
    CardLayout,
    Alert,
    ButtonSubmitCreate,
    ButtonSubmitUpdate
} from "@/Components"
import PendaftaranOfflineContent from './__content__/PendaftaranOfflineContent';

const pendaftaranOfflineForm = (props) => {

    const [alert, setAlert] = useState({
        variant: "",
        show: false,
        message: ""
    });

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nama: '',
        alamat: '',
        no_tlp: '',
        plat_kendaraan: '',
        tipe_kendaraan: '',
        no_stnk: '',
        masa_berlaku: '',
        jadwal_id: '',
        kode_pendaftaran: props?.kodePendaftaran,
        status_antrian: 1,
        tgl_pendaftaran: '',
        tipe_pendaftaran: 'offline',
    });

    function submit(e) {
        e.preventDefault();

        post('/pendaftaran_offline', {
            onSuccess: () => {
                    setAlert({ ...alert, variant: "success", show: true, message: "Data Berhasil Ditambah" }),
                    reset();
            },
            onError: (error) => {
                setAlert({ ...alert, variant: "error", show: true, message: "Data Gagal Ditambah" });
            }
        });
    };

    const onClickHandle = () => {
        router.get('/pendaftaran_offline');
    }

    return (
        <>
            <Layout>
            <Alert
                    message={alert.message}
                    variant={alert.variant}
                    show={alert.show}
                    onHide={() => setAlert({ ...alert, show: false })}
                />
                <Head title={props.title} />
                <HeaderMenu namePages={props.title} />
                <CardLayout>
                    <form onSubmit={submit}>
                        <div className='mx-auto w-full lg:grid lg:grid-cols-2 lg:gap-3 lg:justify-between'>
                            <div className='mb-3 '>
                                <h1 className='text-lg font-bold mb-2 dark:text-white'>Wajib Pajak <span className='text-red-500'>*</span></h1>
                                <CardLayout>
                                    <PendaftaranOfflineContent
                                        action="FORM1"
                                        dataForm={data}
                                        setData={setData}
                                        formError={errors}
                                        dataJadwal={props.dataJadwal}
                                    />
                                </CardLayout>
                            </div>
                            <div className='mb-3'>
                                <h1 className='text-lg font-bold mb-2 dark:text-white'>Pendaftaran Wajib Pajak <span className='text-red-500'>*</span></h1>
                                <CardLayout>
                                    <PendaftaranOfflineContent
                                        action="FORM2"
                                        dataForm={data}
                                        setData={setData}
                                        formError={errors}
                                        dataJadwal={props.dataJadwal}
                                    />
                                </CardLayout>
                            </div>
                        </div>
                        <div className='lg:flex lg:justify-end sm:flex-row w-full md:flex-row lg:w-full'>
                            <div className='mb-3 flex items-center'>
                                <ButtonSubmitCreate processing={processing} type="submit" />
                                <button onClick={() => onClickHandle()} type='button' className="inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-400 sm:ml-3 sm:w-auto">Kembali</button>
                            </div>
                        </div>
                    </form>
                </CardLayout>
            </Layout>
        </>
    )
};
export default pendaftaranOfflineForm;