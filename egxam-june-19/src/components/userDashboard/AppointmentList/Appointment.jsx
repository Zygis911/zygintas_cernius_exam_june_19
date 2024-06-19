import React, { useCallback } from 'react';
import {useAppointment} from './hooks/useAppointment';
import { Link } from "react-router-dom";
import '../../css/userDashboard.css'

export const Appointment = ({ appointment }) => {
    const { deleteAppointment, OpenUpdateForm, FetchAppointments } = useAppointment();

    const RemoveAppointment = useCallback(async () => {
        try {
            const [status] = await deleteAppointment(appointment.id);
            if (status === 200) {
                FetchAppointments(); // Refresh appointments after deletion
            } else {
                alert('Error occurred while removing the appointment');
            }
        } catch (error) {
            console.error('Error removing appointment:', error);
            alert('An error occurred while removing the appointment');
        }
    }, [appointment]);

    return (
        <tr className='table'>
            <td title={appointment.name}>
                <Link to={`/appointments/${appointment.id}`} className='table-link'>
                    <div>
                        {
                            appointment.name.length > 15 ?
                                appointment.name.substring(0, 15) + " ..." :
                                appointment.name
                        }
                    </div>
                </Link>
            </td>
            <td title={appointment.status}>
                <Link to={`/appointments/${appointment.id}`} className='table-link'>
                    <div>
                        {appointment.status}
                    </div>
                </Link>
            </td>
            <td title={appointment.description}>
                <Link to={`/appointments/${appointment.id}`} className='table-link'>
                    <div>
                        {
                            appointment.description.length > 10 ?
                                appointment.description.substring(0, 10) + " ..." :
                                appointment.description
                        }
                    </div>
                </Link>
            </td>
            <td>
                <Link to={`/appointments/${appointment.id}`} className='table-link'>
                    <div>
                        {appointment.userRole}
                    </div>
                </Link>
            </td>
            <td>
                <Link to={`/appointments/${appointment.id}`} className='table-link'>
                    <div>
                        {appointment.toDoTasks}
                    </div>
                </Link>
            </td>
            <td>
                <Link to={`/appointments/${appointment.id}`} className='table-link'>
                    <div>
                        {appointment.inProgressTasks}
                    </div>
                </Link>
            </td>
            <td>
                <Link to={`/appointments/${appointment.id}`} className='table-link'>
                    <div>
                        {appointment.completedTasks}
                    </div>
                </Link>
            </td>
            <td>
                <button className='action-button ' onClick={() => OpenUpdateForm(appointment)}>Update</button>
                <button className='action-button ' onClick={RemoveAppointment}>Remove</button>
            </td>
        </tr>
    );
};