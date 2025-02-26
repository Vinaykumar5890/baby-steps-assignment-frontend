import Doctors from "./components/Doctors";
import Home from "./components/Home";
import Appointments from "./components/Appointments";
import Contact  from "./components/Contact";
import DoctorDetails from "./components/DoctorDetails";
import BookAppointment from "./components/BookAppointment";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const App=()=>{
  return (
<div>
<BrowserRouter>
<Switch>
  <Route exact path="/" component={Home}  />
  <Route exact path="/doctors" component={Doctors} />
  <Route exact path="/appointments" component={Appointments} />
  <Route exact path="/contact" component={Contact} />
  <Route  exact path="/doctor/:id" component={DoctorDetails} />
  <Route path="/book-appointment/:doctorId" component={BookAppointment} />
</Switch>
</BrowserRouter>
</div>
  )
}
export default App;