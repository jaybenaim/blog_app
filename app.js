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

Blog.create({
    title: "Test Blog", 
    image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg", 
    body: "This is a blog post"
}); 

// RESTFUL ROUTES 
app.get("/", function(req,res) { 
    res.redirect("/blogs"); 
}); 

app.get("/blogs", function(req,res) {
    res.render("index"); 
}); 

app.listen(3000, function() { 
    console.log("Servers up!"); 
})