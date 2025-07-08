import passport from 'passport'
import errorHandler from './ErrorHandler'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import prisma from "../db/client"
import { User } from '@prisma/client'

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user: User, done) => {
    done(null, user)
})

async function userSignUp(name:string, email: string){
    const newUser: User = await prisma.user.create({
        data: {
            name: name,
            email: email
        }
    })
    return newUser;
}

async function userLogin(name: string, email: string){
    const userDetails: User | null = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!userDetails){
        const newUser: User = await userSignUp(name, email);
        return newUser;
    }
    return userDetails;
}


const strategy = new GoogleStrategy({
    clientID: process.env.CLIENT_ID ?? errorHandler("Missing CLIENT_ID environment variable"),
    clientSecret: process.env.CLIENT_SECRET ?? errorHandler("Missing CLIENT_SECRET environment variable"),
    callbackURL: process.env.REDIRECT_URI  
    //FIXME - get proper types for function parameters
}, async (accessToken: any, refreshToken: any, profile: any, details: any, done: any) => {
    try{
        const user: User = await userLogin(details._json.name, details._json.email)
        done(null, user)
    }catch(e){
        console.log("Error occured: ", e)
    }
})

passport.use(strategy);