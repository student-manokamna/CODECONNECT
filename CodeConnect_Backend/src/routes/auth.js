const express = require('express');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const { validateSignupData } = require('../utils/validation');
const User = require('../models/user');
require('dotenv').config();   

const authRouter = express.Router();

// Google OAuth2 Configuration
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/auth/google/callback';
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// 1️⃣ Redirect user to Google OAuth consent page
authRouter.get('/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // to receive a refresh token
    scope: ['openid', 'profile', 'email'],
  });
  res.redirect(authUrl);
});

// 2️⃣ Google Callback → exchange code, set cookie, redirect
authRouter.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Optionally fetch user info
    const userInfoRes = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${tokens.access_token}` } }
    );
    const profile = userInfoRes.data;

    // Create or update user in your DB
    let user = await User.findOne({ emailId: profile.email });
    if (!user) {
      user = new User({
        firstName: profile.given_name,
        lastName: profile.family_name,
        emailId: profile.email,
        passWord: null,
        oauthProvider: 'google',
      });
      await user.save();
    }

    // Generate your JWT/session token
    const token = await user.getJWT();
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    res.redirect('http://localhost:3000/dashboard');
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    res.status(500).send('Authentication failed');
  }
});

// 3️⃣ Signup route
authRouter.post('/signup', async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, passWord } = req.body;
    const passwordHash = await bcrypt.hash(passWord, 10);
    const user = new User({ firstName, lastName, emailId, passWord: passwordHash });
    await user.save();
    res.send('User added successfully');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// 4️⃣ Login route
authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, passWord } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) throw new Error('Invalid credentials');

    const isPassWordValid = await user.validatePassword(passWord);
    if (!isPassWordValid) throw new Error('Invalid credentials');

    const token = await user.getJWT();
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });
    res.send(user);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// 5️⃣ Logout route
authRouter.post('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.send('Logout successful');
});

module.exports = authRouter;
