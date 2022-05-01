import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

//require('react-quill/dist/quill.snow.css');

export default function QEditor({ handleSectionDataChange, currentSectionData }) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const modules = {
		toolbar: [
	      [{ 'font': [] }],
	      [{ 'size': ['small', false, 'large', 'huge'] }],
	      ['bold', 'italic', 'underline'],
	      [{'list': 'ordered'}, {'list': 'bullet'}],
	      [{ 'align': [] }],
	      [{ 'color': [] }, { 'background': [] }],
	      ['clean']
	    ]
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
            theme="snow"
            value={currentSectionData}
            onChange={handleSectionDataChange}
            modules={modules}
            formats={formats}
        />
    )
}