const express = require("express"); const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const app = express();

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", (req, res) => {
    const {
        email,
        password
    } = req.body;

    User.findOne({ email: email })
        .then((result) => {
            if (result) {
                bcrypt.compare(password, result.password, (err, bresult) => {
                    if (bresult) {
                        jwt.sign({ email: email }, "secretkey", (err, token) => {
                            res.json({
                                success: true,
                                token
                            });
                        });
                    }
                    else {
                        return res.json({ success: false, error: 'password' });
                    }
                })
            }
            else {
                return res.json({ success: false, error: 'email' });
            }
        })
})

app.post("/api/register", (req, res) => {

    const {
        username,
        email,
        password,
        name,
        major
    } = req.body;

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
            if (err) throw err;
            else {
                const newUser = new User({
                    username,
                    email,
                    password: hashedPassword,
                    name,
                    major
                });
                newUser.save((err, data) => {
                    if (err) {
                        let error = Object.keys(err.keyValue)[0];
                        if (error == 'username') {
                            return res.json({ success: false, error: 'user' });
                        }
                        else if (error == 'email') {
                            return res.json({ success: false, error: 'email' });
                        }
                    }
                    else {
                        jwt.sign({ email: email }, "secretkey", (err, token) => {
                            res.json({
                                success: true,
                                token
                            });
                        });
                    }
                });
            }
        });
    });
})

app.post("/api/checkUniqueUsername", (req, res) => {
    const { username } = req.body;
    return User.findOne({ username: username })
        .then(result => { return res.json(result) })
})

app.post("/api/checkUniqueEmail", (req, res) => {
    const { email } = req.body;
    return User.findOne({ email: email })
        .then(result => { return res.json(result) })
})

module.exports = app;