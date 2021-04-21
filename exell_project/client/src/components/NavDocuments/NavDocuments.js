import React, { useState, useEffect } from 'react';
import DocumentItem from './DocumentItem/DocumentItem.js';
import FormCreateDocument from './CreateDocumentForm/CreateDocumentForm.js';
import { actionGetDocuments, actionCreateDocument, actionDeleteDocument } from '../../actions/documents.js';
import { connect } from 'react-redux';

const DocItems = ( {docs, actionDeleteDocument} ) => {
    return (
        <>
            {docs.map(
                curDoc => { 
                    return (
                        <DocumentItem 
                            doc={curDoc}
                            key={curDoc._id}
                            deleteDocument={actionDeleteDocument}
                        />
                    )
                }
            )}
        </>
    );
}

const NavDocuments = ( { documents, actionGetDocuments, actionCreateDocument, actionDeleteDocument } ) => {
    const [ newDocumentName, setNewDocumentName ] = useState('');

    useEffect( () => {
        actionGetDocuments();
    }, [] );

    console.log('Local state')
    console.log(documents);

    // const createDocumentHandle = () => actionCreateDocument( { name: newDocumentName } );
    
    return (
        <>
            <button onClick={ () => actionCreateDocument( { name: newDocumentName } ) }>Create new document </button>
            <p>
                <input onChange={(e) => setNewDocumentName(e.target.value)} id='newDocumentName' type='text'></input>
            </p>
            <FormCreateDocument/>
            <table border={2}>
                <tr>
                    <th>Name</th>
                    <th>Changed at</th>
                    <th>Changed by</th>
                    <th>Created at</th>
                    <th>Created by</th>
                </tr>
                <tbody>
                    <DocItems docs={ documents } actionDeleteDocument={ actionDeleteDocument } />
                </tbody>
            </table>
        </>
    );
}

const CNavDocuments = connect( state => ({ documents: state.documents }), { actionGetDocuments, actionCreateDocument, actionDeleteDocument } )(NavDocuments);

export default CNavDocuments;