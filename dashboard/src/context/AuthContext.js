import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

// Auth context
const AuthContext = createContext();

AuthContext.displayName = "AuthContext";

// User roles
export const ROLES = {
  ADMIN: "admin",
  COMMANDER: "commander",
  TRAINEE: "trainee",
  EVALUATOR: "evaluator",
  MEDICAL_OFFICER: "medical_officer",
  EQUIPMENT_MANAGER: "equipment_manager",
};

// Role permissions
export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    "view_all_users",
    "manage_users",
    "view_analytics",
    "manage_system_settings",
    "view_all_sessions",
    "manage_certifications",
    "view_compliance",
    "manage_incidents",
  ],
  [ROLES.COMMANDER]: [
    "view_team",
    "manage_team",
    "schedule_sessions",
    "view_performance",
    "assign_trainings",
    "view_reports",
  ],
  [ROLES.TRAINEE]: [
    "view_own_progress",
    "start_training",
    "view_certifications",
    "view_assigned_trainings",
  ],
  [ROLES.EVALUATOR]: [
    "create_scenarios",
    "evaluate_trainees",
    "view_assessments",
    "create_assessments",
    "view_training_sessions",
  ],
  [ROLES.MEDICAL_OFFICER]: [
    "view_health_records",
    "manage_health_checks",
    "view_incidents",
    "create_health_reports",
    "monitor_safety",
  ],
  [ROLES.EQUIPMENT_MANAGER]: [
    "view_inventory",
    "manage_inventory",
    "track_maintenance",
    "allocate_resources",
    "view_equipment_reports",
  ],
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    case "UPDATE_PROFILE": {
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Auth provider
function AuthProvider({ children }) {
  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const value = useMemo(() => [state, dispatch], [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Auth helper functions
const login = (dispatch, user) => dispatch({ type: "LOGIN", payload: user });
const logout = (dispatch) => dispatch({ type: "LOGOUT" });
const updateProfile = (dispatch, data) => dispatch({ type: "UPDATE_PROFILE", payload: data });

// Permission checker
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  const rolePermissions = PERMISSIONS[user.role] || [];
  return rolePermissions.includes(permission);
};

// Role checker
export const hasRole = (user, role) => {
  if (!user || !user.role) return false;
  return user.role === role;
};

// Multiple roles checker
export const hasAnyRole = (user, roles) => {
  if (!user || !user.role) return false;
  return roles.includes(user.role);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth, login, logout, updateProfile };
