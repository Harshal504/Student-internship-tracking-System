import { Navigationbar } from "./components/Navigation"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { StudentsList } from "./components/Students";
import { Homepage } from "./components/Home";


function App() {


  return (
    <BrowserRouter>
    <Navigationbar/>
    <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/aboutus" element={<AboutUs />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/student" element={<StudentsList />} />
          {/* <Route path="/companies" element={<Companies />} /> */}
          {/* <Route path="/supervisors" element={<Supervisors />} /> */}
          {/* <Route path="/applications" element={<Applications />} /> */}
          {/* <Route path="/internships" element={<Internships />} /> */}
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
