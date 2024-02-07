import { Link, Head, usePage, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from "react";
import Layout from '@/Layouts/masterLayout/Layout';
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
    ModalDelete
} from "@/Components"
import PendaftaranOfflineContent from './__content__/PendaftaranOfflineContent';

const pendaftaranOfflineList = (props) => {
    const pageName = usePage();
    const {delete: destroy, processing} = useForm();

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
        router.visit('pendaftaran_offline/form');
    };

    const handleClickStatus = (e, id) => {
        const statusAntrian = e + 1;
        if (statusAntrian <= 3) {
            router.put(`/pendaftaran_offline/${id}`,{statusAntrian});
        }
    };

    const onClickHandlerDelete = (data) => setModal({ show: true, action: "DELETE", data: data });

    function submit(e) {
        e.preventDefault();
        if (modal.action === "DELETE") {
            destroy(`/pendaftaran_offline/${modal?.data?.id}`, {
                onSuccess: () => {
                    setModal({ ...modal, show: false }),
                        setAlert({ ...alert, variant: "success", show: true, message: "Data Berhasil Dihapus" }),
                        reset()
                },
                onError: (error) => {
                    setAlert({ ...alert, variant: "error", show: true, message: "Data Gagal Dihapus" });
                }
            });
        }
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
                <Head title="PENDAFTARAN OFFLINE" />
                <HeaderMenu namePages="PENDAFTARAN OFFLINE" />
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
                                    <Td>{row.tgl_pendaftaran}</Td>
                                    <Td>{row.tgl_samling}</Td>
                                    <Td>{row.nama}</Td>
                                    <Td>
                                        <button onClick={() => handleClickStatus(row.status_antrian, row.id)} className={`${row.status_antrian === 1 ? 'btn btn-error' : (row.status_antrian === 2 ? 'btn btn-warning' : 'btn btn-success')} btn-sm rounded-md text-white`}>
                                        {`${row.status_antrian === 1 ? 'Belum Diproses' : (row.status_antrian === 2 ? 'Sedang Diproses' : 'Selesai')}`}
                                        </button>
                                    </Td>
                                    <Td>{row.tipe_pendaftaran}</Td>
                                    <Td>
                                        <ButtonDelete
                                            onClick={() => {
                                                onClickHandlerDelete(props?.dataPendaftaran?.data[i]);
                                            }} />
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
                            title="PENDAFTARAN OFFLINE"
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <PendaftaranOfflineContent
                                action={modal.action}
                                initialData={modal.data}
                            />
                        </ModalDelete>
                    </form>
                }

            </Layout>
        </>
    )
};
export default pendaftaranOfflineList;