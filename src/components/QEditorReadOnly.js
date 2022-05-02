import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

//require('react-quill/dist/quill.snow.css');

export default function QEditorReadOnly({ handleSectionDataChange, currentSectionData }) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const modules = {
		toolbar: false
	}

    const formats = [
	    'font',
	    'size',
	    'bold', 'italic', 'underline',
	    'list', 'bullet',
	    'align',
	    'color', 'background'
  	];



    return (
        <ReactQuill
            readOnly={true}
            theme="snow"
            value={currentSectionData}
            modules={modules}
            formats={formats}
            sx={{ height: '75%' }}
        />
    )
}