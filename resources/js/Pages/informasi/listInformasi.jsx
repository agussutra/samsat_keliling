import { React, useState } from "react";
import { usePage, Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/masterLayout/Layout";
import {
    HeaderMenu,
    CardLayout,
    ButtonSubmitCreate,
    Alert,
} from "@/Components";
import InformasiContent from "./__content__/InformasiContent";

const listInformasi = (props) => {
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
        informasi_samling: "",
    });

    const [alert, setAlert] = useState({
        variant: "",
        show: false,
        message: "",
    });

    const role = usePage().props?.auth?.user?.role;
    const dataInformasi = props?.dataInformasi?.map((data, i) => {
        return data.informasi_samling;
    });

    function submit(e) {
        e.preventDefault();

        post("/informasi", {
            onSuccess: () => {
                setAlert({
                    ...alert,
                    variant: "success",
                    show: true,
                    message: "Data Berhasil Dibagikan",
                }),
                    reset();
            },
            onError: (error) => {
                console.log(error);
                setAlert({
                    ...alert,
                    variant: "error",
                    show: true,
                    message: "Data Gagal Dibagikan",
                });
            },
        });
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
                <Head title="Informasi Samling" />
                <HeaderMenu
                    namePages={
                        role === 1
                            ? "INFORMASI SAMSAT SAMLING"
                            : "Informasi Seputar Samsat Keliling"
                    }
                    position={role === 1 ? "justify-between" : "justify-center"}
                    transform={role === 1 ? "uppercase" : "capitalize"}
                />
                {role === 1 ? (
                    <CardLayout>
                        <form onSubmit={submit}>
                            <InformasiContent
                                dataForm={data}
                                setData={setData}
                                formError={errors}
                            />
                            <div className="mt-2 flex justify-end">
                                <ButtonSubmitCreate
                                    processing={processing}
                                    type="submit"
                                    label="Bagikan"
                                />
                            </div>
                        </form>
                    </CardLayout>
                ) : (
                    <div className="flex">
                        <div className="w-[60%] hidden lg:block">
                            <div className="p-6 flex justify-center">
                                <img
                                    src="/image/police.jpg"
                                    className="w-[400px]"
                                    alt="police-img"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="">
                                <div className="mr-3 ml-3">
                                    <div className=" bg-slate-50 shadow-lg rounded-tl-3xl rounded-br-3xl p-4 ml-2 mr-4">
                                        <div className="text-slate-500">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: dataInformasi,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
        </>
    );
};
export default listInformasi;
