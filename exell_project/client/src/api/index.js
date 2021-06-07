import axios from 'axios';

// Base URL
const API = axios.create({ baseURL: 'http://localhost:5000/' });

// Interceptors (JWT)
API.interceptors.request.use((req) => {

    // Join authorization token to request
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// User
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// Documents
export const getDocuments = () => API.get('documents');
export const getRecycledDocuments = () => API.get('documents/recycle');
export const createDocument = (newDocument) => API.post('/documents', newDocument);
// export const recycleDocuments = (documentsIDToRecycle) => API.post(`documents/recycle`, documentsIDToRecycle);
export const restoreDocuments = (documentsIDToRestore) => API.post(`documents/restore`, documentsIDToRestore);
export const deleteDocuments = (documentsIDToDelete) => API.post(`documents/delete`, documentsIDToDelete);
export const updateDocuments = (update) => API.post(`documents/update`, update);

// Document
export const getDocument = (documentId) => API.post(`document`, documentId);




// Template
// export const fetchPosts = () => API.get('/posts');
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);