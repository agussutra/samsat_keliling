import { useEffect, useState } from "react";
import React from "react";
import {
    InputForm,
    ItemHorizontal,
    TextArea,
    Dropdown
} from "@/Components";
import { FaShare } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { usePage, useForm } from '@inertiajs/react';

const PendaftaranSamlingContent = ({ action, initialData, dataForm, setData, formError, dataJadwal, dataUser, dataStnk, dataDetail }) => {
    const role = usePage()?.props?.auth?.user?.role;
    const id_user = usePage()?.props?.auth?.user.id;

    const handleInputChange = (name, value) => {
        setData(name, value)
    };

    const dropdownTipePendaftaran = [
        { value: 'online', label: 'Online' },
        { value: 'offline', label: 'Offline' }
    ];

    const dropdownJadwal = dataJadwal?.map((object) => {
        return {
            value: object.id,
            label: object.tgl_samling
        }
    });

    const dropdownStatus = [
        { value: 1, label: 'Belum Diproses' },
        { value: 2, label: 'Dalam Diproses' },
        { value: 3, label: 'Selesai' },
    ];

    const dropdownUser = dataUser?.map((object) => {
        return {
            value: object.id,
            label: object.name
        }
    })

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    if (action === "DELETE") {
        return (
            <>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <ItemHorizontal label="Kode Antrian" value={initialData.kode_pendaftaran} />
                        <ItemHorizontal label="Nama" value={initialData.nama} />
                        <ItemHorizontal label="Tgl. Pendaftaran" value={formatDate(initialData.tgl_pendaftaran)} />
                        <ItemHorizontal label="Tgl. Samling" value={formatDate(initialData.tgl_samling)} />
                    </div>
                    <div>
                        <ItemHorizontal label="Kode Antrian" value={initialData.status_antrian === 1 ? 'Belum Diproses' : (initialData.status_antrian === 2 ? 'Sedang Diproses' : 'Selesai')} />
                        <ItemHorizontal label="Tipe Pendaftaran" value={initialData.tipe_pendaftaran} />
                    </div>
                </div>
            </>
        )
    }

    
    if (action === "DETAIL") {
        const detailStnk = dataDetail.filter(dataDetail => dataDetail.id_user === initialData.id_user);
        return (
            <>
                <div>
                    <div className="grid grid-cols-2 gap-1 mb-2">
                        <ItemHorizontal label="No. Pendaftaran" value={initialData.kode_pendaftaran} />
                        <ItemHorizontal label="Nama" value={initialData.name} />
                    </div>
                    <div className="grid grid-cols-2 gap-1 mb-2">
                        <ItemHorizontal label="Jadwal" value={formatDate(initialData.tgl_samling)} />
                        <ItemHorizontal label="Status Antrian" value={initialData.status_antrian === 1 ? 'Belum diproses' : (initialData.status_antrian === 2 ? 'Sedang diproses' : 'Selesai')} />
                    </div>
                    <div className="mt-2">
                        <div className="overflow-x-auto">
                            <table className="table table-md table-pin-rows table-pin-cols">
                                <thead>
                                    <tr>
                                        <td>No.</td>
                                        <td>No. Stnk</td>
                                        <td>No. Plat</td>
                                        <td>Tipe Kendaraan</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {detailStnk?.map((field, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{field.no_stnk}</td>
                                        <td>{field.plat_kendaraan}</td>
                                        <td>{field.tipe_kendaraan}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (dataStnk) {
            const dataStnkFill = dataStnk.filter(data => data.id_user === role === 1 ? dataForm.user_id : id_user);
            setValueList(dataStnkFill);
        }
    }, [dataStnk, dataForm.user_id]);

    const [valueList, setValueList] = useState([]);

    const sharedData = (i) => {
        const updatedValueList = [...valueList];
        updatedValueList.splice(i, 1);
        setValueList(updatedValueList);

        const newData = [...dataForm.dataListStnk];
        newData.splice(i, 0, valueList[i]);

        setData({
            ...dataForm,
            dataListStnk: newData
        });

    }

    const removeArray = (i, item) => {
        const updatedValueList = [...valueList];
        updatedValueList.push(item);
        setValueList(updatedValueList);


        const newData = [...dataForm.dataListStnk]
        newData.splice(i, 1);

        setData({
            ...dataForm,
            dataListStnk: newData
        })
    }


    if (action === "RIGHT-FORM") {
        return (
            <>
                <div className="w-full">
                    <div className="mb-3">
                        <span className="font-bold dark:text-white">Silahkan Pilih Yang Akan Di Daftarkan</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-md table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <td className="dark:bg-slate-700 dark:text-white">No. Stnk</td>
                                    <td className="dark:bg-slate-700 dark:text-white">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {valueList?.map((field, i) => (
                                    <tr key={i}>
                                        <td className="dark:bg-slate-700 dark:text-white">{field.no_stnk}</td>
                                        <td className="dark:bg-slate-700 dark:text-white">
                                            <button type="button" className="btn btn-primary btn-outline btn-sm" onClick={() => sharedData(i)} >
                                                <FaShare />
                                            </button>
                                        </td>
                                    </tr>

                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3">
                        <div className="mb-3">
                            <span className="font-bold dark:text-white">List Yang Akan Di Daftarkan</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-md table-pin-rows table-pin-cols">
                                <thead>
                                    <tr>
                                        <td className="dark:bg-slate-700 dark:text-white">No. Stnk</td>
                                        <td className="dark:bg-slate-700 dark:text-white">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataForm?.dataListStnk?.length > 0 ?
                                            dataForm?.dataListStnk?.map((field, i) => (
                                                <tr key={i}>
                                                    <td className="dark:bg-slate-700 dark:text-white">{field.no_stnk}</td>
                                                    <td className="dark:bg-slate-700 dark:text-white">
                                                        <button type="button" onClick={() => removeArray(i, field)} className={`btn btn-error btn-outline btn-sm ${dataForm?.dataListStnk?.length < 0 && 'hidden'}`} >
                                                            <RiDeleteBack2Fill />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                            ) :
                                            null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <React.Fragment>
                {role === 1 ? (
                    <Dropdown
                        label="Wajib Pajak"
                        data={dropdownUser}
                        onChange={(value) => handleInputChange('user_id', value)}
                        value={dataForm?.user_id}
                        errors={formError.user_id}
                    />
                ) : "" } 
                <InputForm
                    label="Kode Pendaftaran"
                    value={dataForm?.kode_pendaftaran}
                    type="text"
                    disabled={true}
                    onChange={(value) => handleInputChange('kode_pendaftaran', value)}
                    errors={formError.kode_pendaftaran}
                />
                <Dropdown
                    label="Jadwal"
                    data={dropdownJadwal}
                    onChange={(value) => handleInputChange('jadwal_id', value)}
                    value={dataForm?.jadwal_id}
                    errors={formError.jadwal_id}
                />
                {/* <InputForm
                    label="Tgl. Pendaftaran"
                    value={dataForm?.tgl_pendaftaran}
                    type="date"
                    onChange={(value) => handleInputChange('tgl_pendaftaran', value)}
                    errors={formError.tgl_pendaftaran}
                />
                <Dropdown
                    label="Tipe Pendaftaran"
                    data={dropdownTipePendaftaran}
                    onChange={(value) => handleInputChange('tipe_pendaftaran', value)}
                    value={dataForm?.tipe_pendaftaran}
                    errors={formError.tipe_pendaftaran}
                    disabled={true}
                />

                <Dropdown
                    label="Status Pendaftaran"
                    data={dropdownStatus}
                    onChange={(value) => handleInputChange('status_antrian', value)}
                    value={dataForm?.status_antrian}
                    errors={formError.status_antrian}
                    disabled={true}
                /> */}
            </React.Fragment>
        </>
    )


};
export default PendaftaranSamlingContent; 