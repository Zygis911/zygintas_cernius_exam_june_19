import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import appointmentModel from "../../../../apis/appointment";

const AppointmentContext = createContext();

const useAppointments = () => useContext(AppointmentContext);

const AppointmentProvider = ( { children }  ) => {
    const [isLoading, setIsLoading] = useState(false);

    const [appointment, setAppointments] = useState([]);

    const [fetchAppointments, setFetchAppointments] = useState(false);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const [activeAppointment, setActiveAppointment] = useState({});

    const FetchAppointments = useCallback(() => { setFetchAppointments(v => !v), [fetchAppointments] })

    const OpenCreateForm = useCallback(() => {
        setShowCreateForm(true)
    });

    const CloseCreateForm = useCallback(() => {
        setShowCreateForm(false);
    });
    

    const createAppointment = useCallback(async (appointment) => {
        setIsLoading(true);
        const response = await appointmentModel.createAppointment(appointment);
        setIsLoading(false);
        return [response.status, response.data];
    });

    


        

}