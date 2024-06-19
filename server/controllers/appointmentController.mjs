import { validationResult } from "express-validator";

import appointmentModel from "../models/appointmentModel.mjs";

const appointmentController = {
    createAppointment: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        console.log("User in request: ", req.user); // Log user info for debugging
  
        if (!req.user) {
          return res.status(401).json("unauthorized access");
        }
        const { name, description } = req.body;
        const createdAppointment = await appointmentModel.createAppointment(
          name,
          description
        );
  
        res.status(201).json(createdAppointment);
      } catch (error) {}
    },
  
    getAppointmentById: async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ message: "unauthorized access" });
        }
  
        const appointmentId = req.params.id;
  
        const appointment = await appointmentModel.getAppointmentById(
          appointmentId
        );
        // appointment existence check
  
        if (!appointment) {
          return res.status(400).json({ message: "appointment does not exist" });
        }
  
        return res.status(200).json(appointment);
      } catch (error) {
        next(error);
      }
    },

    deleteAppointment: async(req, res, rext) => {
      try {
        // checking if user is authenticated to be able to delete the appointment
        if(!req.user) {
          return res.status(401).json({message: "unauthorized access"})
        }

        const id = req.params.id;

        // retrieve appointment

        const appointment = await appointmentModel.getAppointmentById(id);

        if(!appointment) {
          return res.status(400).json({message: "appointment does not exist"})
        }

        // missing user authentication, later 

        await appointmentModel.deleteAppointment(id);

        return res.status(200).json({message: "appointment deleted successfully"})
      } catch (error) {
        next(error);
      }
    },

    updateAppointment: async (req, res, next) => {
      try {

        if (!req.user) {
            res.status(401).json({message: "you dont have the authorization to update this project"})
        }
 
        const {id, name, description, status} = req.body;

        const appointment = await appointmentModel.getAppointmentById(id);

        if(!appointment) {
          return res.status(400).json({message: "appointment does not exist"})
        }
        
        // authorizacion, if enough time (pworker logic)

        await appointmentModel.updateAppointment({id, name, description, status});
        return res.status(200).json({message: "appointment updated successfully"})
        
      } catch (error) {
        next(error);
      }
    },

    


  };
  
  export default appointmentController;