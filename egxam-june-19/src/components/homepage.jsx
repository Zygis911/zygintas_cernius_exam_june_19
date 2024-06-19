import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";
import './css/homepage.css'
import salon_image from '../assets/salon_image.jpg'

export const Home = () => {
    const {user} = useContext(AuthContext);


    return (
        <>
               <div className="container">
                <div className="content">
                    <h1 className="anim">Schedule a visit </h1>
                    <h1 className="anim">Best beauty experts in Vilnius</h1>
                    <p className="anim">All sorts of services <br></br>Dont hesitate to book a visit!</p>
                    {!user && <a href="/signup" className="pgr-btn anim">Join now</a>}
                </div>
                <div className="div-img">
                    <img src={salon_image} alt="labas" className="feature-img anim" />

                </div>

            </div>
        </>
    )
}