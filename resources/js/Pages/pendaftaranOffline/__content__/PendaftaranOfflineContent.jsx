import { useEffect } from "react";
import React from "react";
import {
    InputForm,
    ItemVertical,
    TextArea,
    Dropdown
} from "@/Components";

const PendaftaranOfflineContent = ({ action, initialData, dataForm, setData, formError, dataJadwal }) => {
    
    const handleInputChange = (name, value) => {
        setData(name, value)
    };

    const dropdownTipePendaftaran = [
        {value: 'online', label: 'Online'},
        {value: 'offline', label: 'Offline'}
    ];
    
    const dropdownJadwal = dataJadwal.map((object) => {
        return {
            value: object.id,
            label: object.tgl_samling
        }
    });
    
    const dropdownStatus = [
        {value: 1, label: 'Belum Diproses'},
        {value: 2, label: 'Dalam Diproses'},
        {value: 3, label: 'Selesai'},
    ]

    return (
        <>
            {action === 'FORM1' && (
                <React.Fragment>
                    <InputForm
                        label="Nama"
                        value={dataForm?.nama}
                        type="text"
                        onChange={(value) => handleInputChange('nama', value)}
                        errors={formError.nama}
                    />
                    <InputForm
                        label="No. Plat Kendaraan"
                        value={dataForm?.plat_kendaraan}
                        type="text"
                        onChange={(value) => handleInputChange('plat_kendaraan', value)}
                        errors={formError.plat_kendaraan}
                    />
                    <InputForm
                        label="Tipe Kendaraan"
                        value={dataForm?.tipe_kendaraan}
                        type="text"
                        onChange={(value) => handleInputChange('tipe_kendaraan', value)}
                        errors={formError.tipe_kendaraan}
                    />
                    <InputForm
                        label="No. STNK"
                        value={dataForm?.no_stnk}
                        type="text"
                        onChange={(value) => handleInputChange('no_stnk', value)}
                        errors={formError.no_stnk}
                    />
                    <InputForm
                        label="Masa Berlaku"
                        value={dataForm?.masa_berlaku}
                        type="date"
                        onChange={(value) => handleInputChange('masa_berlaku', value)}
                        errors={formError.masa_berlaku}
                    />
                     <InputForm
                        label="No. Tlp"
                        value={dataForm?.no_tlp}
                        type="text"
                        onChange={(value) => handleInputChange('no_tlp', value)}
                        errors={formError.no_tlp}
                    />
                    <TextArea
                        label="Alamat"
                        value={dataForm?.alamat}
                        onChange={(value) => handleInputChange('alamat', value)}
                        errors={formError.alamat}
                    />
                </React.Fragment>
            )}

            {action === 'FORM2' && (
                <React.Fragment>
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
            )}
        </>
    )
};
export default PendaftaranOfflineContent; 