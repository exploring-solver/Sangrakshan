/**
=========================================================
  React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useAuth, login } from "context/AuthContext";
import authService from "services/authService";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, dispatch] = useAuth();
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      login(dispatch, response.user);

      // Redirect based on role
      const roleRedirects = {
        admin: "/admin/dashboard",
        commander: "/commander/dashboard",
        trainee: "/trainee/dashboard",
        evaluator: "/evaluator/dashboard",
        medical_officer: "/medical/dashboard",
        equipment_manager: "/equipment/dashboard",
      };

      navigate(roleRedirects[response.user.role] || "/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sangरक्षण Portal
          </MDTypography>
          <MDTypography variant="body2" color="white" mt={1}>
            CBRN Disaster Response Training System
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Collapse in={!!error}>
            <MDBox mb={2}>
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            </MDBox>
          </Collapse>

          {/* Demo Credentials Info */}
          <MDBox mb={3} p={2} bgcolor="grey.100" borderRadius="lg">
            <MDTypography variant="caption" fontWeight="bold" color="text">
              Demo Credentials:
            </MDTypography>
            <MDTypography variant="caption" display="block" color="text">
              Admin: admin@ndrf.gov.in / admin123
            </MDTypography>
            <MDTypography variant="caption" display="block" color="text">
              Commander: commander@ndrf.gov.in / commander123
            </MDTypography>
            <MDTypography variant="caption" display="block" color="text">
              Trainee: trainee@ndrf.gov.in / trainee123
            </MDTypography>
          </MDBox>

          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
