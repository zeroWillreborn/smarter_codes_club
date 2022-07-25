import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

router.use('/getUser', checkUserAuth)
router.use('/updateUser/:id', checkUserAuth)
router.use('/addSkills/:id', checkUserAuth)
router.use('/addProjects/:id', checkUserAuth)

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/updateUser/:id', UserController.updateUser)
router.post('/addSkills/:id', UserController.addSkills)
router.post('/addProjects/:id', UserController.addProjects)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)
router.get('/getUser', UserController.getUser)



export default router