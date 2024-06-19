import { apiClient } from "./api";

const appointmentModel = {
    createAppointment: async (appointment) => {
      try {
        const response = await apiClient.post("/appointments", appointment);
        return response;
      } catch (error) {
        console.log(error);
        return error.response;
      }
    },
  };
  
  
  export default appointmentModel;