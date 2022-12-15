import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ErrorPage from "./Components/ErrorPage";
import ForgotPassword from "./Components/ForgotPassword";
import SingleTrialComponent from "./Components/ClinicalTrial/singleTrial.component";
import AddDocInSiteComponent from "./Components/Doctor/addDocInSite.component";
import CreateUserFormComponent from "./Components/User/create-user-form.component";
import Navbar from "./Routes/Navbar/navbar.component";
import UserListComponent from "./Components/User/userlist.component";
import SitesViewComponent from "./Components/Site/sites-view.component";
import SiteFocusComponent from "./Components/Site/site-focus.component";
import TrialTableComponent from "./Components/ClinicalTrial/trial-table.component";
import MeetingDashboardComponent from "./Components/TrialMeeting/meetingDashboard.component";
import AddDoctorToTrialComponent from "./Components/Doctor/AddDoctorToTrial.component";
import AddSiteToTrialComponent from "./Components/Site/addSiteToTrial.component";
import TrialCreateComponent from "./Components/ClinicalTrial/trial-create.component";
import AddPatientToTrialComponent from "./Components/TrialMeeting/addPatientToTrial.component";
import MeetingCreateFormComponent from "./Components/TrialMeeting/meetingCreateForm.component";
import ConnectionDataComponent from "./Components/User/connection-data.component";
import LoginComponent from "./Components/User/login.component";
import DoctorListClinicalTrialComponent from "./Components/ClinicalTrial/doctorListClinicalTrial.component";
import MeetingFormComponent from "./Components/TrialMeeting/meetingForm.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<ConnectionDataComponent />} />
        <Route path="logout" element={<ConnectionDataComponent />} />
        <Route path="users" element={<UserListComponent />} />
        <Route path="createUser" element={<CreateUserFormComponent />} />
        <Route path="listSites" element={<SitesViewComponent />} />
        <Route
          path="editSite/:idSite"
          element={<SiteFocusComponent update={true} />}
        />
        <Route
          path="createSite"
          element={<SiteFocusComponent update={false} />}
        />
        <Route path="siteToTrial" element={<AddSiteToTrialComponent />} />
        <Route path="addDocToSite" element={<AddDocInSiteComponent />} />
        <Route path="docToTrial" element={<AddDoctorToTrialComponent />} />
        <Route path="patientToTrial" element={<AddPatientToTrialComponent />} />
        <Route path="trial/:idTrial" element={<SingleTrialComponent />} />
        <Route
          path="listMyTrial"
          element={<DoctorListClinicalTrialComponent />}
        />
        <Route path="trials" element={<TrialTableComponent />} />
        <Route path="trial" element={<TrialCreateComponent />} />
        <Route path="meetingView" element={<MeetingDashboardComponent />} />
        <Route path="createMeeting" element={<MeetingCreateFormComponent />} />
        <Route path="populateMeeting" element={<MeetingFormComponent />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Route>
      {/*<Route path="/test" element={<LoginComponent />} />*/}
    </Routes>
  );
}

export default App;
