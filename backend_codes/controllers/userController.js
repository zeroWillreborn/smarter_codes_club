import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'

class UserController {
  // for registering user
  static registerUser = async (req, res) => {
    const { email, pass, cPass  } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (email && pass && cPass ) {
        if (pass === cPass) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(pass, salt)
            const doc = new UserModel({
              name: "SmartCoders",
              email: email,
              password: hashPassword,
              phone: null,
              bio: "",
              skills: [],
              projects: []
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
          } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to Register" })
          }
        } else {
          res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }
  // for logging user
  static loginUser = async (req, res) => {
    try {
      const { email, pass } = req.body
      if (email && pass) {
        const user = await UserModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(pass, user.password)
          if ((user.email === email) && isMatch) {
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.send({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }
// get current user data
  static getUser = async (req, res) => {
    // console.log(req.user)
    res.status(200).send({user:req.user,userId:req.user._id})
  }
// send mail to registered user
  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://127.0.0.1:3300/v1/smart_coders/reset/${user._id}/${token}`
        // console.log(link)
        // Send Email
        // let info = await transporter.sendMail({
        //   from: process.env.EMAIL_FROM,
        //   to: user.email,
        //   secure: true,
        //   subject: "Smart_Coders - Password Reset Link",
        //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
        // })

        res.send({ "status": "success", "message": "Password Reset Email Sent..." })
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  }
  // reset password
  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      // console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }

  // updating profile infos
  static updateUser = async (req, res) => {
    try {
      const {name,email,phone,bio} = req.body
      const {id,token} = req.params
      const user = await UserModel.findById(id)
     await UserModel.findOneAndUpdate(
        {"_id" : id},
        {$set: { "name" : name,"email":email,"phone":phone,"bio":bio}});
        res.status(201).send({msg:"Updated"})
    } catch (error) {
     res.send(error) 
     console.log(error);
    }
  }

  // adding skills in db
  static addSkills = async (req, res) => {
    try {
      const {title,rating} = req.body
      const {id} = req.params
      const user = await UserModel.findById(id)
        await UserModel.findOneAndUpdate(
          { _id: id }, 
          { $push: { skills: {title:title,rating:rating}}});
        res.status(201).send({msg:"Skill Added"})
    } catch (error) {
     res.send(error) 
    //  console.log(error);
    }
  }

  // adding projects in db
  static addProjects = async (req, res) => {
    try {
      const {projectT,projectDesc,projectSkills} = req.body
      const {id} = req.params
    if(projectT){
      await UserModel.findOneAndUpdate(
        { _id: id }, 
        { $push: { projects: {title:projectT,description:projectDesc,projectSkills:projectSkills}}});
      res.status(201).send({msg:'Project Added!'})
      UserModel.find().sort( { 'timestamp': -1 } ).limit(10)
    }else{
      res.send('All fields are required')
    }
    } catch (error) {
     res.send(error) 
    //  console.log(error);
    }
  }
}

export default UserController