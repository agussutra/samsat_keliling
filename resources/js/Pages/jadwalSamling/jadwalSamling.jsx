import Layout from "@/Layouts/masterLayout/Layout";
import { Link, Head, usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    CardLayout,
    ModalCreate,
    ModalDetail,
    ModalUpdate,
    ModalDelete,
    Table,
    HeaderMenu,
    ButtonGroup,
    ButtonInfo,
    ButtonCreate,
    ButtonDelete,
    ButtonUpdate,
    Alert,
} from "@/Components";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import JadwalSamlingContent from "./__content__/JadwalSamlingContent";

const jadwalSamling = (props) => {
    const pageName = usePage();
    const role = pageName?.props?.auth?.user?.role;

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        tgl_samling: "",
        jam_samling: "",
        info_samling: "",
        lokasi_samling: "",
    });

    const [modal, setModal] = useState({
        action: "",
        data: {},
        show: false,
    });

    const [alert, setAlert] = useState({
        variant: "",
        show: false,
        message: "",
    });

    const onClickHandlerDetail = (data) =>
        setModal({ show: true, action: "READ", data: data });
    const onClickHandlerUpdate = (data) =>
        setModal({ show: true, action: "UPDATE", data: data });
    const onClickHandlerDelete = (data) =>
        setModal({ show: true, action: "DELETE", data: data });
    const onClickHandlerCreate = () =>
        setModal({ show: true, action: "CREATE", data: "" });

    function submit(e) {
        e.preventDefault();

        post("/jadwal_samling", {
            onSuccess: () => {
                setModal({ ...modal, show: false }),
                    setAlert({
                        ...alert,
                        variant: "success",
                        show: true,
                        message: "Data Berhasil Ditambah",
                    }),
                    reset();
            },
            onError: (error) => {
                setAlert({
                    ...alert,
                    variant: "error",
                    show: true,
                    message: "Data Gagal Ditambah",
                });
            },
        });

        if (modal.action === "UPDATE") {
            put(`/jadwal_samling/${modal?.data?.id}`, {
                onSuccess: () => {
                    setModal({ ...modal, show: false }),
                        setAlert({
                            ...alert,
                            variant: "success",
                            show: true,
                            message: "Data Berhasil Diubah",
                        }),
                        reset();
                },
                onError: (error) => {
                    setAlert({
                        ...alert,
                        variant: "error",
                        show: true,
                        message: "Data Gagal Diubah",
                    });
                },
            });
        }

        if (modal.action === "DELETE") {
            destroy(`/jadwal_samling/${modal?.data?.id}`, {
                onSuccess: () => {
                    setModal({ ...modal, show: false }),
                        setAlert({
                            ...alert,
                            variant: "success",
                            show: true,
                            message: "Data Berhasil Dihapus",
                        }),
                        reset();
                },
                onError: (error) => {
                    setAlert({
                        ...alert,
                        variant: "error",
                        show: true,
                        message: "Data Gagal Dihapus",
                    });
                },
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
                <Head title="Jadwal Samling" />
                <div className="bg-yellow-300 p-4 rounded-md mb-6 font-bold text-lg dark:text-white">
                    <div className="flex items-center">
                        <div>
                            <PiPencilSimpleLineFill />
                        </div>
                        <div>
                            <span className="ml-2">Jadwal Samsat Keliling</span>
                        </div>
                    </div>
                </div>
                {role === 1 ? (
                    <CardLayout>
                        <div className="flex justify-center">
                            <div>
                                <span className="text-xl font-bold dark:text-white">
                                    Jadwal Pelaksanaan Samsat Keliling Counter X
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="mb-2 flex justify-end">
                            <ButtonCreate onClick={() => onClickHandlerCreate()} />
                        </div>
                        <Table
                            data={props?.dataJadwal?.data}
                            pagination={props?.dataJadwal}
                            query={props?.query}
                            pageName={pageName}
                            TableHeader={[
                                {
                                    text: "Tanggal Samling",
                                    styleHeader: "text-left",
                                },
                                {
                                    text: "Jam Samling",
                                    styleHeader: "text-left",
                                },
                                {
                                    text: "Info Samling",
                                    styleHeader: "text-left",
                                },
                                {
                                    text: "Lokasi Samling",
                                    styleHeader: "text-left",
                                },
                                {
                                    text: "Quota",
                                    styleHeader: "text-left",
                                },
                                {
                                    text: "aksi",
                                },
                            ]}
                            TableContent={[
                                {
                                    field: "tgl_samling",
                                    styleBody: "text-left",
                                },
                                {
                                    field: "jam_samling",
                                    styleBody: "text-left",
                                },
                                {
                                    field: "info_samling",
                                    styleBody: "text-left",
                                },
                                {
                                    field: "lokasi_samling",
                                    styleBody: "text-left",
                                },
                                {
                                    valquotatext: "remaining_quota",
                                    styleBody: "text-left",
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
                                                    }}
                                                />
                                                <ButtonDelete
                                                    onClick={() => {
                                                        onClickHandlerDelete(data);
                                                    }}
                                                />
                                            </ButtonGroup>
                                        );
                                    },
                                },
                            ]}
                        />
                    </CardLayout> 
                ) : (
                    <CardLayout>
                        <div className="flex items-center flex-col mb-4">
                            <span className="font-bold text-xl dark:text-white">Jadwal Pelaksanaan Samsat Keliling Counter X</span>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center border dark:text-white text-black text-base">Tanggal Samling</th>
                                    <th className="text-center border dark:text-white text-black text-base">Jam Samling</th>
                                    <th className="text-center border dark:text-white text-black text-base">Lokasi Samling</th>
                                    <th className="text-center border dark:text-white text-black text-base">Quota</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {props?.dataJadwal?.data?.map((data, i) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="text-center border dark:text-white">{data.tgl_samling}</td>
                                                <td className="text-center border dark:text-white">{data.jam_samling}</td>
                                                <td className="text-center border dark:text-white">{data.lokasi_samling}</td>
                                                <td className="text-center border dark:text-white">{data.remaining_quota}/30</td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardLayout>
                )}

                {/* Modal Tambah Data */}
                {modal.show && modal.action === "CREATE" && (
                    <form onSubmit={submit}>
                        <ModalCreate
                            title="JADWAL SAMLING"
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <JadwalSamlingContent
                                action={modal.action}
                                dataForm={data}
                                setData={setData}
                                formError={errors}
                            />
                        </ModalCreate>
                    </form>
                )}

                {/* Modal Ubah Data */}
                {modal.show && modal.action === "UPDATE" && (
                    <form onSubmit={submit} method="POST">
                        <ModalUpdate
                            title="JADWAL SAMLING"
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <JadwalSamlingContent
                                action={modal.action}
                                dataForm={data}
                                setData={setData}
                                initialData={modal.data}
                                formError={errors}
                            />
                        </ModalUpdate>
                    </form>
                )}

                {/* Read Data */}
                {modal.show && modal.action === "READ" && (
                    <ModalDetail
                        title="JADWAL SAMLING"
                        onClose={() => setModal({ ...modal, show: false })}
                        processing={processing}
                        type="submit"
                    >
                        <JadwalSamlingContent
                            action={modal.action}
                            initialData={modal.data}
                        />
                    </ModalDetail>
                )}

                {modal.show && modal.action === "DELETE" && (
                    <form onSubmit={submit}>
                        <ModalDelete
                            title="JADWAL SAMLING"
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                        >
                            <JadwalSamlingContent
                                action={modal.action}
                                initialData={modal.data}
                            />
                        </ModalDelete>
                    </form>
                )}
            </Layout>
        </>
    );
};
export default jadwalSamling;
