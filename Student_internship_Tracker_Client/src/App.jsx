import { Navigationbar } from "./components/Navigation"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { StudentsList } from "./components/Students";
import { ApplicationsList } from "./components/Applications";
import { ApplicationsStatusUpdate } from "./components/ApplicationStatusUpdater";
import { Homepage } from "./components/Home";
import {Footercomponent} from "./components/footer";
import {SignIn} from "./components/login";
import SignUp from "./components/registration";
import { ApplicationsManager } from "./components/ApplicationEdit";



function App() {


  return (
    <>
    <BrowserRouter>
    <Navigationbar/>
    <Container className="mt-4 d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/aboutus" element={<AboutUs />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/student" element={<StudentsList />} />
          {/* <Route path="/companies" element={<Companies />} /> */}
          {/* <Route path="/supervisors" element={<Supervisors />} /> */}
          <Route path="/applications" element={<ApplicationsList />} />
          <Route path="/applicationsStatusUpdate" element={<ApplicationsStatusUpdate />} />
          <Route path="/applicationsEdit" element={<ApplicationsManager />} />
          {/* <Route path="/internships" element={<Internships />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer />
      </Container>
      <Footercomponent/>
    </BrowserRouter>
    </>
  )
}

export default App
