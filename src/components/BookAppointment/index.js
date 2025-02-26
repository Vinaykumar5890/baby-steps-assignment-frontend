import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import './index.css'; // Custom CSS for styling

class BookAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: this.props.match.params.doctorId,
      patientName: '',
      date: '',
      duration: 60,
      appointmentType: 'Normal Checkup',
      notes: '',
      isSubmitting: false,
      error: null,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { patientName, date, duration, appointmentType, notes } = this.state;
    
    if (!patientName || !date) {
      this.setState({ error: 'Please fill out all fields.' });
      return;
    }

    this.setState({ isSubmitting: true });

    const appointmentData = {
      doctorId: this.state.doctorId,
      patientName,
      date,
      duration,
      appointmentType,
      notes,
    };
    console.log(appointmentData);
    await axios
      .post('https://baby-steps-assignment-backend.onrender.com/appointments', appointmentData)
      .then((response) => {
        localStorage.setItem('appointmentId', response.data._id);
        this.setState({ isSubmitting: false });
        this.props.history.push('/appointments'); // Redirect to appointments page
      })
      .catch((error) => {
        console.error('Error submitting appointment:', error)
        this.setState({ isSubmitting: false, error: error.response.data.message });
      });
  };

  render() {
    const { patientName, date, duration, appointmentType, notes, isSubmitting, error } = this.state;

    return (
      <>
      <Header/>
      <div className="appointment-form-container">
        <h1 className="appointment-title">Book Appointment</h1>
        {error && <p className="error-message">{error}</p>}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="patientName">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter patient name"
              name="patientName"
              value={patientName}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Appointment Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              value={date}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="duration">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={duration}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="appointmentType">
            <Form.Label>Appointment Type</Form.Label>
            <Form.Control
              as="select"
              name="appointmentType"
              value={appointmentType}
              onChange={this.handleChange}
            >
              <option>Normal Checkup</option>
              <option>Follow-up</option>
              <option>Emergency</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter any special notes"
              name="notes"
              value={notes}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Book Appointment'}
          </Button>
        </Form>
      </div>
      <Footer/>
      </>
    );
  }
}

export default BookAppointment;
