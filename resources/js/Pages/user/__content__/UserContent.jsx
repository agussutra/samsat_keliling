import { react, useEffect } from "react";
import {
    InputForm,
    ItemVertical,
    TextArea,
    Dropdown
} from "@/Components";


const UserContent = ({ action, initialData, dataForm, setData, formError }) => {

    useEffect(() => {
        if (action === "CREATE") {
            setData((prevData) => ({
                ...prevData,
                name: '',
                email: '',
                password: '',
                username: '',
                role: '',
                alamat: '',
                no_tlp: '',
            }));
        } else if (action === "UPDATE") {
            setData((prevData) => ({
                ...prevData,
                name: initialData?.name || '',
                email: initialData?.email || '',
                password: '',
                username: initialData?.username || '',
                role: initialData?.role || '',
                alamat: initialData?.alamat || '',
                no_tlp: initialData?.no_tlp || '',
            }));
        }
    }, [action]);

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