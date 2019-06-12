// server.js
// where your node app starts

// init
// setup express for handling http requests
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
const {signup, signin, protect} = require('./utils/auth');
const userRouter = require('./user/user.router'); 
const shiftRouter = require('./shift/shift.router'); 
const listRouter = require('./list/list.router'); 



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public')); // http://expressjs.com/en/starter/static-files.html
var connected=false;
app.listen(3000);
console.log('Listening on port 3000');
    

app.use(express.static('public'));
app.use('/api/user', userRouter)
app.use('/api/shift', shiftRouter)
app.use('/api/list', listRouter)

//app.use()
// define functions that would fetch the function that would create the 
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
// setup nunjucks for templating in views/index.html
var nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true, express: app });

// setup our datastore
var datastore = require("./datastore").sync;
datastore.initializeApp(app);

// create routes

app.get("/api/list", function (request, response) {
  try {
    initializeDatastoreOnProjectCreation();
    var list = datastore.get("list");
    response.render('index.html', {
      title: "Welcome!",
      list: list.reverse()
    });
  } catch (err) {
    console.log("Error: " + err);
    handleError(err, response);
  }
});

app.post("/list", function (request, response) {
  try {
    // Get the existing shifts from the MongoDB and put it into an array called posts
    var list = datastore.get("list");
    // We get the contents of the submitted form and append it to the posts array
    list.push(request.body); // the form data is in request.body because we're using the body-parser library to help make dealing with requests easier
    // We store the updated posts array back in our database posts entry
    datastore.set("list", list);
    // And then we redirect the view back to the homepage
    response.redirect("/");
  } catch (err) {
    handleError(err, response);
  }
});

app.get("/reset", function (request, response) {
  try {
    datastore.removeMany(["list", "initialized"]);
    response.redirect("/");
  } catch (err) {
    handleError(err, response);
  }
});

app.get("/delete", function (request, response) {
  try {
    datastore.set("posts", []);
    response.redirect("/");
  } catch (err) {
    handleError(err, response);
  }
});

function handleError(err, response) {
  response.status(500);
  response.send(
    "<html><head><title>Internal Server Error!</title></head><body><pre>"
    + JSON.stringify(err, null, 2) + "</pre></body></pre>"
  );
}

// ------------------------
// DATASTORE INITIALIZATION

function initializeDatastoreOnProjectCreation() {
  if(!connected){
    connected = datastore.connect();
  }
  if (!datastore.get("initialized")) {
    datastore.set("shifts", initialShifts);
    datastore.set("initialized", true);
  }  
}

var initialShifts = [
];