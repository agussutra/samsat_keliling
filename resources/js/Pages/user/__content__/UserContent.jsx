import { react, useEffect } from "react";
import {
    InputForm,
    ItemVertical,
    TextArea,
    Dropdown
} from "@/Components";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { CiSaveDown1 } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { router } from '@inertiajs/react'
import { dateFormat } from "@/Function";



const UserContent = ({ action, initialData, dataForm, setData, formError, dataDetail }) => {

    const dataRole = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'User' },
    ];

    const handleInputChange = (name, value) => {
        setData(name, value)
    };

    if (action === "READ" || action === "DELETE") {
        return (
            <>
                <ItemVertical label="Nama" value={initialData.name} />
                <ItemVertical label="Email" value={initialData.email} />
                <ItemVertical label="Username" value={initialData.username} />
                <ItemVertical label="Alamat" value={initialData.alamat} />
                <ItemVertical label="No. Tlp" value={initialData.no_tlp} />
                <ItemVertical label="Role" value={initialData.role === 1 ? 'Admin' : 'User'} />
            </>
        )
    };


    const AddDetail = ({ initialData, dataDetail }) => {

        const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
            plat_kendaraan: '',
            tipe_kendaraan: '',
            no_stnk: '',
            masa_berlaku: '',
            dataValue: []
        })
        
        const dataDetailFill = dataDetail?.filter(data => data.id_user === initialData.id);
        const [isUpdate, setIsUpdate] = useState({});
        const [prosesUpdate, setProcessingUpdate] = useState(false);

        const handleUpdateClick = (index) => {
            setIsUpdate(prevStatus => ({
                ...prevStatus,
                [index]: !prevStatus[index]
            }));
        };
        const handleInputChange = (name, value) => {
            setData(name, value)
        };
        const handleInputChangeList = (index, name, value) => {
            setData(prevData => ({
                ...prevData,
                dataValue: prevData.dataValue.map((item, i) => {
                    if (i === index) {
                        return {
                            ...item,
                            [name]: value
                        };
                    }
                    return item;
                })
            }));
        };
        
        useEffect(() => {
            if (dataDetail) {
                setData(prevData => ({
                    ...prevData,
                    dataValue: dataDetailFill.map(item => ({
                        plat_kendaraan: item.plat_kendaraan,
                        tipe_kendaraan: item.tipe_kendaraan,
                        no_stnk: item.no_stnk,
                        masa_berlaku: item.masa_berlaku,
                    }))
                }));
            }
        }, [dataDetail]);

        function submit(e) {
            e.preventDefault();
            put(`/user/${initialData?.id}`, {
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
        const saveUpdate = (i) => {
            setProcessingUpdate(true)
            router.put(`/user/${initialData?.id}`, data.dataValue[i], {
                onSuccess: () => {
                    setProcessingUpdate(false)
                },
                onError: (error) => {
                }
            },
            );
        }
        const deleteData = (i) => {
            router.delete(`/user/deleteChild/${data.dataValue[i].plat_kendaraan}`, {
                onSuccess: () => {
                },
                onError: (error) => {
                }
                
            });
        }

        return (
            <>
                <form onSubmit={submit}>
                    <div>
                        <div className="flex items-center gap-1">
                            <InputForm
                                label="Plat Kendaraan"
                                value={data?.plat_kendaraan}
                                type="text"
                                onChange={(value) => handleInputChange('plat_kendaraan', value)}
                                errors={formError.plat_kendaraan}
                            />
                            <InputForm
                                label="Tipe Kendaraan"
                                value={data?.tipe_kendaraan}
                                type="text"
                                onChange={(value) => handleInputChange('tipe_kendaraan', value)}
                                errors={formError.tipe_kendaraan}
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <InputForm
                                label="No. STNK"
                                value={data?.no_stnk}
                                type="text"
                                onChange={(value) => handleInputChange('no_stnk', value)}
                                errors={formError.no_stnk}
                            />
                            <InputForm
                                label="Masa Berlaku"
                                value={data?.masa_berlaku}
                                type="date"
                                onChange={(value) => handleInputChange('masa_berlaku', value)}
                                errors={formError.masa_berlaku}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary btn-outline btn-sm">
                            {processing ? <span className="loading loading-spinner"></span> : <IoMdAdd />}
                        </button>
                    </div>
                </form>
                <div className="mb-5">
                    <p className="font-bold dark:text-white">DETAIL KENDARAAN</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-md table-pin-rows table-pin-cols">
                        <thead >
                            <tr >
                                <th className="dark:bg-slate-500 text-white">No</th>
                                <th className="dark:bg-slate-500 text-white">Plat Kendaraan</th>
                                <th className="dark:bg-slate-500 text-white">Tipe Kendaraan</th>
                                <th className="dark:bg-slate-500 text-white">No STNK</th>
                                <th className="dark:bg-slate-500 text-white">Masa Berlaku</th>
                                <th className="dark:bg-slate-500 text-white">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.dataValue?.map((field, i) => (
                                <tr key={i}>
                                    <td className="dark:text-white">{i + 1}</td>
                                    <td className="dark:text-white">
                                        {isUpdate[i] === undefined || !isUpdate ? (
                                            field.plat_kendaraan
                                        ) : (
                                            <InputForm
                                                value={field?.plat_kendaraan}
                                                type="text"
                                                onChange={(value) => handleInputChangeList(i, 'plat_kendaraan', value)}
                                                errors={formError.plat_kendaraan}
                                            />
                                        )}
                                    </td>
                                    <td className="dark:text-white">
                                        {isUpdate[i] === undefined || !isUpdate ? (
                                            field.tipe_kendaraan
                                        ) : (
                                            <InputForm
                                                value={field?.tipe_kendaraan}
                                                type="text"
                                                onChange={(value) => handleInputChangeList(i, 'tipe_kendaraan', value)}
                                                errors={formError.tipe_kendaraan}
                                            />
                                        )}
                                    </td>
                                    <td className="dark:text-white">
                                        {isUpdate[i] === undefined || !isUpdate ? (
                                            field.no_stnk
                                        ) : (
                                            <InputForm
                                                value={field?.no_stnk}
                                                type="number"
                                                onChange={(value) => handleInputChangeList(i, 'no_stnk', value)}
                                                errors={formError.no_stnk}
                                            />
                                        )}
                                    </td>
                                    <td className="dark:text-white">
                                        {isUpdate[i] === undefined || !isUpdate ? (
                                            field.masa_berlaku
                                        ) : (
                                            <InputForm
                                                value={dateFormat(field?.masa_berlaku)}
                                                type="date"
                                                onChange={(value) => handleInputChangeList(i, 'masa_berlaku', value)}
                                                errors={formError.masa_berlaku}
                                            />
                                        )}
                                    </td>
                                    <td >
                                        {isUpdate[i] === undefined || !isUpdate[i] ? (
                                            <div className="flex item-center gap-1">
                                                <button type="button" className="btn btn-primary btn-outline btn-sm" onClick={() => handleUpdateClick(i)} >
                                                    <RxUpdate />
                                                </button>
                                                <button type="button" className="btn btn-error btn-outline btn-sm" onClick={() => deleteData(i)} >
                                                    <MdDeleteForever />
                                                </button>
                                            </div>
                                        ) :
                                            <div className="flex item-center gap-1">
                                                <button type="button" className="btn btn-primary btn-outline btn-sm" onClick={() => saveUpdate(i)} >
                                                    {prosesUpdate ? <span className="loading loading-spinner"></span> : <CiSaveDown1 />}
                                                </button>
                                                <button type="button" className="btn btn-error btn-outline btn-sm" onClick={() => setIsUpdate({})}  >
                                                    <IoClose />
                                                </button>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    if (action === "UPDATE") {
        return (
            <AddDetail initialData={initialData} dataDetail={dataDetail} />
        )
    }

    return (
        <>
            <InputForm
                label="Nama"
                value={dataForm?.name}
                type="text"
                onChange={(value) => handleInputChange('name', value)}
                errors={formError.name}
            />

            <InputForm
                label="Username"
                value={dataForm?.username}
                type="text"
                onChange={(value) => handleInputChange('username', value)}
                errors={formError.username}
            />

            <InputForm
                label="Email"
                value={dataForm?.email}
                type="email"
                onChange={(value) => handleInputChange('email', value)}
                errors={formError.email}
            />

            <InputForm
                label="Password"
                value={dataForm?.password}
                type="password"
                onChange={(value) => handleInputChange('password', value)}
                errors={formError.password}
            />


            <TextArea
                label="Alamat"
                value={dataForm?.alamat}
                onChange={(value) => handleInputChange('alamat', value)}
            />

            <InputForm
                label="No. Tlp"
                value={dataForm?.no_tlp}
                type="text"
                onChange={(value) => handleInputChange('no_tlp', value)}
                errors={formError.no_tlp}
            />

            <Dropdown
                label="Role"
                data={dataRole}
                onChange={(value) => handleInputChange('role', value)}
                value={initialData?.role}
            />

        </>
    )
};
export default UserContent;