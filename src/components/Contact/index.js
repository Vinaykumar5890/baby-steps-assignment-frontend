import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';  // CSS file for styling

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
      success: false,
      error: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;

    this.setState({ loading: true });

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('access_key', 'd2b66e95-b6f5-4ea7-b8c2-f6ffde543bc3')
    formData.append('subject', 'Customer Getting Touch Doctor Appointment')
    formData.append('from_name', 'Doctors Appointment')
    const API_URL = "https://api.web3forms.com/submit";
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        this.setState({ success: true, loading: false, error: '' });
        this.setState({ name: '', email: '', message: '' });
        
      } else {
        this.setState({ error: result.message, loading: false });
      }
    } catch (error) {
      console.log(error)
      this.setState({ error: 'An error occurred. Please try again.', loading: false });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email, message, loading, success, error } = this.state;

    return (
      <>
      <Header/>
      <div className="contact-page">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">We'd love to hear from you. Please fill out the form below, and we'll get back to you as soon as possible.</p>
        
        {success && <p className="success-message">Thank you for your message! We'll get back to you soon.</p>}
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={this.handleSubmit} className="contact-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Message</label>
            <textarea
              name="message"
              value={message}
              onChange={this.handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <Footer/>
      </>
    );
  }
}

export default Contact;
