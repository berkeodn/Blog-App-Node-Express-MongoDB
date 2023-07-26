const Post = require('../models/post.js')
const Hashtags = require('../models/hashtags.js')
const slugify = require('../helpers/slugify.js')
const HashtagsContents = require('../models/hashtags-and-contents.js')
const hashtagClicks = require('../models/hashtag-clicks.js')



const createPost = async(req,res) => {
    try {
        const {title, content} = req.body;
        const newPost = await Post.create({title, content})

        res.status(201).json({
            newPost
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createHashtags = async(req,res) => {
    try {
        const {content} = req.body;
        const regex = /(?:^|)(?:#)([ığüşöçİĞÜŞÖÇ\w_-]+)/gi
        let match;
        const newHashtags = [];
        while ((match = regex.exec(content))) {
            const hashtag = match[1].toLowerCase();
            const slug = slugify(hashtag);
            const existingHashtag = await Hashtags.findOne({hashtag});
            if(existingHashtag){
                
            }
            else {
                const newHashtag = await Hashtags.create({ hashtag, slug });
                newHashtags.push(newHashtag); // Add new hashtag to the array
            }
        }
        res.status(201).json({
            newHashtags   
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createContents = async(req,res) => {
    try {
        const {content} = req.body;
        const regex = /(?:^|)(?:#)([ığüşöçİĞÜŞÖÇ\w_-]+)/gi
        let match;
        const newHashtags = [];
        while ((match = regex.exec(content))) {
            const hashtag = match[1].toLowerCase();
            newHashtags.push(hashtag); // Add new hashtag to the array
        }
        const newContent = await HashtagsContents.create({content, hashtag: newHashtags})
        res.redirect('/homepage') 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const searchContents = async(req,res) => {
    try {
        const {tag} = req.query;
        const searchContent = await HashtagsContents.find({hashtag: {$in : tag.split(',')}});
        // Find the hashtag in the database
        const existingHashtag = await hashtagClicks.findOne({ hashtag: tag });
  
        if (existingHashtag) {
            // If the hashtag already exists, increment the click count
            existingHashtag.clicks++;
            await existingHashtag.save();
        } else {
            // If the hashtag doesn't exist, create a new entry with click count as 1
            const newHashtag = new hashtagClicks({ hashtag: tag, clicks: 1 });
            await newHashtag.save();
        }
        const contents = searchContent.map(content => content.content);
        res.status(200).json({
            contents
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getHashtagClicks = async(req,res) => {
    try {
        const hashtagclicks = await hashtagClicks.find({}).sort({ clicks: -1 }).limit(10);
        res.status(200).json({
            hashtagclicks
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getPosts = async(req,res) => {
    try {
        const posts = await HashtagsContents.find({}, {content: 1, date: 1})
        res.status(200).json({
            posts
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getDetail = async(req,res) => {
    try {
        const {id} = req.params;
        const detailPost = await Post.findById(id)
        res.status(200).json({
            detailPost
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUpdate = async(req,res) => {
    try {
        const {id} = req.params;
        const updatePost = await HashtagsContents.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({
            updatePost
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deletePost = async(req,res) => {
    try {
        const {id} = req.params;
        await Post.findByIdAndRemove(id)
        res.status(201).json({
            message: "Deletion successful"
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const searchPost = async(req,res) => {
    const {search,tag} = req.query;
    try {
        const title = new RegExp(search, "i")

        const post = await Post.find({ $or: [{title}], tag:{$in: tag.split(",")}})

        res.status(200).json({
            post
        })

        return
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {createPost, getPosts, getDetail, getUpdate, deletePost, searchPost, createHashtags, createContents, searchContents, getHashtagClicks}