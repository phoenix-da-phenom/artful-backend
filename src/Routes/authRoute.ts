import { loginUser, magicLinkRegistration, registerUser } from "../Controllers/authController";
import {Router} from "express"


const router =Router()
//Gte controllers

//Get middle ware for protection or redirects
router.post('/register', registerUser);
router.post('/request-magic-link',magicLinkRegistration  )
router.post("/login", loginUser)



export default router
