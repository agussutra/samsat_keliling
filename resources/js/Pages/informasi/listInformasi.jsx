import { React, useState } from "react";
import { usePage, Head, useForm } from "@inertiajs/react";
import Layout from '@/Layouts/masterLayout/Layout';
import { HeaderMenu, CardLayout, ButtonSubmitCreate, Alert } from "@/Components";
import InformasiContent from "./__content__/InformasiContent";

const listInformasi = () => {

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        informasi_samling: '',
    });

    const [alert, setAlert] = useState({
        variant: "",
        show: false,
        message: ""
    });

    function submit(e) {
        e.preventDefault();

        post('/informasi', {
            onSuccess: () => {
                    setAlert({ ...alert, variant: "success", show: true, message: "Data Berhasil Dibagikan" }),
                    reset()
            },
            onError: (error) => {
                console.log(error);
                setAlert({ ...alert, variant: "error", show: true, message: "Data Gagal Dibagikan" });
            }
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
                <HeaderMenu namePages="INFORMASI SAMSAT SAMLING" />
                <CardLayout>
                    <form onSubmit={submit}>
                        <InformasiContent
                            dataForm={data}
                            setData={setData}
                            formError={errors}
                        />
                        <div className="mt-2 flex justify-end">
                            <ButtonSubmitCreate processing={processing} type="submit" label="Bagikan" />
                        </div>
                    </form>
                </CardLayout>
            </Layout>
        </>
    )
};
export default listInformasi;