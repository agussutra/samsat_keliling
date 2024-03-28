import { react, useEffect } from "react";
import {
    InputForm,
    ItemVertical,
    TextArea
} from "@/Components";


const JadwalSamlingContent = ({ action, initialData, dataForm, setData, formError }) => {
    useEffect(() => {
        if (action === "CREATE") {
            setData((prevData) => ({
                ...prevData,
                tgl_samling: '',
                jam_samling: '',
                info_samling: '',
                lokasi_samling: '',
                jam_samling_selesai: '',
            }));
        } else if (action === "UPDATE") {
            setData((prevData) => ({
                ...prevData,
                tgl_samling: initialData?.tgl_samling || '',
                jam_samling: initialData?.jam_samling || '',
                info_samling: initialData?.info_samling || '',
                lokasi_samling: initialData?.lokasi_samling || '',
                jam_samling_selesai: initialData?.jam_samling_selesai || '',
            }));
        }
    }, [action]);


    const handleInputChange = (name, value) => {
        setData(name, value)
    };

    if (action === "READ" || action === "DELETE") {
        return (
            <>
                <ItemVertical label="Tgl. Samling" value={initialData.tgl_samling} />
                <ItemVertical label="Jam Samling" value={initialData.jam_samling} />
                <ItemVertical label="Jam Samling Selesai" value={initialData.jam_samling_selesai} />
                <ItemVertical label="Info Samling" value={initialData.info_samling} />
                <ItemVertical label="Lokasi Samling" value={initialData.lokasi_samling} />
            </>
        )
    }

    return (
        <>
            <InputForm
                label="Tgl. Samling"
                value={dataForm?.tgl_samling}
                type="date"
                onChange={(value) => handleInputChange('tgl_samling', value)}
                errors={formError.tgl_samling}
            />

            <InputForm
                label="Jam. Samling"
                value={dataForm?.jam_samling}
                type="time"
                onChange={(value) => handleInputChange('jam_samling', value)}
                errors={formError.jam_samling}
            />

            <InputForm
                label="Jam. Samling Selesai"
                value={dataForm?.jam_samling_selesai}
                type="time"
                onChange={(value) => handleInputChange('jam_samling_selesai', value)}
                errors={formError.jam_samling_selesai}
            />

            <TextArea
                label="Info Samling"
                value={dataForm?.info_samling}
                onChange={(value) => handleInputChange('info_samling', value)}
                errors={formError.info_samling}
            />

            <TextArea
                label="Lokasi Samling"
                value={dataForm?.lokasi_samling}
                onChange={(value) => handleInputChange('lokasi_samling', value)}
                errors={formError.lokasi_samling}
            />

        </>
    )
};
export default JadwalSamlingContent;