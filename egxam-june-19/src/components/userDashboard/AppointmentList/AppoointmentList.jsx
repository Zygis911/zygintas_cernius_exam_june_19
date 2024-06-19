import React from 'react';
import { useAppointments } from './hooks/useAppointment'; 
import { Appointment } from './Appointment'; 
import { CreateAppointmentForm } from './CreateAppointmentForm'; 
import { UpdateAppointmentForm } from './UpdateAppointmentForm'; 
import { Spinner } from '../../Spinner';

export const AppointmentList = () => {
    const { appointments, showCreateForm, OpenCreateForm, showUpdateForm, activeAppointment } = useAppointments();

    return (
        <div>
            {showCreateForm && <CreateAppointmentForm />}
            {showUpdateForm && <UpdateAppointmentForm />}
            {!appointments && <Spinner />}
            {
                appointments &&
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Actions</th>
                            {/* Add more headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map(appointment => (
                                <Appointment key={appointment.id} appointment={appointment} />
                            ))
                        ) : (
                            <tr>
                                <td className="text-center">No appointments available</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-center">
                                <button className='btn btn-new-appointment' onClick={OpenCreateForm}>Create new appointment</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            }
        </div>
    );
};