import './index.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#doctors">Doctors</a></li>
          <li><a href="#appointment">My Appointment</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <p class="pt-3">© 2025 Doctors Appointment. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
