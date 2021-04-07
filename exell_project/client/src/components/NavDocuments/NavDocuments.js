import React, { useEffect } from 'react';
import DocumentItem from './DocumentItem/DocumentItem.js';
import { getDocuments, deleteDocument } from '../../actions/documents.js';
import { connect } from 'react-redux';

const NavDocuments = ({ documents, getDocuments, deleteDocument }) => {
    console.log(documents)
    
    useEffect(() => {
        getDocuments();
    }, []);
    
    return (
        <table border={2}>
            <tr>
                <th>Name</th>
                <th>Changed at</th>
                <th>Created at</th>
            </tr>
            <tbody>
                {documents.map(
                    curDoc => { 
                        return (
                            <DocumentItem 
                                doc={curDoc} 
                                key={curDoc._id}
                                deleteDocument={deleteDocument}
                            />
                        )
                    }
                )}
            </tbody>
        </table>
    );
}

const CNavDocuments = connect(state => ({ documents: state.documents }), { getDocuments, deleteDocument })(NavDocuments);

export default CNavDocuments;