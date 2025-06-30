import { Router } from "express";
import passport from 'passport'
import authenticate from "../middlewares/authenticate";
const router = Router()

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}))

router.get('/checkLogin', authenticate,(req, res) => {
  res.json({success: true, user: req.user})
})

router.get('/logout', (req,res)=>{
  req.session = null
  res.json({
      success:true
  })
})

router.get('/google/redirect', passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}`,
    failureMessage: true // Passes the message to req.session
  }), (req,res)=>{
    res.redirect(`${process.env.CLIENT_URL}`)
})

export default router;