import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import appointmentModel from "../../../../apis/appointment";

 const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [appointment, setAppointments] = useState([]);

  const [fetchAppointments, setFetchAppointments] = useState(false);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [activeAppointment, setActiveAppointment] = useState({});

  const FetchAppointments = useCallback(() => {
    setFetchAppointments((v) => !v), [fetchAppointments];
  });

  const OpenCreateForm = useCallback(() => {
    setShowCreateForm(true);
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

  const OpenUpdateForm = useCallback((appointment) => {
    setActiveAppointment(appointment);
    setShowUpdateForm(true);
  });

  const CloseUpdateForm = useCallback(() => {
    setActiveAppointment({});
    setShowUpdateForm(false);
  });

  const updateAppointment = useCallback(async (id) => {
    const response = await appointmentModel.updateAppointment(appointment);
    return [response.status, response.data];
  });

  const deleteAppointment = useCallback(async (id) => {
    const response = await appointment.deleteAppointment(id);
    return [response.status, response.data];
  });


  useEffect(() => {
    setIsLoading(true);
    (async () => {
        const response = await appointmentModel.getMyAppointments()
        if (response.status === 200) {
            setAppointments(response.data)
        }
        setIsLoading(false)
    })();
  }, [fetchAppointments]);

    return (
        <AppointmentContext.Provider value={{ 
            appointment, showCreateForm, OpenCreateForm, CloseCreateForm,
            updateAppointment, showUpdateForm, OpenUpdateForm, CloseUpdateForm, activeAppointment,
            deleteAppointment, FetchAppointments, fetchAppointments,
        }}>
            {children}
        </AppointmentContext.Provider>
    )
};
