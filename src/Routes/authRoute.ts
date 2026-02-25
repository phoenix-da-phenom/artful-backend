import { loginUser, magicLinkRegistration, registerUser, verifyRegistration } from "../Controllers/authController";
import {Router} from "express"


const router =Router()
//Gte controllers

//Get middle ware for protection or redirects
router.post('/register', registerUser);
router.post('/request-magic-link',magicLinkRegistration  )
router.post("/verify", verifyRegistration)
router.post("/login", loginUser)



export default router
