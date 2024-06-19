import '../css/AppointmentPage.css';
import { TaskList } from './TaskList/components/TaskList';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { useContext, useEffect, useState } from 'react';
import pWorkerModel from '../../api/pWorkers'; 
import { UsersProvider } from './UserList/hooks/useUsers'; 
import { TasksProvider } from './TaskList/hooks/useTasks'; 
import AppointmentModel from '../../api/appointments'; 
import { Spinner } from '../Spinner';



export const AppointmentPage = () => {
    let { id: appointment_id } = useParams();
    if (isNaN(appointment_id)) {
        appointment_id = 0;
    }

    const [appointment, setAppointment] = useState({});
    const [isNotFound, setIsNotFound] = useState(false);
    const [activeTab, setActiveTab] = useState('task'); // State to manage active tab

    const { user } = useContext(AuthContext);
    const [isAdminOrOwner, setIsAdminOrOwner] = useState(false);

    useEffect(() => {
        (async () => {
            const appointment_response = await AppointmentModel.getAppointmentById(appointment_id);
            if (appointment_response.status !== 200) {
                setIsNotFound(true);
                return () => { };
            }

            setAppointment(appointment_response.data);

          
            const response = await pWorkerModel.getPWorkerByUserAndAppointmentId(user.id, appointment_id);
            if (response.status === 200) {
                const pWorker = response.data;
                setIsAdminOrOwner(pWorker.role === "admin" || pWorker.role === "owner");
            }
        })();
    }, [appointment_id, user.id]);

    const handleTaskListClick = () => {
        setActiveTab('task');
    };

    const handleUserListClick = () => {
        setActiveTab('user');
    };

    return (
        <div className='appointment-page'>
            <div className='Grid-Container'>
                <div className='Grid-Item-Grid-login-information'>
                    <h3>Appointment name: {appointment.name}</h3>
                    <div>Description: {appointment.description}</div>
                    <div>Status: {appointment.status}</div>
                </div>
                <div className='Grid-Item-Side-navigation'>
                
                    <div className='Grid-Item-Side-navigation-style-task-user-list1'>
                        {activeTab === 'task' ? (
                            <Link to={`/appointments/${appointment_id}`} onClick={handleTaskListClick} className="active-link">Task list</Link>
                        ) : (
                            <Link to={`/appointments/${appointment_id}`} onClick={handleTaskListClick} className='passive-link'>Task list</Link>
                        )}
                    </div>
                    <div className='Grid-Item-Side-navigation-style-task-user-list2'>
                        {activeTab === 'user' ? (
                            <Link to={`/appointments/${appointment_id}`} onClick={handleUserListClick} className="active-link">User list</Link>
                        ) : (
                            <Link to={`/appointments/${appointment_id}`} onClick={handleUserListClick} className='passive-link'>User list</Link>
                        )}
                    </div>
                </div>
                <div className='Grid-Item Grid-Main'>
                    {
                        isNotFound ? <div>Appointment not found</div> :
                            (appointment ?
                                <>
                                    {activeTab === 'task' && (
                                        <TasksProvider appointment_id={appointment_id}>
                                            <TaskList isAdminOrOwner={isAdminOrOwner} />
                                        </TasksProvider>
                                    )}
                                    {activeTab === 'user' && (
                                        <UsersProvider appointment_id={appointment_id}>
                                            <UserList appointment_id={appointment_id} isAdminOrOwner={isAdminOrOwner} />
                                        </UsersProvider>
                                    )}
                                </> :
                                <Spinner />)
                    }
                </div>
            </div>
        </div>
    );
};