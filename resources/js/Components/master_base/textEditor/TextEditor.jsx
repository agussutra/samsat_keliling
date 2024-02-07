import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({value, onChange, errors}) => {
    const toolbarOption = [
        ['bold', 'italic', 'underline', 'strike'],       
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],     
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                        
        [{ 'size': ['small', false, 'large', 'huge'] }], 
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],  
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];
    const module = {
        toolbar: toolbarOption
    }
    const handleChange = (e) => {
        onChange(e);
    };

    return (
        <>
            <ReactQuill theme="snow" modules={module} value={value} onChange={(e) => handleChange(e)} className="dark:text-white" />
            {errors && <span className="text-red-400 text-sm mt-2">{errors} !</span>}
        </>
    )
};
export { TextEditor as default, TextEditor };
