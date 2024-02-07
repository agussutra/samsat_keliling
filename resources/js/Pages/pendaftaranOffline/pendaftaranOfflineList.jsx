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
    ButtonGroup,
    ButtonDelete,
    ButtonInfo,
    ButtonUpdate,
    ButtonCreate,
    CardLayout,
    Alert
} from "@/Components"

const pendaftaranOfflineList = (props) => {
    const pageName = usePage();

    const onClickHandlerCreate = () => {
        router.visit('pendaftaran_offline/form');
    }
    const onClickHandlerUpdate = (data) => setData({ link: 'pendaftaran_offline/form', action: "UPDATE", data: data });
    const onClickHandlerDelete = (data) => setData({ link: 'pendaftaran_offline/form', action: "DELETE", data: data });
    const onClickHandlerInfo = () => setData({ link: 'pendaftaran_offline/form', action: "CREATE", data: "" });
    
    const [alertVisible, setAlertVisible] = useState(false);


    function submit(e) {
        e.preventDefault();

        post('/user', {
            onSuccess: () => {
                setModal({ ...modal, show: false }),
                    setAlert({ ...alert, variant: "success", show: true, message: "Data Berhasil Ditambah" }),
                    reset()
            },
            onError: (error) => {
                setAlert({ ...alert, variant: "error", show: true, message: "Data Gagal Ditambah" });
            }
        });

        if (modal.action === "UPDATE") {
            put(`/user/${modal?.data?.id}`, {
                onSuccess: () => {
                    setModal({ ...modal, show: false }),
                        setAlert({ ...alert, variant: "success", show: true, message: "Data Berhasil Diubah" }),
                        reset()
                },
                onError: (error) => {
                    setAlert({ ...alert, variant: "error", show: true, message: "Data Gagal Diubah" });
                }
            });
        }

        if (modal.action === "DELETE") {
            destroy(`/user/${modal?.data?.id}`, {
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
                                    <Td>{row.jadwal_id}</Td>
                                    <Td>{row.wajib_pajak_id}</Td>
                                    <Td>{row.status_antrian}</Td>
                                    <Td>{row.tipe_pendaftaran}</Td>
                                    <Td>
                                        <ButtonGroup>
                                            <ButtonInfo
                                                onClick={() => {
                                                    onClickHandlerDetail(props?.dataPendaftaran?.data[i]);
                                                }}
                                            />
                                            <ButtonUpdate
                                                onClick={() => {
                                                    onClickHandlerUpdate(props?.dataPendaftaran?.data[i]);
                                                }} />
                                            <ButtonDelete
                                                onClick={() => {
                                                    onClickHandlerDelete(props?.dataPendaftaran?.data[i]);
                                                }} />
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}
                        </TbodyCustom>
                    </TableCustom>
                </CardLayout>

            </Layout>
        </>
    )
};
export default pendaftaranOfflineList;