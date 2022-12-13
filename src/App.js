import { Routes, Route } from "react-router-dom";
// import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Accueil from "./Routes/Accueil/main.component";
import ErrorPage from "./Components/ErrorPage";
import LoginPage from "./Components/LoginPage";
import ForgotPassword from "./Components/ForgotPassword";
import SingleTrial from "./Components/ClinicalTrial/singleTrial";
import AddDocInSite from "./Components/User/addDocInSite";
import CreateUserFormComponent from "./Components/User/create-user-form.component";
import Navbar from "./Routes/Navbar/navbar.component";
import UserListComponent from "./Components/User/userlist.component";
import SitesViewComponent from "./Components/Site/sites-view.component";
import SiteFocusComponent from "./Components/Site/site-focus.component";
import TrialTableComponent from "./Components/ClinicalTrial/trial-table.component";
import MeetingFormComponent from "./Components/TrialMeeting/meetingForm.component";
import MeetingDashboardComponent from "./Components/TrialMeeting/meetingDashboard.component";
import AddDoctorToTrialComponent from "./Components/Doctor/AddDoctorToTrial.component";
import AddSiteToTrialComponent from "./Components/Site/addSiteToTrial.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Accueil />} />
        <Route path="login" element={<LoginPage />} />
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
        <Route path="addDocToSite" element={<AddDocInSite />} />
        <Route path="docToTrial" element={<AddDoctorToTrialComponent />} />
        <Route path="trial/:idTrial" element={<SingleTrial />} />
        <Route path="trials" element={<TrialTableComponent />} />
        <Route path="meetingView" element={<MeetingDashboardComponent />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Route>
      <Route path="/test" element={<MeetingFormComponent />} />
    </Routes>
  );
}

export default App;
