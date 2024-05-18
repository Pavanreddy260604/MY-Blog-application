import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home');
});



app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/getstart',(req,res)=>{
    res.render("createblog.ejs");
})
let blogPosts = [];
let updatedBlogPosts = [];
app.post('/submit', (req, res) => {
    const { title, subject, content } = req.body;
    const newPost = { id: blogPosts.length + 1, title, subject, content };
    blogPosts.push(newPost);
    res.redirect('/blogs');
});


app.get('/blogs', (req, res) => {
    res.render('blogs', { posts: blogPosts });
});

app.get('/blog1/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);
    if (post) {
        res.render('blog1', { post });
    } else {
        res.status(404).send('Post not found');
    }
});
// Delete Post Route
// Delete Post Route
app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1);
        // Redirect to the blogs page after successful deletion
        res.redirect('/blogs');
    } else {
        res.status(404).send('Post not found');
    }
});
app.get('/blog', (req, res) => {
    res.render('blog');
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
