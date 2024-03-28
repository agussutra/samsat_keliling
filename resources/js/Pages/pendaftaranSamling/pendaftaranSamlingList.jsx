import { Link, Head, usePage, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from "react";
import Layout from '@/Layouts/masterLayout/Layout';
import { FaClipboardList } from "react-icons/fa";
import {
    TableCustom,
    Td,
    Tr,
    Th,
    TheadCustom,
    TbodyCustom,
    HeaderMenu,
    ButtonDelete,
    ButtonCreate,
    CardLayout,
    Alert,
    ModalDelete,
    ButtonGroup,
    ButtonInfo,
    ModalDetail,
    ModalPrint
} from "@/Components"
import PendaftaranSamlingContent from './__content__/PendaftaranSamlingContent';
import { useRef } from "react";
import React from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { FaUserCog } from "react-icons/fa";
import { calculateEstimasi } from '@/Function';

const pendaftaranSamlingList = (props) => {

    const pageName = usePage();
    const role = pageName?.props?.auth?.user?.role

    const { delete: destroy, processing } = useForm();

    const [modal, setModal] = useState({
        action: "",
        data: {},
        show: false
    });

    const [alert, setAlert] = useState({
        variant: "",
        show: false,
        message: ""
    });

    const onClickHandlerCreate = () => {
        router.visit('pendaftaran_samling/form');
    };

    const handleClickStatus = (e, id) => {
        const statusAntrian = e + 1;
        if (statusAntrian <= 3) {
            router.put(`/pendaftaran_samling/${id}`, { statusAntrian });
        }
        // router.reload({ only: ['/'] });
    };

    const onClickHandlerDelete = (data) => setModal({ show: true, action: "DELETE", data: data });
    const onClickHandlerInfo = (data) => setModal({ show: true, action: "DETAIL", data: data });

    function submit(e) {
        e.preventDefault();
        if (modal.action === "DELETE") {
            destroy(`/pendaftaran_samling/${modal?.data?.id}`, {
                onSuccess: () => {
                    setModal({ ...modal, show: false }),
                        setAlert({ ...alert, variant: "success", show: true, message: "Data Berhasil Dihapus" })
                },
                onError: (error) => {
                    setAlert({ ...alert, variant: "error", show: true, message: "Data Gagal Dihapus" });
                }
            });
        }
    }

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
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
                <Head title="PENDAFTARAN SAMLING" />
                <HeaderMenu namePages="PENDAFTARAN SAMLING" />

                <div className={"w-full " + (props?.quota !== 0 ? 'bg-blue-400 p-4 rounded-md mb-3' : 'bg-red-400 p-4 rounded-md mb-3')}>
                    <div className="flex items-center">
                        <div className="mr-3">
                            <FaClipboardList className="dark:text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg dark:text-white">
                                { props?.quota !== 0 ? 'Sisa quota pendaftaran hari ini '+ props?.quota : 'Quota Pendaftaran sudah penuh untuk hari ini, silahkan melakukan pendaftaran besok' }
                            </span>
                        </div>
                    </div>
                </div>
                
                <CardLayout>
                    <div className="mb-2 flex justify-end">
                        <ButtonCreate onClick={() => onClickHandlerCreate()} />
                    </div>
                    <TableCustom
                        pagination={props?.dataPendaftaran}
                        query={props?.query}
                        pageName={pageName}
                    >
                        <TheadCustom>
                            <Tr>
                                <Th>No</Th>
                                <Th>Print</Th>
                                <Th>Kode Pendaftaran</Th>
                                <Th>Tgl. Pendafatarn</Th>
                                <Th>Jadwal Pajak</Th>
                                <Th>Nama Wajib Pajak</Th>
                                <Th>Status Antrian</Th>
                                <Th>Tipe Pendaftaran</Th>
                                <Th>Aksi</Th>
                            </Tr>
                        </TheadCustom>
                        <TbodyCustom>
                            {props?.dataPendaftaran?.data.map((row, i) => (
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>
                                        <button className='btn-info btn btn-sm' onClick={() => setModal({ ...modal, show: true, data: row, action: 'PRINT' })}>Print</button>
                                    </Td>
                                    <Td>{row.kode_pendaftaran}</Td>
                                    <Td>{formatDate(row.tgl_pendaftaran)}</Td>
                                    <Td>{formatDate(row.tgl_samling)}</Td>
                                    <Td>{row.name}</Td>
                                    <Td>
                                        <button disabled={role === 2 ? true : false} onClick={() => handleClickStatus(row.status_antrian, row.id)} className={`${row.status_antrian === 1 ? 'btn btn-error' : (row.status_antrian === 2 ? 'btn btn-warning' : 'btn btn-success')} btn-sm rounded-md text-white`} >
                                            {`${row.status_antrian === 1 ? 'Belum Diproses' : (row.status_antrian === 2 ? 'Sedang Diproses' : 'Selesai')}`}
                                        </button>
                                    </Td>
                                    <Td>{row.tipe_pendaftaran}</Td>
                                    <Td>
                                        <div className='flex gap-2'>
                                            {
                                                role === 1 &&
                                                <ButtonDelete
                                                    onClick={() => {
                                                        onClickHandlerDelete(props?.dataPendaftaran?.data[i]);
                                                    }} />
                                            }
                                            <ButtonInfo
                                                onClick={() => {
                                                    onClickHandlerInfo(props?.dataPendaftaran?.data[i]);
                                                }}
                                            />
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </TbodyCustom>
                    </TableCustom>
                </CardLayout>

                {/* Modal Delete Data */}
                {(modal.show && modal.action === "DELETE") &&
                    <form onSubmit={submit}>
                        <ModalDelete
                            title="PENDAFTARAN"
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <PendaftaranSamlingContent
                                action={modal.action}
                                initialData={modal.data}
                            />
                        </ModalDelete>
                    </form>
                }

                {/* Modal Info Data */}
                {(modal.show && modal.action === "DETAIL") &&
                    <form onSubmit={submit}>
                        <ModalDetail
                            title="PENDAFTARAN"
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <PendaftaranSamlingContent
                                action={modal.action}
                                initialData={modal.data}
                                dataDetail={props.dataStnk}
                            />
                        </ModalDetail>
                    </form>
                }
            </Layout>
            {modal.show && modal.action === 'PRINT' && (
                <PrintModal data={modal.data} onClose={() => setModal(({...modal, show: false}))}/>
            )}
        </>
    )
};


const PrintModal = ({ data, onClose }) => {

    const ref = useRef()
    const[isLoading, setIsLoading] = useState(false)

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        onBeforePrint: () => setIsLoading(true),
        onAfterPrint: () => setIsLoading(false),
    });

    return (
        <div>
            <ModalPrint
                onClose={onClose}
                onClick={handlePrint}
                processing={isLoading}
                title='ANTRIAN'
            >
               <PrintLayout data={data}/>
            </ModalPrint>

            <div style={{ display: "none" }}>
                <PrintLayout ref={ref} data={data}/>
            </div>

        </div>
    )
}

const PrintLayout = React.forwardRef(({data}, ref) => {

    return (
            <div ref={ref} className='flex justify-center items-center m-5'>
                <div className='w-[500px] h-[400px] bg-blue-300 p-4 rounded-xl shadow-lg'>
                    <div className='text-center flex flex-col rounded-b-xl p-4 bg-stone-50'>
                        <span className='text-2xl  font-bold font-raleway'>KARTU ANTRIAN</span>
                        <span className='text-3xl font-bold mt-2 font-mono mb-2'>{data?.kode_pendaftaran}</span>
                        <span  className='text-md font-bold mt-2 font-mono mb-1'>Estimasi Pemanggilan Antrian</span>
                        <span  className='text-sm font-bold mt-2 font-mono mb-2'>{calculateEstimasi(parseInt(data?.kode_pendaftaran.match(/\d+/)[0]), data?.jam_samling, 30)}</span>
                    </div>

                    <div className='mt-5'>
                        <div className='flex items-center gap-6'>
                            <div className='ml-5'>
                                <FaUserCog className='text-white text-[100px]' />
                            </div>
                            <div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <span className='text-xl font-bold text-white'>Nama</span>
                                    </div>
                                    <div>
                                        <span className='text-white text-xl'>: {data?.name}</span>
                                    </div>
                                    <div>
                                        <span className='text-xl font-bold text-white'>Tgl. Registrasi</span>
                                    </div>
                                    <div>
                                        <span className='text-white text-xl'>: {data?.tgl_pendaftaran}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
})

export default pendaftaranSamlingList;