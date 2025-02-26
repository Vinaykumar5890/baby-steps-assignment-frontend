import React, { Component } from 'react';
import { Link } from 'react-router-dom' 
import { Button } from 'react-bootstrap';
import Header from "../Header";
import Footer from "../Footer";

import './index.css';

class Doctors extends Component {
  state = { doctors: [] };

  componentDidMount() {
    this.fetchDoctors();
  }

  fetchDoctors = async () => {
    const response = await fetch('https://baby-steps-assignment-backend.onrender.com/doctors')
    if (response.ok) {
      const data = await response.json()
      const list = data.map(i => ({
        id: i._id,
        Name: i.name,
        Specialization: i.specialization,
        WorkingHours: i.workingHours
      }))
      this.setState({doctors: list})
    }
  }

  render() {
    const { doctors } = this.state;

    return (
      <>
        <Header />
        <div className="doctor-list-container">
          <h1 className="page-title">Our Doctors</h1>
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <div className="doctor-card" key={doctor.id}>
                <img
                  src="https://thumbs.dreamstime.com/z/young-smiling-man-doctor-medical-specialist-medicine-concept-cute-d-icon-people-character-illustration-cartoon-minimal-style-274178658.jpg"
                  alt={doctor.Name}
                  className="doctor-img"
                />
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.Name}</h3>
                  <p className="doctor-specialization">{doctor.Specialization}</p>
                  <p className="doctor-hours">
                    Working Hours: {doctor.WorkingHours.start} to {doctor.WorkingHours.end}
                  </p>
                  < Link to={`/doctor/${doctor.id}`} className="view-details-btn">
                   View Details 
                  </Link>
                  <Button variant="primary" className="book-appointment-btn" as={Link} to={`/book-appointment/${doctor.id}`}>
  Book Appointment
</Button>

                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Doctors;
