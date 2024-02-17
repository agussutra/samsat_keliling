import { React, useEffect } from "react";
import {
    InputForm,
    ItemVertical,
} from "@/Components";


const RegisStnkContent = ({ action, initialData, dataForm, setData, formError }) => {

    useEffect(() => {
        if (action === "CREATE") {
            setData((prevData) => ({
                ...prevData,
                plat_kendaraan: '',
                tipe_kendaraan: '',
                no_stnk: '',
                masa_berlaku: '',
            }));
        } else if (action === "UPDATE") {
            setData((prevData) => ({
                ...prevData,
                plat_kendaraan: initialData?.plat_kendaraan || '',
                tipe_kendaraan: initialData?.tipe_kendaraan || '',
                no_stnk: initialData?.no_stnk || '',
                masa_berlaku: initialData?.masa_berlaku || '',
                no_stnk_old: initialData?.no_stnk || ''
            }));
        }
    }, [action]);

    const handleInputChange = (name, value) => {
        setData(name, value)
    };

    if (action === "READ" || action === "DELETE") {
        return (
            <>
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
        </>
    )
};
export default RegisStnkContent;