import { pool } from "../db/postgresConnection.mjs";
import { SCHEDULED } from "../cfg/Appointments.mjs";

const appointmentModel = {
  createAppointment: async (name, description) => {
    const status = SCHEDULED;
    const result = await pool.query(
      "INSERT INTO appointments (name, description, status) VALUES ($1, $2, $3) RETURNING *",
      [name, description, status]
    );
    return result.rows[0];
  },

  getAppointmentById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  deleteAppointment: async(id) => {
    await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
  },

  updateAppointment: async(appointments) => {
    const {name, description, status, id} = appointments;

    const result = await pool.query("UPDATE appointments SET name=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
      [name, description, status, id]
    );
    return result.rows[0];
  },

  // getMyAppointments: async(user_id) => {
  //   const result = await pool.query("SELECT id, name, description, status FROM appointments WHERE user_id = $1", [user_id])
  //   const appointment = result.rows
  // }


  getMyAppointments: async (user_id) => {
    try {
      const query = `
        SELECT id, name, description, status
        FROM appointments
        WHERE user_id = $1
      `;
      const { rows } = await pool.query(query, [user_id]);

      return rows.map(appointment => ({
        id: appointment.id,
        name: appointment.name,
        description: appointment.description,
        status: appointment.status,

      }));
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error; 
    }
  },

  

  // if enough time get all appointments, and search
};

export default appointmentModel;
