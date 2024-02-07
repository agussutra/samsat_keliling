import React from "react";
import { TextEditor } from "@/Components";

const InformasiContent = ({dataForm, setData, formError }) => {

    const handleInputChange = (name, value) => {
        setData(name, value)
    };
    
    return (
        <>
            <TextEditor value={dataForm.informasi_samling} onChange={(value) => handleInputChange('informasi_samling',value)}  errors={formError.informasi_samling} />
        </>
    )
};
export default InformasiContent;