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
  
        const appointmeentId = req.params.id;
  
        const appointment = await appointmentModel.getAppointmentById(
          appointmeentId
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
  };
  
  export default appointmentController;