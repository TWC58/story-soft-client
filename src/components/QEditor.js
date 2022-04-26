import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import ReactQuill from 'react-quill';

require('react-quill/dist/quill.snow.css');

export default function QEditor({handleSectionDataChange, currentSectionData}) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
   
    return (
        <ReactQuill value={currentSectionData} onChange={handleSectionDataChange} />
    )
  }