import { React, useEffect } from "react";
import {
    InputForm,
    ItemVertical,
    TextArea,
    Dropdown
} from "@/Components";


const WajibPajakContent = ({ action, initialData, dataForm, setData, formError }) => {

    useEffect(() => {
        if (action === "CREATE") {
            setData((prevData) => ({
                ...prevData,
                nama: '',
                alamat: '',
                no_tlp: '',
                plat_kendaraan: '',
                tipe_kendaraan: '',
                no_stnk: '',
                masa_berlaku: '',
            }));
        } else if (action === "UPDATE") {
            setData((prevData) => ({
                ...prevData,
                nama: initialData?.nama || '',
                alamat: initialData?.alamat || '',
                no_tlp: initialData?.no_tlp || '',
                plat_kendaraan: initialData?.plat_kendaraan || '',
                tipe_kendaraan: initialData?.tipe_kendaraan || '',
                no_stnk: initialData?.no_stnk || '',
                masa_berlaku: initialData?.masa_berlaku || '',
            }));
        }
    }, [action]);

    const handleInputChange = (name, value) => {
        setData(name, value)
    };

    if (action === "READ" || action === "DELETE") {
        return (
            <>
                <ItemVertical label="Nama" value={initialData.nama} />
                <ItemVertical label="Alamat" value={initialData.alamat} />
                <ItemVertical label="No. Tlp" value={initialData.no_tlp} />
                <ItemVertical label="Plat Kendaraan" value={initialData.plat_kendaraan} />
                <ItemVertical label="Tipe Kendaraan" value={initialData.tipe_kendaraan} />
                <ItemVertical label="No. STNK" value={initialData.no_stnk} />
                <ItemVertical label="Masa Berlaku" value={initialData.masa_berlaku} />
            </>
        )
    }

    return (
        <>
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
        </>
    )
};
export default WajibPajakContent;