const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database.js');
const Auth = require('./routes/auth.js');
const Post = require('./routes/post.js');
const HashtagsContents = require('./models/hashtags-and-contents.js');
const hashtagClicks = require('./models/hashtag-clicks.js');
const {message} = require('./controllers/auth.js');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(cors());
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));

app.use('/', Auth);
app.use('/', Post);
app.use('/login', function(req, res) {
    res.render('login', {message});
});
app.use('/register', function(req, res) {
    res.render('register',{message});
});
app.use('/write', function(req, res) {
    res.render('write');
});
app.use('/homepage', function(req, res) {
    res.render('homepage');
});
app.use('/searchedContents', async (req, res) => {
    const { tag } = req.query;
  
    try {
      const searchContent = await HashtagsContents.find({hashtag: {$in : tag.split(',')}});
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
      res.render('searchedContents', {searchContent});
    } catch (err) {
        console.error(err);
      res.status(500).send('Error fetching data');
    }
  });

const PORT = process.env.PORT || 5000;

db()

app.listen(PORT, () => {
    console.log("server is running on port: 5000");
})