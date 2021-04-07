import React from 'react';
import { useHistory } from 'react-router-dom';

const DocumentItem = ({doc, deleteDocument }) => {
    const history = useHistory();

    const openDocument = (docID) => {
        // console.log(docID);
        history.push(`/document/${docID}`);
    }

    return (
        <tr>
            <td>{doc.name}</td>
            <td>{`${new Date(doc.changedAt).toLocaleTimeString()} ${new Date(doc.changedAt).toLocaleDateString()}`}</td>
            <td>{`${new Date(doc.createdAt).toLocaleTimeString()} ${new Date(doc.createdAt).toLocaleDateString()}`}</td>
            <td>
                <button onClick={ () => deleteDocument(doc._id) }>Delete</button>
            </td>
            <td>
                <button onClick={ () => openDocument(doc._id) }>Open</button>
            </td>
        </tr>
    );
}

export default DocumentItem;