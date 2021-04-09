import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CNavDocuments from '../NavDocuments/NavDocuments';

import { getDocuments, createDocument } from '../../actions/documents';

const Home = () => {
  const [newDocumentName, setNewDocumentName] = useState('');
  const dispatch = useDispatch();
  
    useEffect(() => {
        getDocuments();
    }, []);

    const handleCreateDocument = () => {
        dispatch(createDocument({ name: newDocumentName }));
    }

    return (
        <>
            <button onClick={handleCreateDocument}>Create new document</button>
            <p>
                <input onChange={(e) => setNewDocumentName(e.target.value)} id='documentName' type='text'></input>
            </p>
            <CNavDocuments />
        </>
    );
};

export default Home;
