let express = require('express');
let app = express();
let fs = require('fs');
let ejs = require('ejs');
const fileUpload = require('express-fileUpload');
const {data} = require('./data');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
app.use(fileUpload());


app.get("/", function(request, response) {
  //response.send("This is homepage");
    //response.sendFile(__dirname + "/index.html");
    response.render('home', {data: data});
});

app.post("/addStudent", function(request, response) {
    if(!request.files)
      return response.status(400).send('No files were uploaded');
    let studentImage = request.files.studentImage;

    studentImage.mv(__dirname + '/assets/images/' + studentImage.name, function(err){
      if (err)
        //return response.status(500).send(err);
        response.send('File uploaded!');
    });
    request.body.src = studentImage.name;
      data.push(request.body);
      return response.redirect("/");
    //response.render('home');
});
app.get("/about", function(request, response) {
   response.render('about' ,{title:'Hello Title'});
});

app.get("/addStudent", function(request, response) {
   response.render('addStudent');
});

app.get("/studentDetails/:firstName", function(request, response) {
  const item = data.filter((item) => {
    return item.firstName == request.params.firstName
  })[0]
   response.render('studentDetails',{item:item});
  // console.log(item)
});
app.listen(7000, () => {
  console.log("Server Running on port 7000....");
});
