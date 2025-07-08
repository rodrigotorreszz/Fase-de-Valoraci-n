import express from "express";
import customersController from "../controller/ClienteController.js";

const router = express.Router();


router
  .route("/")
  .get(customersController.getCustomers)      
  .post(customersController.createCustomer);   


router
  .route("/:id")
  .get(customersController.getCustomerById)    
  .put(customersController.updateCustomer)     
  .delete(customersController.deleteCustomer); 

export default router;
