const   express         = require('express'), 
        mongoose        = require('mongoose'), 
        bodyParser      = require('body-parser'), 
        app             = express(); 
        
mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true }); 

// APP CONFIG  
app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 

// MONGOOSE/MODEL CONFIG 
var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, //{ type: String, default: "example.jpg"}
    body: String, 
    created: {type: Date, default: Date.now}
}); 
var Blog = mongoose.model("Blog", blogSchema); 
/*
Blog.create({
    title: "Test Blog", 
    image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg", 
    body: "This is a blog post"
}); 
*/ 
// RESTFUL ROUTES 
app.get("/", function(req,res) { 
    res.redirect("/blogs"); 
}); 

// INDEX ROUTE 
app.get("/blogs", function(req,res) {
     Blog.find({}, function(err, blogs){ 
        if(err) { 
            console.log("Error: ", err); 
        } else { 
            res.render("index", { blogs: blogs});
        }
    })
}); 
// NEW ROUTE 
app.get("/blogs/new", function(req,res) { 
    res.render("new"); 
}); 

// CREATE ROUTE 
app.post("/blogs", function(req,res) { 
    Blog.create(req.body.blog, function(err, newBlog) { 
        if(err) { 
            res.render("new"); 
        } else {
            res.redirect("/blogs"); 
        }
    }); 
}); 

// SHOW ROUTE 
app.get("/blogs/:id", function(req, res){ 
    Blog.findById(req.params.id, function(err, foundBlog){ 
        if(err){ 
            res.redirect("/blogs"); 
        } else { 
            res.render("show", {blog: foundBlog}); 
        }
    })

}); 
app.listen(3000, function() { 
    console.log("Servers up!"); 
})