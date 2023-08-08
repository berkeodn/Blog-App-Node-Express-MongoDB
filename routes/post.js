const express = require('express');
const {createPost, getPosts, getDetail, getUpdate, deletePost, searchPost, createHashtags, createContents, searchContents, getHashtagClicks} = require('../controllers/post.js');
const isAuthenticated = require('../middleware/auth.js');

const router = express.Router();

router.get('/getPosts', getPosts)
router.post('/createPost', isAuthenticated, createPost)
router.get('/getDetail/:id', getDetail)
router.patch('/getUpdate/:id', isAuthenticated, getUpdate)
router.delete('/deletePost/:id',isAuthenticated, deletePost)
router.get('/searchPost', searchPost)
router.post('/createHashtags', createHashtags)
router.post('/createContents', createContents)
router.get('/searchContents', searchContents)
router.get('/getHashtagClicks', getHashtagClicks)

module.exports = router