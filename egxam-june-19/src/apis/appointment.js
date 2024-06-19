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

  getAppointmentById: async (id) => {
    try {
      const response = await apiClient.get(`/appointments/${id}`);
      return response;

    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
  deleteAppointment: async(id) => {
    try {
      const response = await apiClient.delete(`/appointments/${id}`);
      return response;

    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  updateAppointment: async (appointment) => {
    try {
      const response = await apiClient.put('/appointments', appointment)
      return response;
      
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
};

export default appointmentModel;
