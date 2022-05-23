//  MODULES

const express = require("express");
const app = express();
const mongoose = require("mongoose");

//  SCHEMAS

const User = require('./User');
const Message = require('./Message');

//  CONSTANTS

const sess = {username: "Undefined"};
const PORT = 6969;

//  SETUP

app.set("view engine", "ejs");
app.use(express.static("public")); //Defines where the static files are (JS and CSS) relative to the root directory
app.use(express.urlencoded({ extended: false }));

// This works as long as you run {MongoDB directory}/mongod --ipv6 beforehand in cmd.admin
mongoose.connect("mongodb://localhost/rp-db-1").then(() => console.log("MONGODB STATE => " + mongoose.connection.readyState));

//  GET ROUTES

app.get("/", (req, res) => {
    res.render("index");
    //TODO: Implement session check with express-session module. Not needed for now. 
    if(sess.username !== "Undefined") {
        console.log("Current user: " + sess.username);
    }
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/games", (req, res) => {
    res.render("games");
});

app.get("/ladderboard", (req, res) => {
    // TODO: fetch top 5 scorers from the database
    res.render("ladderboard");
});

app.get("/games/poke-the-bird", (req, res) => {
    res.render("bird");
});

app.get("/games/press-the-button", (req, res) => {
    res.render("press");
});

app.get("/games/guess-the-word", (req, res) => {
    //TODO: Pass an array of JSONs containing guess-charades pairs from the database
    res.render("guess");
});

app.get("/games/riddle-me-this", (req, res) => {
    //TODO: Pass an array of JSONs containing answer-riddle pairs from the database
    res.render("riddle");
});

//  POST ROUTES

app.post("/games/score", (req, res) => {
    if (sess.username !== "Undefined") {
        let score = req.body.score;
        //console.log("Score: " + score);
        //Function that updates the score of the currently logged in user 
        async function updateScore(){
            const winner = await User.findOne({username: sess.username});
            if(winner) {
                //console.log("Winner found");
                let winnerScore = Number(winner.toObject().score) + Number(score);
                await User.updateOne({username: sess.username}, {score: winnerScore});
            }
        }
        //  Scaffolding for sanity check => logs the updated stats from database
        async function logWinner(){
            const newWinner = await User.findOne({username: sess.username}); 
            if(newWinner) {
               //console.log(winner);
               console.log("UPDATED");
               console.log('name: ' + newWinner.toObject().username);
               console.log('score: ' + (newWinner.toObject().score + Number(score)));
            }
        }
        updateScore();
        logWinner();
    }
    //res.redirect("/games");
});

app.post("/Contact", (req, res) => {
    const newMessage = new Message({
        email: req.body.email,
        message: req.body.message
    });
    newMessage.save().then(message => console.log(message.email + ": " + message.message)).catch(err => console.log(err.message));

    //  Scaffolding for sanity check => displays the saved details email + message from database
    async function logMessage(){
        const tester = await Message.findOne({email: req.body.email}); 
        if(tester) {
           //console.log(tester);
           console.log('address: ' + tester.toObject().email);
           console.log('message: ' + tester.toObject().message);
        }
    }
    logMessage();
    
    res.redirect("/");
});

//  TODO: Integrate express-session module functionality? No need for now. 
app.post("/Login", (req, res) => {
    User.findOne({username: req.body.username
    }).then(user => {
        if (user) {
            if (user.password === req.body.password) {
                sess.username = user.username;
                console.log(sess.username + " logged in");
                res.redirect("/");
            } else {
                console.log("Wrong password!!!");
                res.redirect("/Login");
            }
        } else {
            console.log("Username not found!!!");
            res.redirect("/Login");
        }
    });
});

app.post("/Register", (req, res) => {
    User.findOne({
        $or: [{
            email: req.body.email
        }, {
            username: req.body.username
        }]
    }).then(user => {
        if (user) {
            if (user.username === req.body.username) {
                console.log("Username already exists!!!");
                res.redirect("/Register");
            } else {
                console.log("Email already exists!!!");
                res.redirect("/Register");
            }
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                score: 0
            });
            newUser.save().then(user => console.log(user)).catch(err => console.log(err.message));
            res.redirect("/Login");
        }
    });
});

//  LAUNCH SERVER

app.listen(PORT, () => {
    console.log("SERVER STARTED => PORT: " + PORT);
});
