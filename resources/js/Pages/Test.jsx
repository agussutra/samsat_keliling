import { ModalPrint } from "@/Components"
import Modal from "@/Components/master_component/Modal"
import React, { useRef } from "react"
import { useState } from "react"
import ReactToPrint, { useReactToPrint } from "react-to-print"

export default function Text() {
    const ref = useRef()

    const [itemData, setItemData] = useState({
        isOpen: false,
        data: {}
    })

    const handlePrintButtonClick = (item) => {
        setItemData(prev => ({
            ...prev,
            isOpen: true,
            data: item
        }));
    };


    const data = [
        {
            nama: 'Agus sutra',
            nim: '1810316'
        },
        {
            nama: 'Dayu Yanti',
            nim: '11111'
        },

    ]

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Nama</td>
                        <td>Nim</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => (
                        <tr key={key}>
                            <td>{item.nama}</td>
                            <td>{item.nim}</td>
                            <td>
                                <button className="btn" onClick={() => handlePrintButtonClick(item)}>Print</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div style={{ display: "none" }}>
                {itemData && <PrintLayout ref={ref} itemData={itemData} />}
            </div> */}

            {itemData.isOpen && <PrintModal data={itemData?.data} onClose={() => setItemData({ ...itemData, isOpen: false })} />}

        </>
    )
}


const PrintModal = ({ data, onClose }) => {
    const ref = useRef()
    const[isLoading, setIsLoading] = useState(false)

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        onBeforePrint: () => setIsLoading(true),
        onAfterPrint: () => setIsLoading(false),
    });

    return (
        <div>
            <ModalPrint
                onClose={onClose}
                onClick={handlePrint}
                processing={isLoading}
            >
               <PrintLayout data={data} ref={ref}/>
            </ModalPrint>

            <div style={{ display: "none" }}>
            <PrintLayout data={data} ref={ref}/>
            </div>

        </div>
    )
}


const PrintLayout = React.forwardRef(({data}, ref) => {
    
    return (
        <div ref={ref}>{data?.nama && data?.nama}</div>
    )
})