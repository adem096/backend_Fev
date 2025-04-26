const userModel = require('../models/userSchema');
const jobOfferModel = require('../models/jobOfferSchema');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const resetCodes = new Map();
const nodemailer = require('nodemailer');
const maxTime = 24 *60 * 60 //24H
//const maxTime = 1 * 60 //1min
const createToken = (id) => {
    return jwt.sign({id},'net secret pfe', {expiresIn: maxTime })
}
//67a73ce6ce362ba943c4c9d3 + net secret pfe + 1m
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yjc0MjE5ZTFhMTM2OWRlZmZkNzJiMCIsImlhdCI6MTc0MDA2MzI2MCwiZXhwIjoxNzQwNjY4MDYwfQ.38r9wuoAG-Toz_e5yPf1uBdv8bAxgWqU58FaZHUBYeA

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

module.exports.addUserClient = async (req,res) => {
    try {
        const {username , email , password , age} = req.body;
        const roleClient = 'client'
        // if (!checkIfUserExists) {
        //     throw new Error("User not found");
        //   }
        const user = await userModel.create({
            username,email ,password,role :roleClient, age
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addUserClientWithImg = async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleClient = 'client'
        const {filename} = req.file

        const user = await userModel.create({
            username,email ,password,role :roleClient , user_image : filename
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.addUserAdmin= async (req,res) => {
    try {
        const {username , email , password } = req.body;
        const roleAdmin = 'admin'
        const user = await userModel.create({
            username,email ,password,role :roleAdmin
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllUsers= async (req,res) => {
    try {
        const userListe = await userModel.find().populate("jobOffers");

        res.status(200).json({userListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getUserById= async (req,res) => {
    try {
        //const id = req.params.id
        const {id} = req.params
        //console.log(req.params.id)
        const user = await userModel.findById(id)

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteUserById= async (req,res) => {
    try {
        const {id} = req.params

        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
          throw new Error("User not found");
        }

        await jobOfferModel.updateMany({user : id},{
            $unset: { user: 1 },// null "" 
          });

        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateuserById = async (req, res) => {
    try {
        const {id} = req.params
        const {email , username} = req.body;
    
        await userModel.findByIdAndUpdate(id,{$set : {email , username }})
        const updated = await userModel.findById(id)
    
        res.status(200).json({updated})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }

    module.exports.searchUserByUsername = async (req, res) => {
        try {
    
            const { username } = req.query
            if(!username){
                throw new Error("Veuillez fournir un nom pour la recherche.");
            }
    
            const userListe = await userModel.find({
                username: {$regex: username , $options: "i"}
            })
    
            if (!userListe) {
                throw new Error("User not found");
              }
              const count = userListe.length
            res.status(200).json({userListe,count})
        } catch (error) {
            res.status(500).json({message: error.message});
        }
        }

        module.exports.getAllUsersSortByAge= async (req,res) => {
            try {
                const userListe = await userModel.find().sort({age : 1}).limit(2)
                //const userListe = await userModel.find().sort({age : -1}).limit(2)
        
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.getAllUsersAge= async (req,res) => {
            try {
                const {age} = req.params
                const userListe = await userModel.find({ age : age})
        
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.getAllUsersAgeBetMaxAgeMinAge= async (req,res) => {
            try {
                const MaxAge = req.query.MaxAge
                const MinAge = req.query.MinAge
                const userListe = await userModel.find({age : { $gt : MinAge , $lt : MaxAge}}).sort({age : 1})
        
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.getAllClient= async (req,res) => {
            try {
    
                const userListe = await userModel.find({role : "client"})
        
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.getAllAdmin= async (req,res) => {
            try {
    
                const userListe = await userModel.find({role : "admin"})
        
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }
    
        module.exports.login= async (req,res) => {
            try {
                const { email , password } = req.body;
                const user = await userModel.login(email, password)
                const token = createToken(user._id)
                res.cookie("jwt_token_9antra", token, {httpOnly:false,maxAge:maxTime * 1000})
                res.status(200).json({user})
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.logout= async (req,res) => {
            try {
          
                res.cookie("jwt_token_9antra", "", {httpOnly:false,maxAge:1})
                res.status(200).json("logged")
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        module.exports.sendResetCode = async (req, res) => {
            try {
              const { email } = req.body;
              console.log('Sending reset code for email:', email);
              
              // Check if user exists
              const user = await userModel.findOne({ email });
              if (!user) {
                return res.status(404).json({ 
                  success: false, 
                  message: 'User not found' 
                });
              }
          
              // Generate a 6-digit code
              const code = Math.floor(100000 + Math.random() * 900000).toString();
              console.log('Generated code:', code); // For debugging
              
              // Store code with timestamp
              resetCodes.set(email, {
                code,
                timestamp: Date.now(),
                attempts: 0
              });
              console.log('Stored reset code data:', resetCodes.get(email));
          
              // Send email
              await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Code',
                text: `Your password reset code is: ${code}. This code will expire in 10 minutes.`
              });
          
              res.json({ 
                success: true, 
                message: 'Reset code sent successfully' 
              });
            } catch (error) {
              console.error('Send reset code error:', error);
              res.status(500).json({ 
                success: false, 
                message: error.message || 'Failed to send reset code' 
              });
            }
          };
          
          module.exports.verifyResetCode = async (req, res) => {
            try {
              const { code, email } = req.body;
              console.log('Verifying code:', { code, email });
              console.log('Available reset codes:', Array.from(resetCodes.entries()));
              
              const storedData = resetCodes.get(email);
              console.log('Stored data for email:', storedData);
          
              if (!storedData) {
                return res.status(400).json({ 
                  success: false, 
                  message: 'No reset code found. Please request a new code.' 
                });
              }
          
              // Check if code is expired (10 minutes)
              if (Date.now() - storedData.timestamp > 600000) {
                resetCodes.delete(email);
                return res.status(400).json({ 
                  success: false, 
                  message: 'Code has expired. Please request a new code.' 
                });
              }
          
              // Increment attempts
              storedData.attempts = (storedData.attempts || 0) + 1;
          
              // Check maximum attempts (3)
              if (storedData.attempts >= 3) {
                resetCodes.delete(email);
                return res.status(400).json({ 
                  success: false, 
                  message: 'Too many attempts. Please request a new code.' 
                });
              }
          
              if (storedData.code !== code) {
                return res.status(400).json({ 
                  success: false, 
                  message: `Invalid code. ${3 - storedData.attempts} attempts remaining.` 
                });
              }
          
              // Store verification status
              storedData.verified = true;
              resetCodes.set(email, storedData);
          
              res.json({ 
                success: true, 
                message: 'Code verified successfully' 
              });
            } catch (error) {
              console.error('Verify code error:', error);
              res.status(500).json({ 
                success: false, 
                message: error.message || 'Error verifying code' 
              });
            }
          };
          
          module.exports.resetPassword = async (req, res) => {
            try {
              const { password, email } = req.body;
              console.log('Resetting password for email:', email);
              
              const storedData = resetCodes.get(email);
              if (!storedData || !storedData.verified) {
                return res.status(400).json({ 
                  success: false, 
                  message: 'Please verify your email first' 
                });
              }
          
              const user = await userModel.findOne({ email });
              if (!user) {
                return res.status(404).json({ 
                  success: false, 
                  message: 'User not found' 
                });
              }
          
              user.password = password;
              await user.save();
              
              // Clear the reset code after successful password reset
              resetCodes.delete(email);
          
              res.json({ 
                success: true, 
                message: 'Password reset successfully' 
              });
            } catch (error) {
              console.error('Reset password error:', error);
              res.status(500).json({ 
                success: false, 
                message: error.message || 'Error resetting password' 
              });
            }
          };