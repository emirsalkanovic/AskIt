const passport = require('passport');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require('cors');
const Data = require('./models/Question');
const Comment = require("./models/Comments");
const Like = require("./models/Likes");
const Unlike = require("./models/Unlikes");

const users = require("./routes/api/users");
const app = express();
const router = express.Router();

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//const db = require("./config/keys").mongoURI;
const db = process.env.MONGODB_URI;
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const db = process.env.MONGODB_URI;
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api", router);

router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/putData', (req, res) => {
    let data = new Data();

    const { user, message } = req.body;

    if (!user || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS'
        });
    }
    data.message = message;
    data.user = user;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/putComment", (req, res) => {
    console.log("request", req.body);
    Data.findById(req.body.id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.text = req.body.text;
                    comment.author = req.body.author;
                    comment.save();
                    data.comments.push(comment);
                    data.save((err) => {
                        if (err) return res.json({ success: false, error: err });
                        return res.json({ success: true });
                    });
                }
            });
        }
    });
});

router.post("/putLike", (req, res) => {
    console.log("like", req.body);
    Data.findById( req.body.id , function (err, data) {
        if (err) {
            console.log(err);
        } else {
            Like.create({ text: req.body.like }, function (err, like) {
                if (err) {
                    console.log(err);
                } else {
                    like.text = req.body.text;
                    like.save();
                    data.likes.push(like);
                    data.save((err) => {
                        if (err) return res.json({ success: false, error: err });
                        return res.json({ success: true });
                    });
                }
            });
        }
    });
});

router.post("/putUnlike", (req, res) => {
console.log("unlike", req.body);
Data.findById(req.body.id, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        Unlike.create({ text: req.body.unlike }, function (err, unlike) {
            if (err) {
                console.log(err);
            } else {
                unlike.text = req.body.text;
                unlike.save();
                data.unlikes.push(unlike);
                data.save((err) => {
                    if (err) return res.json({ success: false, error: err });
                    return res.json({ success: true });
                });
            }
        });
    }
});
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}