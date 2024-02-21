import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import ClientList from "./components/clientManagement/ClientList";
import ClientDetail from "./components/clientManagement/ClientDetail";
import AddClient from "./components/clientManagement/AddClient";
import EditClient from "./components/clientManagement/EditClient";
import DeleteClient from "./components/clientManagement/DeleteClient";
import TreatmentList from "./components/treatmentManagement/TreatmentList";
import TreatmentDetail from "./components/treatmentManagement/TreatmentDetail";
import AddTreatment from "./components/treatmentManagement/AddTreatment";
import DeleteTreatment from "./components/treatmentManagement/DeleteTreatment";
import DataStats from "./components/dataDisplay/DataStats";
import RegistrationForm from "./components/authentication/RegistrationForm";
import LoginForm from "./components/authentication/LoginForm";
import UserProfile from "./components/authentication/UserProfile";
import AuthNavigation from "./components/authentication/AuthNavigation";
import DataLand from "./components/dataDisplay/DataLand";
import ClientLand from "./components/clientManagement/ClientLand";
import TreatmentLand from "./components/treatmentManagement/TreatmentLand";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AuthNavigation />} />

          <Route path="/clientland" element={<ClientLand />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/:clientId" element={<ClientDetail />} />
          <Route path="/clients/add" element={<AddClient />} />
          <Route path="/clients/edit/:clientId" element={<EditClient />} />
          <Route path="/clients/delete/:clientId" element={<DeleteClient />} />

          <Route path="/treatments" element={<TreatmentList />} />
          <Route path="/treatmentland" element={<TreatmentLand />} />
          <Route
            path="/treatments/:userId/:treatmentId"
            element={<TreatmentDetail />}
          />
          <Route
            path="/treatments/delete/:treatmentId"
            element={<DeleteTreatment />}
          />
          <Route path="/treatments/add" element={<AddTreatment />} />

          <Route path="/data/:userid" element={<DataStats />} />
          <Route path="/data" element={<DataLand />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user-profile/:userid" element={<UserProfile />} />
          <Route path="/user-auth" element={<AuthNavigation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
