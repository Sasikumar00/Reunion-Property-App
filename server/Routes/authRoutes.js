import {Router} from 'express'
import authControllers from '../Controllers/authControllers.js'

const router = Router()

router.post('/signup', authControllers.signup)
router.post('/login', authControllers.login)
router.get('/validate', authControllers.validateToken)

export default router