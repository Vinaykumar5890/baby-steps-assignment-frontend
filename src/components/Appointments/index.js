import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import './index.css'; // Custom CSS for styling

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      editingAppointment: null,
      patientName: '',
      date: '',
      duration: 60,
      appointmentType: 'Normal Checkup',
      notes: '',
      isSubmitting: false,
    };
  }

  componentDidMount() {
    const appointmentId = localStorage.getItem('appointmentId');

    if (appointmentId) {
      fetch(`https://baby-steps-assignment-backend.onrender.com/appointment/${appointmentId}`)
        .then((response) => response.json())
        .then((data) => this.setState({ appointments: [data] })) // Only fetch the stored appointment for now
        .catch((error) => console.error('Error fetching appointment:', error));
    }
  }

  handleDelete = (appointmentId) => {
    axios
      .delete(`https://baby-steps-assignment-backend.onrender.com/appointments/${appointmentId}`)
      .then((response) => {
        // Remove the deleted appointment from localStorage and update state
        localStorage.removeItem('appointmentId');
        this.setState((prevState) => ({
          appointments: prevState.appointments.filter(
            (appointment) => appointment._id !== appointmentId
          ),
        }));
      })
      .catch((error) => console.error('Error deleting appointment:', error));
  };

  handleEdit = (appointment) => {
    // Pre-populate the form with current appointment details
    this.setState({
      editingAppointment: appointment,
      patientName: appointment.patientName,
      date: new Date(appointment.date).toLocaleString(),
      duration: appointment.duration,
      appointmentType: appointment.appointmentType,
      notes: appointment.notes,
    });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    const { patientName, date, duration, appointmentType, notes, editingAppointment } = this.state;

    const updatedAppointment = {
      patientName,
      date,
      duration,
      appointmentType,
      notes,
    };

    axios
      .put(`https://baby-steps-assignment-backend.onrender.com/appointments/${editingAppointment._id}`, updatedAppointment)
      .then((response) => {
        // Update the appointment list with the edited details
        this.setState((prevState) => ({
          appointments: prevState.appointments.map((appointment) =>
            appointment._id === editingAppointment._id ? response.data : appointment
          ),
          editingAppointment: null, // Close the editing form
        }));
      })
      .catch((error) => console.error('Error updating appointment:', error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { appointments, editingAppointment, patientName, date, duration, appointmentType, notes } = this.state;

    return (
      <>
      <Header />
      <div className="appointments-container">
        <h1 className="appointments-title">Appointments</h1>
        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div className="appointment-card" key={appointment._id}>
                <h3>Patient: {appointment.patientName}</h3>
                <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                <p>Duration: {appointment.duration} minutes</p>
                <p>Type: {appointment.appointmentType}</p>
                <p>Notes: {appointment.notes}</p>
                <button
                  className="edit-btn"
                  onClick={() => this.handleEdit(appointment)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => this.handleDelete(appointment._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </div>

        {editingAppointment && (
          <div className="appointment-edit-form">
            <h2>Edit Appointment</h2>
            <form onSubmit={this.handleUpdate}>
              <label>Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={patientName}
                onChange={this.handleChange}
              />

              <label>Appointment Date</label>
              <input
                type="datetime-local"
                name="date"
                value={date}
                onChange={this.handleChange}
              />

              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={duration}
                onChange={this.handleChange}
              />

              <label>Appointment Type</label>
              <select
                name="appointmentType"
                value={appointmentType}
                onChange={this.handleChange}
              >
                <option>Normal Checkup</option>
                <option>Follow-up</option>
                <option>Emergency</option>
              </select>

              <label>Notes</label>
              <input
                type="text"
                name="notes"
                value={notes}
                onChange={this.handleChange}
              />

              <button type="submit">Update Appointment</button>
            </form>
          </div>
        )}
      </div>
      <Footer />
      </>
    );
  }
}

export default Appointments;
