const express = require('express'); const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/userModel');

const app = express();

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/login', (req, res) => {
    const {
        email,
        password
    } = req.body;

    User.findOne({ email: email })
        .then((result) => {
            if (result) {
                bcrypt.compare(password, result.password, (err, bresult) => {
                    if (bresult) {
                        jwt.sign({ email: email }, 'secretkey', (err, token) => {
                            res.json({
                                success: true,
                                token
                            });
                        });
                    } else {
                        return res.json({ success: false, error: 'password' });
                    }
                });
            } else {
                return res.json({ success: false, error: 'email' });
            }
        });
});

app.post('/api/register', (req, res) => {
    const {
        username,
        email,
        password,
        name,
        major
    } = req.body;

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hashedPassword) {
            if (err) throw err;
            else {
                const newUser = new User({
                    username,
                    email,
                    password: hashedPassword,
                    name,
                    major,
                    visible: false
                });
                newUser.save((err, data) => {
                    if (err) {
                        console.log(err);
                        let error = Object.keys(err.keyValue)[0];
                        if (error == 'username') {
                            return res.json({ success: false, error: 'user' });
                        } else if (error == 'email') {
                            return res.json({ success: false, error: 'email' });
                        }
                    } else {
                        console.log(data);
                        jwt.sign({ email: email }, 'secretkey', (err, token) => {
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
});

app.post('/api/checkUniqueUsername', (req, res) => {
    const { username } = req.body;
    return User.findOne({ username: username })
        .then(result => { return res.json(result); });
});

app.post('/api/checkUniqueEmail', (req, res) => {
    const { email } = req.body;
    return User.findOne({ email: email })
        .then(result => { return res.json(result); });
});

app.post('/api/getUserInfo', (req, res) => {
    const { email } = req.body;
    return User.findOne({ email: email })
        .then(result => {
            if (result === null) {
                return res.json({ error: true });
            } else {
                return res.json({
                    username: result.username,
                    email: result.email,
                    name: result.name,
                    major: result.major,
                    visible: result.visible
                });
            }
        });
});

app.post('/api/resetpasswordcode', async (req, res) => {
    const { email } = req.body;

    // generate random confirmation code
    const token = crypto.randomBytes(64).toString('hex');
    const expireDate = Date.now() + 3600000;

    // modify token/expireDate in User MongoDB
    let user = await User.findOne({ email: req.body.email });
    user.resetPasswordToken = token;
    user.resetPasswordExpire = expireDate;
    user.save();

    // send confirmation code to user via email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cmpendium@gmail.com',
            pass: 'sjsucmpendium'
        }
    });

    const mailOptions = {
        from: 'cmpendium@gmail.com',
        to: email,
        subject: 'CmpEndium Password Reset',
        text: 'You are receiving this because you have requested to reset your password.\n\n' +
          'Input the following confirmation code on the CmpEndium website (expires in 1 hour): ' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

app.post('/api/validpasswordcode', async (req, res) => {
    const { email, confirmationCode } = req.body;

    const user = await User.findOne({ email: email });

    // code has expired
    if (user.resetPasswordExpire < Date.now()) {
        return res.json({ valid: false, error: 'expire' });
    }

    if (user.resetPasswordToken === confirmationCode) {
        return res.json({ valid: true, error: 'none' });
    } else {
        return res.json({ valid: false, error: 'invalid' });
    }
});

app.post('/api/setpassword', async (req, res) => {
    const { email, password } = req.body;

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async (err, hashedPassword) => {
            if (err) throw err;
            else {
                const user = await User.findOne({ email: email });
                user.password = hashedPassword;
                user.save();
                return res.json({ success: true });
            }
        });
    });
});

module.exports = app;
