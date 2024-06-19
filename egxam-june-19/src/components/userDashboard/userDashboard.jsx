import React, { useEffect, useState, useContext } from "react";
// import { fetchUserData } from "../../api/apis";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { AppointmentList } from "./AppointmentList/AppoointmentList";
import { Spinner } from "../Spinner";
import { AppointmentProvider } from "./AppointmentList/hooks/useAppointment";

function UserDashboard() {
  const { user: authUser } = useContext(AuthContext);
  console.log("authUser in UserDashboard:", authUser);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser) {
        navigate("/");
        return;
      }
      try {
        const data = await fetchUserData(authUser.id);
        if (data) {
          console.log(data);
          setUserData(data);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [authUser, navigate]);

  return (
    <div className="dashboard_body">
      <div className="app-table">
        <h1 style={{ textTransform: "uppercase", marginTop: "1.5rem", color: "#394045" }}>Your Appointments Summary</h1>
        <AppointmentProvider>
          <AppointmentList />
        </AppointmentProvider>
      </div>
    </div>
  );
}

export default UserDashboard;