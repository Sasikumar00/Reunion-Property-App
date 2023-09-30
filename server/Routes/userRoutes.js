import { Router } from "express";
import userController from '../Controllers/userControllers.js'
import authorize from '../Middlewares/authorize.js'

const router = Router()

//API test route
router.get('/', userController.testHome)

//List all available properties
router.get('/list-properties', userController.getAllListings)

//List all available properties
router.get('/property/:id', userController.getListingDetails)

//Create a new property listing
router.post('/property',authorize, userController.createListing)

//Update a property listing by ID
router.patch('/property/:id',authorize, userController.updateListing)

//Delete a property listing by ID
router.delete('/property/:id',authorize, userController.deleteListing)

//Get the list of all properties listed by user
router.get('/property',authorize, userController.getMyListings)

//Filter properties
router.post('/property/filter',authorize,userController.filterProperty)

export default router