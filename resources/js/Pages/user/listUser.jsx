import { Link, Head, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from "react";
import UserContent from "./__content__/UserContent";
import Layout from '@/Layouts/masterLayout/Layout';
import {
    ModalCreate,
    ModalUpdate,
    ModalDetail,
    ModalDelete,
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

const listUser = (props) => {
    const pageName = usePage();
    const Title = "USER";

    const [modal, setModal] = useState({
        action: "",
        data: {},
        show: false,
    });
    
    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        username: '',
        role: '',
        alamat: '',
        no_tlp: '',
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
                    <TableCustom
                        pagination={props?.dataUser}
                        query={props?.query}
                        pageName={pageName}
                    >
                        <TheadCustom>
                            <Tr>
                                <Th>No</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Username</Th>
                                <Th>Alamat</Th>
                                <Th>No. Tlp</Th>
                                <Th>Role</Th>
                                <Th>Aksi</Th>
                            </Tr>
                        </TheadCustom>
                        <TbodyCustom>
                            {props?.dataUser?.data.map((row, i) => (
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{row.name}</Td>
                                    <Td>{row.email}</Td>
                                    <Td>{row.username}</Td>
                                    <Td>{row.alamat}</Td>
                                    <Td>{row.no_tlp}</Td>
                                    <Td>{row.role === 1 ? 'Admin' : 'User'}</Td>
                                    <Td>
                                        <ButtonGroup>
                                            <ButtonInfo
                                                onClick={() => {
                                                    onClickHandlerDetail(props?.dataUser?.data[i]);
                                                }}
                                            />
                                            <ButtonUpdate
                                                onClick={() => {
                                                    onClickHandlerUpdate(props?.dataUser?.data[i]);
                                                }} />
                                            <ButtonDelete
                                                onClick={() => {
                                                    onClickHandlerDelete(props?.dataUser?.data[i]);
                                                }} />
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}
                        </TbodyCustom>
                    </TableCustom>
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
                            <UserContent
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
                        <UserContent
                            action={modal.action}
                            initialData={modal.data}
                        />
                    </ModalDetail>
                }

                {/* Modal Ubah Data */}
                {(modal.show && modal.action === "UPDATE") &&
                        <ModalUpdate
                            title={Title}
                            onClose={() => setModal({ ...modal, show: false })}
                            processing={processing}
                            type="submit"
                            widht="w-[1000px]"
                            onHideButton = {true}
                        >
                            <UserContent
                                action={modal.action}
                                dataForm={data}
                                setData={setData}
                                initialData={modal.data}
                                formError={errors}
                                dataDetail={props?.dataDetailUSer}
                            />
                        </ModalUpdate>
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
                            <UserContent
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