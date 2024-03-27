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
    ModalDetail
} from "@/Components"
import PendaftaranSamlingContent from './__content__/PendaftaranSamlingContent';

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

                {/* <div className={"w-full " + (props?.quota !== 0 ? 'bg-blue-400 p-4 rounded-md mb-3' : 'bg-red-400 p-4 rounded-md mb-3')}>
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
                </div> */}
                
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
                                    <Td>{row.kode_pendaftaran}</Td>
                                    <Td>{formatDate(row.tgl_pendaftaran)}</Td>
                                    <Td>{formatDate(row.tgl_samling)}</Td>
                                    <Td>{row.name}</Td>
                                    <Td>
                                        <button disabled={role === 2 ? true : false}  onClick={() => handleClickStatus(row.status_antrian, row.id)} className={`${row.status_antrian === 1 ? 'btn btn-error' : (row.status_antrian === 2 ? 'btn btn-warning' : 'btn btn-success')} btn-sm rounded-md text-white` } >
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
        </>
    )
};
export default pendaftaranSamlingList;