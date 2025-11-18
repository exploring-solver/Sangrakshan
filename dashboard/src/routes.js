// General Dashboards
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";

// Role-based Dashboards
import AdminDashboard from "layouts/admin-dashboard";
import CommanderDashboard from "layouts/commander-dashboard";
import TraineeDashboard from "layouts/trainee-dashboard";
import EvaluatorDashboard from "layouts/evaluator-dashboard";
import MedicalDashboard from "layouts/medical-dashboard";
import EquipmentDashboard from "layouts/equipment-dashboard";

// Authentication
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Unauthorized from "layouts/unauthorized";

// Components
import Icon from "@mui/material/Icon";
import Signout from "components/Signout";
import Evaluation from "components/Evaluation";
import ChatBot from "components/ChatBot";
import Arlearning from "components/Arlearning";
import TrackingPosture from "components/TrackingPosture";

// Protected Route
import ProtectedRoute from "components/ProtectedRoute";
import { ROLES } from "context/AuthContext";

const questions = [
  'What is the appropriate initial action in response to a chemical gas leak?',
  'Which type of pathogen is commonly associated with biological CBRN incidents?',
  'In a radiological incident, what is the primary source of radiation in a damaged nuclear reactor?',
  'What is the recommended initial action during a nuclear explosion?',
  'In a CBRN incident, what symptoms might indicate exposure to a toxic substance?',
  'What is the primary purpose of a quarantine in the context of a biological outbreak?',
];

const options = [
  ['Evacuate the area, notify emergency services', 'Open windows to ventilate the area', 'Activate sprinkler systems', 'Approach the source to assess the situation'],
  ['Bacteria', 'Fungus', 'Virus', 'Parasite'],
  ['Alpha radiation', 'Beta radiation', 'Gamma radiation', 'Neutron radiation'],
  ['Take cover and move to designated fallout shelters', 'Approach the blast epicenter to assess damage', 'Continue normal activities', 'Evacuate to high ground'],
  ['Headache and fatigue', 'Difficulty breathing and eye irritation', 'Fever and cough', 'Nausea and vomiting'],
  ['Isolate affected individuals, prevent the spread of disease', 'Provide medical treatment to affected individuals', 'Encourage social gatherings', 'Ignore the outbreak and continue regular activities'],
];

const correctAnswers = ['optionA', 'optionC', 'optionC', 'optionA', 'optionB', 'optionA'];

const routes = [
  // Role-specific Dashboard Routes (not shown in sidebar - accessed via redirect)
  {
    route: "/admin/dashboard",
    component: (
      <ProtectedRoute roles={[ROLES.ADMIN]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    key: "admin-dashboard",
  },
  {
    route: "/commander/dashboard",
    component: (
      <ProtectedRoute roles={[ROLES.COMMANDER]}>
        <CommanderDashboard />
      </ProtectedRoute>
    ),
    key: "commander-dashboard",
  },
  {
    route: "/trainee/dashboard",
    component: (
      <ProtectedRoute roles={[ROLES.TRAINEE]}>
        <TraineeDashboard />
      </ProtectedRoute>
    ),
    key: "trainee-dashboard",
  },
  {
    route: "/evaluator/dashboard",
    component: (
      <ProtectedRoute roles={[ROLES.EVALUATOR]}>
        <EvaluatorDashboard />
      </ProtectedRoute>
    ),
    key: "evaluator-dashboard",
  },
  {
    route: "/medical/dashboard",
    component: (
      <ProtectedRoute roles={[ROLES.MEDICAL_OFFICER]}>
        <MedicalDashboard />
      </ProtectedRoute>
    ),
    key: "medical-dashboard",
  },
  {
    route: "/equipment/dashboard",
    component: (
      <ProtectedRoute roles={[ROLES.EQUIPMENT_MANAGER]}>
        <EquipmentDashboard />
      </ProtectedRoute>
    ),
    key: "equipment-dashboard",
  },

  // General Dashboard (shown in sidebar)
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  // CBRN Data
  {
    type: "collapse",
    name: "CBRN Data",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },

  // Evaluation
  {
    type: "collapse",
    name: "Evaluation",
    key: "evaluation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/evaluation",
    component: <Evaluation questions={questions} options={options} correctAnswers={correctAnswers} />,
  },

  // AI Chatbot
  {
    type: "collapse",
    name: "AI Chatbot Assistant",
    key: "chatbot",
    icon: <Icon fontSize="small">smart_toy</Icon>,
    route: "/chatbot",
    component: <ChatBot />,
  },

  // VR/AR Training
  {
    type: "collapse",
    name: "Start VR/AR Training",
    key: "arlearning",
    icon: <Icon fontSize="small">view_in_ar</Icon>,
    route: "/arlearning",
    component: <Arlearning />,
  },

  // Movement Tracking
  {
    type: "collapse",
    name: "Movement/Posture Tracking",
    key: "opencv",
    icon: <Icon fontSize="small">accessibility_new</Icon>,
    route: "/trackpos",
    component: <TrackingPosture />,
  },

  // Profile
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },

  // Authentication Routes (not shown in sidebar)
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
    key: "sign-in",
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
    key: "sign-up",
  },
  {
    route: "/unauthorized",
    component: <Unauthorized />,
    key: "unauthorized",
  },

  // Sign Out
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-out",
    component: <Signout />,
  },
];

export default routes;
