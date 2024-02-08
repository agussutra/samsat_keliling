import { Link, Head, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from "react";
import WajibPajakContent from './__content__/WajibPajakContent';
import Layout from '@/Layouts/masterLayout/Layout';
import {
    ModalCreate,
    ModalUpdate,
    ModalDetail,
    ModalDelete,
    Table,
    HeaderMenu,
    ButtonGroup,
    ButtonDelete,
    ButtonInfo,
    ButtonUpdate,
    ButtonCreate,
    CardLayout,
    Alert
} from "@/Components"

const listUser = (props) => {
    const pageName = usePage();
    const Title = "WAJIB PAJAK";

    const [modal, setModal] = useState({
        action: "",
        data: {},
        show: false
    });

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nama: '',
        alamat: '',
        no_tlp: '',
        plat_kendaraan: '',
        tipe_kendaraan: '',
        no_stnk: '',
        masa_berlaku: '',
    });

    const [alert, setAlert] = useState({
        variant: "",
        show: false,
        message: ""
    });

    const onClickHandlerDetail = (data) => setModal({ show: true, action: "READ", data: data });
    const onClickHandlerUpdate = (data) => setModal({ show: true, action: "UPDATE", data: data });
    const onClickHandlerDelete = (data) => setModal({ show: true, action: "DELETE", data: data });
    const onClickHandlerCreate = () => setModal({ show: true, action: "CREATE", data: "" });

    function submit(e) {
        e.preventDefault();

        post('/wajib_pajak', {
            onSuccess: () => {
                setModal({ ...modal, show: false }),
                    setAlert({ ...alert, variant: "success", show: true, message: "Data Berhasil Ditambah" }),
                    reset()
            },
            onError: (error) => {
                setAlert({ ...alert, variant: "error", show: true, message: "Data Gagal Ditambah" })
            }
        });

        if (modal.action === "UPDATE") {
            put(`/wajib_pajak/${modal?.data?.id}`, {
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
            destroy(`/wajib_pajak/${modal?.data?.id}`, {
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

                <Head title={Title} />
                <HeaderMenu namePages={Title} />
                <CardLayout>
                    <div className="mb-2 flex justify-end">
                        <ButtonCreate onClick={() => onClickHandlerCreate()} />
                    </div>
                    <Table
                        data={props?.wajibPajak?.data}
                        pagination={props?.wajibPajak}
                        query={props?.query}
                        pageName={pageName}
                        TableHeader={[
                            {
                                text: "Nama",
                                styleHeader: 'text-left'
                            },
                            {
                                text: "Alamat",
                                styleHeader: 'text-left'
                            },
                            {
                                text: "No. Tlp",
                                styleHeader: 'text-left'
                            },
                            {
                                text: "Plat Kendaraan",
                                styleHeader: 'text-left'
                            },
                            {
                                text: "Tipe Kendaraan",
                                styleHeader: 'text-left'
                            },
                            {
                                text: "No STNK",
                                styleHeader: 'text-left'
                            },
                            {
                                text: "Masa Berlaku",
                                styleHeader: 'text-left'
                            },
                            {
                                text: "aksi"
                            }
                        ]}
                        TableContent={[
                            {
                                field: "nama",
                                styleBody: 'text-left'
                            },
                            {
                                field: "alamat",
                                styleBody: 'text-left'
                            },
                            {
                                field: "no_tlp",
                                styleBody: 'text-left'
                            },
                            {
                                field: "plat_kendaraan",
                                styleBody: 'text-left'
                            },
                            {
                                field: "tipe_kendaraan",
                                styleBody: 'text-left'
                            },
                            {
                                field: "no_stnk",
                                styleBody: 'text-left'
                            },
                            {
                                field: "masa_berlaku",
                                styleBody: 'text-left'
                            },
                            {
                                action: (data) => {
                                    return (
                                        <ButtonGroup>
                                            <ButtonInfo
                                                onClick={() => {
                                                    onClickHandlerDetail(data);
                                                }}
                                            />
                                            <ButtonUpdate
                                                onClick={() => {
                                                    onClickHandlerUpdate(data);
                                                }} />
                                            <ButtonDelete
                                                onClick={() => {
                                                    onClickHandlerDelete(data);
                                                }} />
                                        </ButtonGroup>
                                    )
                                }
                            }
                        ]}
                    />
                </CardLayout>

                {/* Modal Tambah Data */}
                {(modal.show && modal.action === "CREATE") &&
                    <form onSubmit={submit}>
                        <ModalCreate
                            title={Title}
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <WajibPajakContent
                                action={modal.action}
                                dataForm={data}
                                setData={setData}
                                formError={errors}
                            />
                        </ModalCreate>
                    </form>
                }

                {/* Read Data */}
                {(modal.show && modal.action === "READ") &&
                    <ModalDetail
                        title={Title}
                        onClose={() => setModal({ ...modal, show: false })}
                        processing={processing}
                        type="submit">
                        <WajibPajakContent
                            action={modal.action}
                            initialData={modal.data}
                        />
                    </ModalDetail>
                }

                {/* Modal Ubah Data */}
                {(modal.show && modal.action === "UPDATE") &&
                    <form onSubmit={submit} method="POST">
                        <ModalUpdate
                            title={Title}
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <WajibPajakContent
                                action={modal.action}
                                dataForm={data}
                                setData={setData}
                                initialData={modal.data}
                                formError={errors}
                            />
                        </ModalUpdate>
                    </form>
                }

                {/* Modal Delete Data */}
                {(modal.show && modal.action === "DELETE") &&
                    <form onSubmit={submit}>
                        <ModalDelete
                            title={Title}
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <WajibPajakContent
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

export default listUser;