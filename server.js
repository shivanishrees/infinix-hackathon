const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB (optional: only if you're using a database)
mongoose.connect('mongodb://localhost:27017/infinixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Post model (assuming you have defined schema in models/Post.js)
const Post = require('./models/Post');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory posts (if not using MongoDB)
const posts = {
  Circular: [],
  "Department Happening": [],
  "Technical Events": [],
  "Extra Circular": [],
};

// Routes
app.get('/', (req, res) => {
  res.render('homepage');
});

app.get('/InfoHub', (req, res) => {
  res.render('InfoHub', { posts });
});

app.get('/LabCounter', (req, res) => {
  res.render('LabCounter', { posts });
});

app.get('/post', (req, res) => {
  res.render('createPost');
});

app.post('/post', async (req, res) => {
  const { category, message } = req.body;

  if (category && message) {
    // Save to in-memory storage
    posts[category].push(message);

    // Optional: Save to MongoDB
    try {
      const newPost = new Post({ category, message });
      await newPost.save();
    } catch (err) {
      console.error('Error saving to DB:', err);
    }
  }

  res.redirect('/InfoHub');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
