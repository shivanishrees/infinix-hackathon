const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const posts = {
  Circular: [],
  "Department Happening": [],
  "Technical Events": [],
  "Extra Circular": [],
};

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

app.post('/post', (req, res) => {
  const { category, message } = req.body;

  if (category && message) {
    posts[category].push(message);
  }

  res.redirect('/InfoHub');
});
app.post('/post', (req, res)=>{
  const Post = mongoose.model('Post', postSchema);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
