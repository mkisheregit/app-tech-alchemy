 require('dotenv').config();
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

 const User = require('../../Models/user-model');

 const signUp = async(req, res) => {
     try {
         const docs = await User.find({ email: req.body.email });
         if (docs.length > 0) {
             return res.status(409).json({
                 message: "Email already exists",
             });
         } else {
             const plaintextPassword = req.body.password;
             const salt = bcrypt.genSaltSync(10);
             const hash = bcrypt.hashSync(plaintextPassword, salt); //hashed password

             const user = new User({
                 name: req.body.name,
                 email: req.body.email,
                 password: hash,
             });
             const result = await user.save();
             return res.status(201).json({
                 message: "✔ signed up successfully",
                 userDetails: {
                     name: result.name,
                     email: result.email,
                     request: {
                         type: "POST",
                         url: "http://localhost:3000/auth/login",
                         body: { email: "String", password: "String" }
                     }
                 }
             });

         }
     } catch (error) {
         return res.status(500).json({
             message: error,
         });
     }
 }


 const login = async(req, res) => {
     try {
         const email = req.body.email;
         const password = req.body.password;

         const doc = await User.find({ email: email });
         if (doc.length === 0) {
             return res.status(409).json({
                 message: "login failed",
                 request: {
                     type: "POST",
                     url: "http://localhost:3000/auth/sign-up",
                     body: { name: "String", email: "String", password: "String" },
                 }
             });
         } else {
             const check = bcrypt.compareSync(password, doc[0].password);
             if (check) {
                 const accessToken = jwt.sign({
                         email: doc[0].email,
                         userId: doc[0]._id,
                     },
                     process.env.ACCESS_SECRET_KEY, {
                         expiresIn: "2m",
                     }
                 );
                 const refreshToken = jwt.sign({
                         email: doc[0].email,
                         userId: doc[0]._id,
                     },
                     process.env.REFRESH_SECRET_KEY
                 );
                 const k = await User.updateOne({ email: email }, { $push: { refreshTokens: refreshToken } });
                 //  console.log(k);
                 return res.status(201).json({
                     message: "✔ logged in successfully",
                     accessToken: accessToken,
                     refreshToken: refreshToken,
                     request: {
                         type: "GET",
                         url: "http://localhost:3000/news",
                         Headers: {
                             Authorization: "Bearer accessToken"
                         }
                     }
                 });
             } else {
                 return res.status(409).json({
                     message: "Auth Failed",
                 });
             }
         }
     } catch (error) {
         return res.status(500).json({
             message: error.message,
         });
     }
 }

 const logout = async(req, res) => {
     try {
         const update = await User.updateOne({ email: req.userData.email }, { $set: { refreshTokens: [] } });
         return res.status(500).json({
             message: "✔ logged out",
         });
     } catch (error) {
         res.status(500).json({
             message: error.message,
         });
     }
 }

 const refreshToken = (req, res) => {
     try {
         const token = req.body.token;
         const decodedData = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
         const newAccessToken = jwt.sign({
                 email: decodedData.email,
                 userId: decodedData.userId,
             },
             process.env.ACCESS_SECRET_KEY, {
                 expiresIn: "2m",
             }
         );
         return res.status(201).json({
             message: "created new Access-Token",
             accessToken: newAccessToken,
             request: {
                 type: "GET",
                 url: "http://localhost:3000/news",
                 Headers: {
                     Authorization: "Bearer accessToken",
                 },
             },
         });
     } catch (error) {
         return res.status(500).json({
             message: error.message
         });
     }
 }

 module.exports = { signUp, login, logout, refreshToken };