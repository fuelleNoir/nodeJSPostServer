const express = require('express');
const router = express.Router();
const { getPost,
    deletePost,
    editPost,
    getPosts,
    addPost } = require('../controllers/api-post-controller');

    //get all posts
    router.get('/api/posts', getPosts);
    //add new post
    router.post('/api/post', addPost);
    //get post by ID
    router.get('/api/post/:id', getPost);
    // delete post by ID
    router.delete('/api/post/:id', deletePost);
    // upd post by ID
    router.put('/api/post/:id', editPost);

    

module.exports = router;