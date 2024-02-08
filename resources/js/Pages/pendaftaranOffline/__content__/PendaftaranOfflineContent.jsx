import { useEffect } from "react";
import React from "react";
import {
    InputForm,
    ItemHorizontal,
    TextArea,
    Dropdown
} from "@/Components";

const PendaftaranOfflineContent = ({ action, initialData, dataForm, setData, formError, dataJadwal, dataWajibPajak }) => {

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

    const dropdownWajibPajak = dataWajibPajak?.map((object) => {
        return {
            value: object.id,
            label: object.nama
        }
    })

    if (action === "DELETE") {
        return (
            <>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <ItemHorizontal label="Kode Antrian" value={initialData.kode_pendaftaran} />
                        <ItemHorizontal label="Nama" value={initialData.nama} />
                        <ItemHorizontal label="Tgl. Pendaftaran" value={initialData.tgl_pendaftaran} />
                        <ItemHorizontal label="Tgl. Samling" value={initialData.tgl_samling} />
                    </div>
                    <div>
                        <ItemHorizontal label="Kode Antrian" value={initialData.status_antrian === 1 ? 'Belum Diproses' : (initialData.status_antrian === 2 ? 'Sedang Diproses' : 'Selesai')} />
                        <ItemHorizontal label="Tipe Pendaftaran" value={initialData.tipe_pendaftaran} />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <React.Fragment>
                <Dropdown
                    label="Wajib Pajak"
                    data={dropdownWajibPajak}
                    onChange={(value) => handleInputChange('wajib_pajak_id', value)}
                    value={dataForm?.wajib_pajak_id}
                    errors={formError.wajib_pajak_id}
                />
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
                <InputForm
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
                />
            </React.Fragment>
        </>
    )
};
export default PendaftaranOfflineContent; 