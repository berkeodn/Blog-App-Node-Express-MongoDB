const express = require('express');
const {createPost, getPosts, getDetail, getUpdate, deletePost, searchPost, createHashtags, createContents, searchContents, getHashtagClicks} = require('../controllers/post.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.get('/getPosts', getPosts)
router.post('/createPost', auth, createPost)
router.get('/getDetail/:id', getDetail)
router.patch('/getUpdate/:id', auth, getUpdate)
router.delete('/deletePost/:id',deletePost)
router.get('/searchPost', searchPost)
router.post('/createHashtags', createHashtags)
router.post('/createContents', createContents)
router.get('/searchContents', searchContents)
router.get('/getHashtagClicks', getHashtagClicks)

module.exports = router