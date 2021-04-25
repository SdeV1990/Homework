import React from 'react';
// import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const DocumentItem = ({doc, deleteDocument }) => {
    // const history = useHistory();

    const openDocument = (docID) => {
        console.log(docID);
        // history.push(`/document/${docID}`);
    }

    return (
        <tr>
            <td>{doc.name}</td>
            <td>{`${new Date(doc.changedAt).toLocaleTimeString()} ${new Date(doc.changedAt).toLocaleDateString()}`}</td>
            <td>{`${new Date(doc.createdAt).toLocaleTimeString()} ${new Date(doc.createdAt).toLocaleDateString()}`}</td>
            <td>
                <Button onClick={ () => deleteDocument(doc._id) }>
                    <DeleteIcon color="action" />
                </Button>
            </td>
            <td>
                <Button onClick={ () => openDocument(doc._id) }>Open</Button>
            </td>
        </tr>
    );
}

export default DocumentItem;