import { Link, Head, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from "react";
import RegisStnkContent from './__content__/RegisStnkContent';
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

const listStnk = (props) => {
    const pageName = usePage();
    const idUser = usePage()?.props?.auth?.user?.id;
    const Title = "DATA STNK";

    const [modal, setModal] = useState({
        action: "",
        data: {},
        show: false
    });
    
    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        plat_kendaraan: '',
        tipe_kendaraan: '',
        no_stnk: '',
        masa_berlaku: '',
        id_user: idUser,
        // no_stnk_old: modal?.data?.no_stnk
        no_stnk_old: ''
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

        post('/regis_stnk', {
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
            put(`/regis_stnk/${modal?.data?.id}`, {
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
            destroy(`/regis_stnk/${modal?.data?.id}`, {
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
                <HeaderMenu
                    namePages={Title}
                    position="justify-between"
                    transform="uppercase"
                />
                <CardLayout>
                    <div className="mb-2 flex justify-end">
                        <ButtonCreate onClick={() => onClickHandlerCreate()} />
                    </div>
                    <Table
                        data={props?.dataStnk?.data}
                        pagination={props?.dataStnk}
                        query={props?.query}
                        pageName={pageName}
                        TableHeader={[
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
                            <RegisStnkContent
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
                        <RegisStnkContent
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
                            <RegisStnkContent
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
                            <RegisStnkContent
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

export default listStnk;