import React, { useCallback } from 'react';
import { useForm } from "react-hook-form";
import { useAppointments } from './hooks/useAppointment';

export const CreateAppointmentForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { FetchAppointments, createAppointment, CloseCreateForm } = useAppointments();

    const onFormSubmit = useCallback(async (data) => {
        try {
            const [status, responseData] = await createAppointment(data);

            if (status === 201) {
                FetchAppointments(); // 
                CloseCreateForm(); // 
            } else if (status === 400) {
              
                for (let i = 0; i < responseData.errors.length; i++) {
                    setError(responseData.errors[i].path, {
                        type: 'manual',
                        message: responseData.errors[i].msg,
                    });
                }
            } else {
            
                alert('Error occurred while creating the appointment');
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('An unexpected error occurred');
        }
    }, []);

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") CloseCreateForm();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' {...register('name', { required: 'Name is required' })} />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <input type='text' {...register('description')} />
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Status</label>
                        <select {...register('status', { required: 'Status is required' })}>
                            <option value='SCHEDULED'>Scheduled</option>
                            <option value='IN_PROGRESS'>In Progress</option>
                            <option value='COMPLETED'>Completed</option>
                        </select>
                        {errors.status && <p>{errors.status.message}</p>}
                    </div>
                   

                    <button type='submit'>Create Appointment</button>
                </form>
            </div>
        </div>
    );
};