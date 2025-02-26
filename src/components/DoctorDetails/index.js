import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Header from '../Header';
import Footer from '../Footer';
import './index.css'; // Importing the CSS

class DoctorDetails extends Component {
  state = {
    doctor: {},
    loading: 'INITIAL',
  };

  componentDidMount() {
    const { id } = this.props.match.params;  // Retrieve the doctor ID from the URL params
    this.fetchDoctorDetails(id);
  }

  fetchDoctorDetails = async () => {
    this.setState({ loading: 'IN_PROGRESS' });

    const { match } = this.props;
    const { id } = match.params; // Extract doctor ID from route params
   
    try {
      const response = await fetch(`https://baby-steps-assignment-backend.onrender.com/doctors/${id}`);
      const data = await response.json();
      this.setState({
        doctor: data,
        loading: 'SUCCESS',
      });
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      this.setState({ loading: 'FAILURE' });
    }
  };

  renderLoader = () => (
    <div className="loaderContainer">
      <Loader type="ThreeDots" color="#ffd700" height={60} width={60} />
      <span className="loadingText">Loading Doctor Info...</span>
    </div>
  );

  renderDoctorDetails = () => {
    const { doctor } = this.state;
    return (
        <>
        <Header />
      <div className="doctorDetailsContainer">
        <div className="doctorInfo">
          <img src="https://static.vecteezy.com/system/resources/previews/024/585/400/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png" alt={doctor.name} className="doctorImage" />
          <div className="doctorDescription">
            <h2 className="doctorName">{doctor.name}</h2>
            <p className="doctorSpecialization">{doctor.specialization}</p>
            <p className="doctorWorkingHours">Working Hours: {doctor.workingHours.start} to {doctor.workingHours.end}</p>
            <p className='doctorSpecialization'>Experience:5+ years</p>
            <p className='doctorSpecialization'>Degree:MBBS</p> 
            <p className='doctorWorkingHours'>Dr. {doctor.name} is a highly skilled and compassionate {doctor.specialization} with over 5+ years of experience. Dedicated to providing exceptional care, ensuring patients' well-being through personalized and professional treatment options.</p>
          </div>
        </div>
      </div>
      <Footer/>
      </>
    );
  };

  render() {
    const { loading } = this.state;
    switch (loading) {
      case 'SUCCESS':
        return this.renderDoctorDetails();
      case 'IN_PROGRESS':
        return this.renderLoader();
      default:
        return null;
    }
  }
}

export default DoctorDetails;
