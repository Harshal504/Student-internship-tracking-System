import { Navigationbar } from "./components/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { Homepage } from "./components/Home";
import { AboutUs } from "./components/About";
import { Contact } from "./components/Contact";
import { Footercomponent } from "./components/footer";
import { SignIn } from "./components/Login";
import SignUp from "./components/registration";
import { Dashboard } from "./components/Dashboard";

import { InternshipsList } from "./components/Internships";
import { CompaniesList } from "./components/Companies";
import { SupervisorsList } from "./components/Supervisors";
import { StudentsList } from "./components/Students";
import { ApplicationsManager } from "./components/ApplicationEdit";
import { ApplicationsStatusUpdate } from "./components/ApplicationStatusUpdater";
import { ApplicationsList } from "./components/Applications";

import { PrivateRoute } from "./components/PrivateRoute";
import { ROLES } from "./constants/RoleConstant";

function App() {
  return (
    <>
      <Navigationbar />
      <Container className="mt-4 d-flex flex-column min-vh-100">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* 🔒 Protected routes */}

          {/* Accessible by ALL ROLES */}
          <Route
            element={
              <PrivateRoute
                allowedRoles={[ROLES.STUDENT, ROLES.COMPANY, ROLES.SUPERVISOR]}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/internships" element={<InternshipsList />} />
            <Route path="/companies" element={<CompaniesList />} />
          </Route>

          {/* 👨‍🎓 Student-only routes */}
          <Route
            element={<PrivateRoute allowedRoles={[ROLES.STUDENT]} />}
          >
            <Route path="/applicationsEdit" element={<ApplicationsManager />} />
          </Route>

          {/* 🏢 Company-only routes */}
          <Route
            element={<PrivateRoute allowedRoles={[ROLES.COMPANY]} />}
          >
            <Route path="/applicationsStatusUpdate" element={<ApplicationsStatusUpdate />} />
            {/* <Route path="/applications" element={<ApplicationsList />} /> */}
          </Route>

          {/* 👨‍🏫 Supervisor-only routes */}
          <Route
            element={<PrivateRoute allowedRoles={[ROLES.SUPERVISOR]} />}
          >
            <Route path="/supervisors" element={<SupervisorsList />} />
            <Route path="/applications" element={<ApplicationsList />} />
            <Route path="/students" element={<StudentsList />} />
          </Route>
        </Routes>

        <ToastContainer />
      </Container>

      <Footercomponent />
    </>
  );
}

export default App;
