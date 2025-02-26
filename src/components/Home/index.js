import { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {Link} from "react-router-dom";
import "./index.css"
class Home extends Component {
    render() {
        return(
            <div>
                <Header />
                 <div className="con">
                     <div>
                        <h1 className="con-heading">Making Health</h1>
                        <h1 className="con-heading">Care Better Together</h1>
                        <p className="con-paragarph">"Book appointments with top doctors for consultations, dental care, and eye checkups. Prioritize your health with expert services."</p>

                       <Link to="/doctors"> <button className="con-button">Make an Appointment</button></Link>
                     </div>
                    <img src="https://i.ibb.co/YFRqJrDf/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-cro.png" alt="image123" className="image123"/>
                    </div>
                    <Footer />
                </div>
               
               
        );
    }

}
export default Home;