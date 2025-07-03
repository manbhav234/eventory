import express from "express"
import passport from 'passport';
import './utils/passportStrategy'

import authRouter from "./routes/auth";
import eventsRouter from './routes/events'
import userRouter from './routes/user'
import productRouter from './routes/products'

import cookieSession from 'cookie-session'

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [`${process.env.SESSION_COOKIE_KEY}`]
}))

app.use(express.json())
app.use(passport.initialize());
app.use(passport.session())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventsRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/products", productRouter)

export default app;