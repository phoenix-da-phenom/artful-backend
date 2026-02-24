import { magicLinkRegistration, registerUser } from "../Controllers/authController";
import {Router} from "express"


const router =Router()
//Gte controllers

//Get middle ware for protection or redirects
router.post('/register', registerUser);
router.post('/request-magic-link',magicLinkRegistration  )



export default router
